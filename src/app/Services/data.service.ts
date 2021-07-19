import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cobros, F_MedicosI, Meses } from '@app/shared/components/models/data';
import { ILisMed, IMedFull, IMedUp } from '@app/shared/components/models/dataResponseMed';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
isLogin=false;
isAdmin1=false;
isDetails=false;
isLoadding=false;
isPrevimedica=false;
MesesView:Meses[]=[];
ordernesDate:Cobros[]=[];
flag=true;
msjx='';
resetFilters:boolean=true;
hC:boolean=false;
hXC:boolean=false;
hA:boolean=false;
c:boolean=true;
sede:number=0;
selectedVal:string='option1'
txtBtnDetails:string="Ver Ordenes";
anno:number=new Date().getFullYear()
mes:number=new Date().getMonth();
isMercadeo:boolean=false;
isFinanzas:boolean=false;
isCobroMed:boolean=false;
forgotCedula:string='';
isErr=false;
msjErr='';
isMobile=false;
listMed:ILisMed[]=[];
  constructor(private http:HttpClient) { }

getMedicoEdit(c:string):Observable<IMedUp>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token'),
      cedula:c
    })
  };
  return this.http.get<IMedUp>(`${environment.API_URL}api/Medicos/DoctorEditData`,httpOptions).pipe
  (map((res:IMedUp)=>{
    return res;
  }))
}
clearErr(){
  this.isErr=false;
  this.msjErr='';
}
}
