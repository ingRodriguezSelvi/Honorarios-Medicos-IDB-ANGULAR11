import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DesactiveMedResponseI, F_MedicosI, Promotion, RegisterMedI } from '@app/shared/components/models/data';
import { ICreatedMed, IMedFull, IMedUp } from '@app/shared/components/models/dataResponseMed';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminMedService {
  constructor(
    private http:HttpClient
    ) { }

registerMed(newMed:ICreatedMed):Observable<IMedFull>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    })
  };
  return this.http.post<IMedFull>(`${environment.API_URL}api/Medicos/InsertDoctor`,newMed,httpOptions).
  pipe(map((res:IMedFull)=>{
    return res;
  }));
}
dataProfit(c:string):Observable<IMedFull>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    }),params:new HttpParams().append('cedula',c)
  };
  return this.http.get<IMedFull>(`${environment.API_URL}api/Medicos/DoctorProfitData`,httpOptions).pipe
  (map((res:IMedFull)=>{
    return res;
  }))
}

updateMed(med:IMedUp):Observable<IMedFull>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    })
  };
  return this.http.post<IMedFull>(`${environment.API_URL}api/Medicos/UpdateDoctor`,med,httpOptions).
  pipe(map((res:IMedFull)=>{
    return res;
  }));
}
disableMed(date:DesactiveMedResponseI):Observable<DesactiveMedResponseI>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    })
  };
  return this.http.post<DesactiveMedResponseI>(`${environment.API_URL}api/Medicos/EnableDisableDoctor`,date,httpOptions).pipe
  (map((res:DesactiveMedResponseI)=>{
    return res;
  }))
}
editPromo(x:Promotion):Observable<Promotion>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      accept: '*/*',
      Authorization: "Bearer "+sessionStorage.getItem('token')
    })
  };
  return this.http.post<Promotion>(`${environment.API_URL}api/Info/EditarPromocion`,x,httpOptions).pipe
  (map((res:Promotion)=>{
    return res;
  }))
}
getEditData(c:string):Observable<IMedUp>{

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

}
