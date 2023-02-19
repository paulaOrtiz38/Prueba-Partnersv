import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http:HttpClient ) { }

  public getUsuarios():Observable<any>{
    return this.http.get<any>(`${URL}search/users?q=YOUR_NAME`);
    
  }
  /**
  *busca y trae la lista de usuarios que coincidan con el texto nombre
  */
  public buscarUsuarios( texto_nombre: string ){
    return this.http.get(`${URL}search/users?q=${texto_nombre}`).pipe(
      map((resp: any) => {       
        return resp;       
      })
    );
  }

  public getUsuario( userlogin: string){
    return this.http.get(`${URL}users/${userlogin}`).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  public getUrlUsuario( url: string){
    return this.http.get(`${url}`).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  public getseguidores( url: string){
    return this.http.get(`${url}`).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  public getseguidos( url: string){
    return this.http.get(`${url}`).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
 
}
