import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/control/usuario.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {
  userLogin!: string;
  faArrow= faArrowLeft;
  public usuario = new UsuarioModel();
  
  constructor( private readonly route: ActivatedRoute,
               private router: Router,
               private _servicioUsuario : UsuarioService) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){

    this.route.queryParams.subscribe(
      (params : Params)=>{
        this.userLogin = params['userLogin'];
      }
    );
    this._servicioUsuario.getUsuario(this.userLogin).pipe()
    .subscribe(resp => {
      console.info(resp);
          this.usuario = resp;
    });

  }

  regresar() {
    this.router.navigate(['/usuarios']);
    }

}
