import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

type NewType = unknown;

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

transform(value: string,valor:string): unknown {
    let url = environment.urlImg;

   if (valor == "parqueadero_vehiculo"){
        return`${url}/parqueaderos_vehiculos/${value}`;
    }
    
    return 'assets/images/icons/no-image.png';
    
  }

}

