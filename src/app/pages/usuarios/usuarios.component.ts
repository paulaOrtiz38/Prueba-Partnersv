import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/control/usuario.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const VETADO = 'DOUBLEVPARTNERS';//“doublevpartners”.
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  faSearch = faSearch;
  public page:    number = 1;
  public porpage:       number = 10;

  public msjError:boolean = false;
  public textoError:string;
  public usuarios:UsuarioModel[] = [];
  public usuario = new UsuarioModel();

  public nombre:string;
  
  constructor(private _modal: NgbModal,
              private readonly router: Router,
              private _servicioUsuario: UsuarioService) {                 
              }

  ngOnInit(): void {
    this.getUsuarios();
    this.nombre ="";
  }

  public getUsuarios(){
     this._servicioUsuario.getUsuarios().subscribe({
        next:(resp:any)=>{
          this.usuarios = resp.items;
        },error:(e)=>{         
           console.log(e);
        },complete(){},
      });
  }

  public modal(content: any,url?: string):void{
    
    if(url){      
      this._modal.open(content, {
        backdrop: 'static',
        keyboard: false
      });
    }else{
      console.error('no hay url');
    }
  }

  public mostrarDatosUsuarios(url){
    this._servicioUsuario.getUrlUsuario(url).pipe()
    .subscribe(resp => {
          this.usuario = resp;
    });
  }

  public onSubmit(form: NgForm): void {
      this.textoError = '';

      if (form.invalid) {
        this.msjError = true;
        this.textoError = 'El campo es obligatorio';
      }

      if (this.nombre.length > 0 && this.nombre.length < 4 ){
        this.msjError = true;
        this.textoError = 'El campo debe ser minimo de 4 caracteres';
      }else if(this.nombre.toUpperCase() === VETADO){
        this.msjError = true;
        this.textoError =  `La palabra ${VETADO} esta vetada`;
      } 

      if(this.msjError){
                
          Swal.fire({
            icon:'error',
            title:'Error',
            text: this.textoError,
          });
          return;
      }
  
      this.buscarUsuarios();
      this._modal.dismissAll();
    
  }
  /**
   * envia la solicitud de busqueda
   * */
  async buscarUsuarios(){
   let res = await this.enviaSolicitudBusqueda();
   if(!res) this.usuarios = [];
   return;
  }

  private async enviaSolicitudBusqueda(): Promise<boolean> {
    
    return new Promise((resolve) => {
      this._servicioUsuario.buscarUsuarios(this.nombre).pipe()
        .subscribe(resp => {
          
          if (resp) {           
            this.usuarios = resp.items.slice(0, 10);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
  goToUser(usuario:any):void {
    this.router.navigate(['usuarios/usuario-detalle'],{queryParams:{userLogin:usuario.login,score:usuario.score}});
  } 

  public cerrarModal(){    
    this._modal.dismissAll();
  }

}
