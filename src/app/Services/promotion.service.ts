import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '@app/shared/components/models/data';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {



  _Promociones:Promotion[]=[];

  //---//

  constructor(private http:HttpClient) { }

  getPromotions(){
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: "Bearer "+sessionStorage.getItem('token'),
        sede:'4'
      })}
    return this.http.get<Promotion[]>(`${environment.API_URL}api/Info/Promociones`,httpOptions)
    .pipe(map((res:Promotion[])=>{
      return res;
    }))
  }

}
