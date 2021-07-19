import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminMedService } from '@app/Services/admin-med.service';
import { PromotionService } from '@app/Services/promotion.service';
import { Promotion } from '@app/shared/components/models/data';
import { CKEditorComponent, CKEditorModule } from 'ng2-ckeditor';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.css']
})
export class EditPromoComponent implements OnInit {

  fileName = '';
  ckeditorContent:string='<p>Porbando</p>';
  @ViewChild(CKEditorComponent) ckEditor!:CKEditorComponent;
  editNews=this.fb.group({
    id:[''],
    imageUrl:[''],
    title:[''],
    content:[''],
    link:['']
  });
  promotion:Promotion={'id':0,'title':'','content':'','imageUrl':'','link':''}
  constructor(@Inject(MAT_DIALOG_DATA) public data:{n:number},public date:AdminMedService,private fb:FormBuilder,public dataPromotion:PromotionService
  ,private http: HttpClient) { }

  ngOnInit(): void {
    this.getPromo();

  }
  onFileSelected(event:any){
    const file:File = event.target.files[0];
    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
}
  ngAfterViewChecked(): void {


    let editor= this.ckEditor?.instance;
    editor.config.height='400';
    editor.config.language='es';
    editor.config.uiColor = '#F7B42C';
    editor.config.toolbarCanCollapse = true;

  }
  edit(){
    const formValue=this.editNews.value
    this.date.editPromo(formValue).subscribe(res=>{
    })
  }
  getPromo(){
    this.dataPromotion.getPromotions().subscribe(data=>{
      let orderData:Promotion[]=data;
      this.promotion=orderData[this.data.n-1];
    })
  }

}
