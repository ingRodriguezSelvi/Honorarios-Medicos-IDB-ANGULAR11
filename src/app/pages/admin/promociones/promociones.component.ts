import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminMedService } from '@app/Services/admin-med.service';
import { PromotionService } from '@app/Services/promotion.service';
import { OrdenMedica, Promotion } from '@app/shared/components/models/data';
import { CKEditorComponent } from 'ng2-ckeditor';
import { EditPromoComponent } from '../edit-promo/edit-promo.component';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  numNews:number=0;
  ckeditorContent:string='<p>Porbando</p>';
  @ViewChild(CKEditorComponent) ckEditor!:CKEditorComponent;
  promotion:Promotion={'id':0,'title':'','content':'','imageUrl':'','link':''}
  fileName = '';
  editNews=this.fb.group({
    id:[''],
    imageUrl:[''],
    title:[''],
    content:[''],
    link:['']
  });


  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  isEdit=false;
  displayedColumns: string[] = ['id','imgUrl','title','acciones'];
  constructor(public dataPromotions:PromotionService,public dialog:MatDialog,private fb:FormBuilder,public date:AdminMedService,private http: HttpClient) { }
  loadding=true;
  ngOnInit(): void {
    this.loadding=true;
    this.getPromotion();

  }

  openEdit(n:number){
    this.isEdit=true
    n=n-1

    this.getPromo(n);
  }
  openCreate(){

  }
  onFileSelected(event:any){

    this.isEdit=true;
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        const upload$ = this.http.post("/api/thumbnail-upload", formData);
        upload$.subscribe();
    }
  }
  delete(x:number){
  this.dataPromotions._Promociones.splice(x,1)
  }
  getPromotion(){
    this.dataSource=this.dataPromotions.getPromotions().subscribe(data=>{
      let orderData:Promotion[]=data;
      this.dataSource=new MatTableDataSource(orderData);

      this.loadding=false;
    })
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

    this.isEdit=false;
  })
}
getPromo(n:number){

  this.dataPromotions.getPromotions().subscribe(data=>{
    let orderData:Promotion[]=data;
    this.promotion=orderData[n];
  })
}
cancelar(){
  this.isEdit=false;
}
}
