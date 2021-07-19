import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cobros, F_MedicosI, HonoXPagar, OrdenMedica, PaymentsDetailsI, Sedes } from '@app/shared/components/models/data';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { IDocListPag, ILisMed } from '@app/shared/components/models/dataResponseMed';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MedDataService {
  direccion:string=`${environment.API_URL}`;
  constructor(private http:HttpClient) { }
  getSedes(){
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })}
    return this.http.get<Sedes[]>(this.direccion+'api/Sedes/ListarSedes',httpOptions).pipe
    (map((res:Sedes[])=>{
      return res;
    }))
  }
  getOrder(x:number,a:number,m:number,c?:string):Observable<Cobros[]>{
    let httpOptionss
   if(c){
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
        Sede: String(x),
        cedula:c!
      }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
     }
     httpOptionss=httpOptions;
   }
   else if(!c){
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
        Sede: String(x),
      }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
     }
     httpOptionss=httpOptions;
   }
        return this.http.get<Cobros[]>(this.direccion+'api/Data/OrdenesConDetalle',httpOptionss).
        pipe(map((res:Cobros[])=>{
          return res;
        }))
  }
  getOrderXPagar(x:number,a:number,m:number,c?:string):Observable<HonoXPagar[]>{
    let httpOptionss;
    if(c){
      const httpOptions = {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
          Sede: String(x),
          cedula:c!
        }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
       }
       httpOptionss=httpOptions;
    }else if(!c){
      const httpOptions = {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
          Sede: String(x)
        }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
      }
      httpOptionss=httpOptions;
     }
     return this.http.get<HonoXPagar[]>(this.direccion+'api/data/HonorariosPorPagar',httpOptionss).
      pipe(map((res:HonoXPagar[])=>{

        return res;
      }))
  }
  getOrderPrevi(x:number,a:number,m:number,c?:string):Observable<Cobros[]>{
    let httpOptionss;
    if(c){
      const httpOptions = {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
          Sede: String(x),
          cedula:c!
        }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
       }
       httpOptionss=httpOptions;
    }
    else if(!c){
      const httpOptions = {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
          Sede: String(x)
        }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
       }
       httpOptionss=httpOptions;
    }
     return this.http.get<Cobros[]>(this.direccion+'api/Data/PagosData',httpOptionss).
      pipe(map((res:Cobros[])=>{

        return res;
      }))
  }
  getOrderAgrup(x:number,a:number,m:number,c?:string):Observable<OrdenMedica[]>{
    let httpOptionss;
    if(c){

      const httpOptions = {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
          Sede: String(x),
          cedula:c!
        }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
       }
       httpOptionss=httpOptions;

    }else if(!c){
      const httpOptions = {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
          Sede: String(x)
        }),params:new HttpParams().append('ano',String(a)).append('mes',String(m))
       }
       httpOptionss=httpOptions;
    }

     return this.http.get<OrdenMedica[]>(this.direccion+'api/Data/OrdenesData',httpOptionss).
     pipe(map((res:OrdenMedica[])=>{
       return res;
     }))
  }
  getListMed():Observable<ILisMed[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      })
     }
     return this.http.get<ILisMed[]>(this.direccion+'api/Medicos/DoctorList',httpOptions).pipe
     (map((res:ILisMed[])=>{
       return res;
     }))
  }
  getListMedPagination(page:string,size:string,c?:string):Observable<IDocListPag>{
    if(!c){
      c='';
    }
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token')
      }),params:new HttpParams().append('page',page).append('perpage',size).append('filter',c)
     }
     return this.http.get<IDocListPag>(this.direccion+'api/Medicos',httpOptions).pipe
     (map((res:IDocListPag)=>{
       return res;
     }))
  }
  getDetailsOrder(Ordernumb:number,x:number,c?:string):Observable<PaymentsDetailsI[]>{
    let httpOptionss;
    if(c){
      const httpOptions =
      {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
          Sede:String(x),
          cedula:c!
        }),
        params:new HttpParams().append('OrdNum',String(Ordernumb))
      }
      httpOptionss=httpOptions;
    }
    else if(!c){
      const httpOptions =
      {
        headers: new HttpHeaders({
          accept: '*/*',
          Authorization: "Bearer "+sessionStorage.getItem('token'),
          Sede:String(x)
        }),
        params:new HttpParams().append('OrdNum',String(Ordernumb))
      }
      httpOptionss=httpOptions;
    }
      return this.http.get<PaymentsDetailsI[]>(this.direccion+'api/Data/HonorariosData',httpOptionss)
      .pipe(map((res:PaymentsDetailsI[])=>{

        return res;
      }));
  }
}
