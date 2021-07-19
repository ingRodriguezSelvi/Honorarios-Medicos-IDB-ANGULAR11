import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { DataService } from '@app/Services/data.service';
import { PromotionService } from '@app/Services/promotion.service';
import { MedicosI, Promotion } from '@app/shared/components/models/data';
import { DetailsNewsComponent } from '../details-news/details-news.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  medico:MedicosI={'celular':0,'ciudad':'','email':'','sexo':'','zona':'','apellidos':'','id':0,'nombres':'','rif':'','direccion':''};
  sexo='';
  date=new Date();
  promotions:Promotion[]=[];
  content1:string='';
  content2:string='';
  constructor(private authSvc:AuthService,public dataPromotions:PromotionService,public dialog:MatDialog,public data:DataService) { }

  ngOnInit(): void {
    this.getPromotions();

    this.authSvc.saveMedico().subscribe(res=>{
      let medico:MedicosI= res;
      this.medico=medico;
      if(medico.sexo==='F'){
        this.sexo='Dra.';
      }else if(medico.sexo==='M'){
        this.sexo='Dr.'
      }
    })
  }
  clearHtml(){
    var contenido1 =this.promotions[0].content;
    this.content1 = contenido1.replace(/<[^>]*>?/g, '');
    var contenido2 =this.promotions[1].content;
    this.content2 = contenido2.replace(/<[^>]*>?/g, '');
  }
  getPromotions(){
    this.dataPromotions.getPromotions().subscribe(data=>{
      let orderData:Promotion[]=data;
     this.promotions=orderData;
     this.clearHtml();
    this.promotions[0].content=this.content1
    this.promotions[1].content=this.content2
    })
  }
  getDetailNews(x:number){
    x=x-1
    this.dialog.open(DetailsNewsComponent,{data:{x}});
  }

}
