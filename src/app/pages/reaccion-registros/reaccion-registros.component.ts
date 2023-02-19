import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Map, marker, tileLayer } from 'leaflet';
import { switchMap } from 'rxjs/operators';
import { ReaccionAbonadoModel } from 'src/app/models/reaccion-abonado.model';
import { ReaccionRegistroModel } from 'src/app/models/reaccion-registro.model';
import { ControlReaccionService } from 'src/app/services/control/control-reaccion.service';

import { ReaccionesRegistroService } from 'src/app/services/reacciones-registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reaccion-registros',
  templateUrl: './reaccion-registros.component.html',
  styleUrls: ['./reaccion-registros.component.css']
})
export class ReaccionRegistrosComponent implements OnInit {

  public page:    number = 1;
  public porpage:       number = 10;

  public msjError:boolean = false;
  public lstAbonados:ReaccionAbonadoModel[] = [];
  public abonado = new ReaccionAbonadoModel();
  public reaccionesRegistros:ReaccionRegistroModel[] = [];
  public reaccionRegistro = new ReaccionRegistroModel();

  //listas consulta desde control
  public eventosControl:any[];
  public estadosControl:any[];

  public prueba:any;

  selectedAbonado: number;

  

  
  constructor(private _modal: NgbModal,
              private _serviceReaccion: ReaccionesRegistroService ,
              private _sercivioControl: ControlReaccionService) { 
                
              }

  ngOnInit(): void {
    this.getAbonados();
    this.getReaccionesRegistro();
    this.getEventosControl();
    this.updateReacciones();
    
  }

  ngAfterViewInit():void{
  
  }

  public mapa(){
    
    let lat = this.reaccionRegistro.abonado.latitud;
    let lng =  this.reaccionRegistro.abonado.longitud;
    let texto = this.reaccionRegistro.num_solicitud;
    const mapa = new Map('map').setView([3.4618, -76.5179], 13);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(mapa);
    const marca =  marker([lat,lng]).addTo(mapa).bindPopup(texto);
    console.log(marca);
    mapa.fitBounds([[marca.getLatLng().lat,marca.getLatLng().lng]]);
    
  }

  public updateReacciones() {
    this._serviceReaccion.updateSolicitudReaccion().subscribe(
      {
        next:(resp:any)=>{
          console.log('actualiza ',resp);
          if(resp)
          console.log('next');
          this.getReaccionesRegistro();
        },error:(e)=>{         
           console.log('error ',e);
        },complete() {
          //console.log('completa');
        },
      }
    );
  }

  public getAbonados(){
      //
      this._serviceReaccion.getReaccionAbonados().subscribe({
        next:(resp:any)=>{
          this.lstAbonados = resp.data;
        },error:(e)=>{         
           console.log(e);
        },complete() {
          //console.log('completa');
        },
      });
  }

  public getReaccionesRegistro(){
    this._serviceReaccion.getReaccionRegistros().subscribe({
      next:(resp:any)=>{
        this.reaccionesRegistros = resp.data;
      },error:(e)=>{
       
          Swal.fire({
            icon:'error',
            title:'Error',
            text: 'Ocurrio un error en la lista de Reacciones!',
          });
          return;
      },complete() {
        console.log('completa');
      },
    });
  }

  public getEventosControl(){

    this._sercivioControl.getReaccionEventos().subscribe({
      next:(resp:any)=>{
        this.eventosControl = resp.data;

      },error:(e)=>{       
          return;
      },complete() {
        console.log('completa');
      },
    });
  }

  public getEstadosControl(){
    
    this._sercivioControl.getReaccionEstados().subscribe({
      next:(resp:any)=>{
        this.estadosControl = resp.data;
      },error:(e)=>{       
          return;
      },complete() {
        console.log('completa*');
      },
    });
  }

  public modal(content: any,reaccion?: ReaccionRegistroModel):void{
    
    if(reaccion){      
      this.reaccionRegistro = reaccion;
    }else{
      this.reaccionRegistro = new ReaccionRegistroModel();
    }
    
    this._modal.open(content, {
      backdrop: 'static',
      keyboard: false,
      fullscreen: true
      
    });

    if(this.reaccionRegistro.id){
      this.mapa();      
    }

  }

  public onSubmit(form: NgForm): void {

    if (form.invalid) {
      this.msjError=true;
      return;
    }else{
      this.solicitarReaccion();
      this._modal.dismissAll();
    }
  }

  //envia la solicitud de reaccion a node
  async solicitarReaccion(){
   let res = await this.enviaSolicitudReaccion();
   //console.log('res',res);
   this.guardaSolicitudReaccion();
   this.reaccionRegistro = new ReaccionRegistroModel();
   return;
  }

   guardaSolicitudReaccion() {
    let datosReaccion = this.reaccionRegistro;
  
    this._serviceReaccion.saveSolicitudReaccion(datosReaccion).subscribe({
      next:(resp:any)=>{
       this.getReaccionesRegistro();
      },error:(e)=>{
       console.log(e);
      },complete() {
        console.log('completa guardaSolicitudReaccion');
        
      },
    });
   
    return;
  } 


  private async enviaSolicitudReaccion(): Promise<boolean> {
    let datosReaccion = this.reaccionRegistro;
    return new Promise((resolve) => {
      this._serviceReaccion.solicitudReaccion(datosReaccion).pipe()
        .subscribe(resp => {
          
          if (resp) {           
            this.reaccionRegistro.cc_motorizado = resp.cc_motorizado;
            this.reaccionRegistro.num_solicitud = resp.nSolicitud;
            this.reaccionRegistro.estado_reaccion = resp.estado_reaccion; 
            this.reaccionRegistro.user_id = 1;
            resolve(true);
          } else {
           
            this.reaccionRegistro = new ReaccionRegistroModel();
            resolve(false);
          }
        });
    });
  }

  public cerrarModal(){    
    this._modal.dismissAll();
    this.reaccionRegistro = new ReaccionRegistroModel();
  }

  public datosEvento(evento:any):void{
        this.reaccionRegistro.evento = evento.nombre;
        this.reaccionRegistro.evento_codigo = evento.codigo_evento;
        this.reaccionRegistro.evento_descripcion = evento.descripcion;
  }
}
