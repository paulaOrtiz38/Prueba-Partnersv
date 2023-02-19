import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReaccionRegistroModel } from '../models/reaccion-registro.model';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ReaccionesRegistroService {

  constructor( private http:HttpClient ) { }

  public getReaccionAbonados(){
    return this.http.get(`${URL}/abonados`).pipe(
      map((resp: any) => {
       
        return resp;
       
      })
    );
  }

  public getReaccionRegistros(){
    return this.http.get(`${URL}/reacciones`).pipe(
      map((resp: any) => {
       
        return resp;
       
      })
    );
  }

}
