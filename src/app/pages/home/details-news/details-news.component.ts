import { Component, Inject, OnInit,SecurityContext,ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminMedService } from '@app/Services/admin-med.service';
import { PromotionService } from '@app/Services/promotion.service';
import { Promotion } from '@app/shared/components/models/data';

@Component({
  selector: 'app-details-news',
  templateUrl: './details-news.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./details-news.component.css']
})
export class DetailsNewsComponent implements OnInit {
  promotion:Promotion={'id':0,'title':'','content':'','imageUrl':'','link':''}
  constructor(@Inject(MAT_DIALOG_DATA) public data:{x:number},public date:AdminMedService,public dataPromotion:PromotionService,public sanitizer:DomSanitizer) { }
  html:string='';
  ngOnInit(): void {

    this.getPromo();

  }
  getPromo(){
    this.dataPromotion.getPromotions().subscribe(data=>{
      let orderData:Promotion[]=data;
      this.promotion=orderData[this.data.x];
      this.promotion.content!=this.sanitizer.bypassSecurityTrustHtml(this.promotion.content);
    })
  }
  createElement(){
    // crea un nuevo div
  // y añade contenido
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode("Hola!¿Qué tal?");
  newDiv.appendChild(newContent); //añade texto al div creado.

  // añade el elemento creado y su contenido al DOM
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
  }
}
