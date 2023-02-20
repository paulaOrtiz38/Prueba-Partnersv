import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http:HttpClient ) { }

  public getUsuarios():Observable<UsuarioModel>{
    return this.http.get<any>(`${URL}search/users?q=YOUR_NAME`).pipe(
      finalize(()=>{
           
      }),
      map((resp: any) => {
        resp.items.map((n) => {
           this.getseguidores(n.followers_url).then((resp)=>n.followers = resp.length
           ).catch((error) => {
            console.error('Error fetching user:', error);
          }); 
          return n.followers;
      });
        
      return resp.items;
      })
    );
    
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
  public getseguidores( url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${url}`).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getseguidos( url: string){
    return this.http.get(`${url}`).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
 
}
