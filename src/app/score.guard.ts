import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './services/control/usuario.service';

@Injectable({
  providedIn: 'root'
})


export class ScoreGuard implements CanActivate {
  constructor(private router:Router,
    private _servicioUsuario: UsuarioService
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const score = route.queryParams['score'];
       if (Number(score) >= 1) {
        return true;
      } else {
        // Redirige al usuario a otra página si su puntaje es menor a 30.0
        this.router.navigateByUrl('/**');
        return false;
      } 
    return true;
  }

  
}
