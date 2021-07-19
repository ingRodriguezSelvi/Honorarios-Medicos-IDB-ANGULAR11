import { Injectable } from '@angular/core';
import { Cobros, HonoXPagar, OrdenMedica } from '@app/shared/components/models/data';

@Injectable({
  providedIn: 'root'
})
export class SumTotalService {

  constructor() { }
///////Cobrados==Previ////////////////////
  sumaBs(l:number,m:Cobros[]){
    let suma=0;
    for(let x=0; x<l; x++){
      let montoActual=m[x].monto_Bruto_Bs;
      suma=suma+montoActual;
    }
    return suma;
  }
  sumaDol(l:number,m:Cobros[]){
    let suma=0;
    for(let x=0; x<l; x++){
      let montoActual=m[x].monto_Bruto_Dol;
      suma=suma+montoActual;
    }
    return suma;
  }
 ////////////////////////////////////

 ///////////Por Cobrar///////////////
  sumaBsXC(l:number,m:HonoXPagar[]){
    let suma=0;
    for(let x=0; x<l; x++){
      let montoActual=m[x].montoBs;
      suma=suma+montoActual;
    }
    return suma;
  }
  sumaDolXC(l:number,m:HonoXPagar[]){
    let suma=0;
    for(let x=0; x<l; x++){
      let montoActual=m[x].montoDol;
      suma=suma+montoActual;
    }
    return suma;
  }
////////////////////////////////////

/////////////Agrupados/////////////
  sumaBsGroup(l:number,m:OrdenMedica[]){
    let suma=0;
    for(let x=0; x<l; x++){
      let montoActual=m[x].montoBs;
      suma=suma+montoActual;
    }
    return suma;
  }
  sumaDolGroup(l:number,m:OrdenMedica[]){
    let suma=0;
    for(let x=0; x<l; x++){
      let montoActual=m[x].montoDol;
      suma=suma+montoActual;
    }
    return suma;
  }
///////////////////////////////////

//////////Previ==Cobrados////////////////////
  sumaBsPrevi(l:number,m:Cobros[]){
    let suma=0;
    for(let x=0; x<l; x++){
      let montoActual=m[x].montoBs;
      suma=suma+montoActual;
    }
    return suma;
  }
  sumaDolPrevi(l:number,m:Cobros[]){
    let suma=0;
    for(let x=0; x<l; x++){
      let montoActual=m[x].montoDol;
      suma=suma+montoActual;
    }
    return suma;
  }
///////////////////////////////////
}
