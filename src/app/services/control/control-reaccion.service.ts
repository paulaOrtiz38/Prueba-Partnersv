import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URLC = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ControlReaccionService {

  constructor( private http:HttpClient ) { }

  public getReaccionEventos(){
    return this.http.get(`${URLC}/eventos-reacciones`).pipe(
      map((resp: any) => {
       
        return resp;
       
      })
    );
  }

  public getReaccionEstados(){
    return this.http.get(`${URLC}/estados-reacciones`).pipe(
      map((resp: any) => {       
        return resp;       
      })
    );
  }

}
