import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { meses } from '@app/core/mocks/Constans/meses';
import { DataService } from '@app/Services/data.service';
import { PdfService } from '@app/Services/pdf.service';
import { SumTotalService } from '@app/Services/sum-total.service';
import { Cobros, Meses } from '@app/shared/components/models/data';
import { MedDataService } from '../Services/med-data.service';

@Component({
  selector: 'app-previ',
  templateUrl: './previ.component.html',
  styleUrls: ['./previ.component.css']
})
export class PreviComponent implements OnInit {
@Input() mes?:number;
totalBs:number=0;
totalUsd:number=0;
anno= new Date().getFullYear();
displayedColumns: string[] = ['numero','numfac','fecha','montoBs'];
dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
meses:Meses[]=meses;
mesView='';
cobrosPrevi:Cobros[]=[];
mesActual=new Date().getMonth();
flag:boolean=false;
msjx:string='';
isLoadding=false;
  constructor(public data:DataService,private orderServices:MedDataService,public pdf:PdfService,private suma:SumTotalService) { }
  ngOnInit(): void {
    this.data.isLoadding=false;
    this.isLoadding=true;
    this.getOrderPrevi()
    this.mesView=this.meses[this.mes!-1].nombre;
  }
  getOrderPrevi(){

      this.dataSource=this.orderServices.getOrderPrevi(4,this.anno,this.mesActual+1).subscribe(data=>{
      let orderData:Cobros[]= data;
      this.cobrosPrevi=orderData;
      let l=orderData.length;
    //////////////////////////////////
    this.totalUsd=this.suma.sumaDolPrevi(l,orderData)
    /////////////////////////////////
    //////////////////////////////////
     this.totalBs=this.suma.sumaBsPrevi(l,orderData)
    /////////////////////////////////
      this.dataSource=new MatTableDataSource(orderData);
      this.data.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha o sede';
      }
  })
  }
  downloadPDF(): void {
    const DATA = document.getElementById('htmlDataPrevi')
    this.pdf.downloadPDF(DATA!);
  }
  aplyFilterDate(a:number,m:number,s:number){
    this.mesView='Mes';
    if(m==12){
      this.mesActual=11
    }
    this.flag=false;
    let aA:number=new Date().getFullYear()-1
    let mA:number=new Date().getMonth()+1
    if(m>mA){
      this.dataSource=this.orderServices.getOrderPrevi(s,aA,m)
      .subscribe(data=>{
        let orderData:Cobros[]=data;
        this.cobrosPrevi=orderData;
        this.dataSource=new MatTableDataSource(orderData);
        let l=orderData.length;
    //////////////////////////////////
    this.totalUsd=this.suma.sumaDolPrevi(l,orderData)
    /////////////////////////////////
    //////////////////////////////////
     this.totalBs=this.suma.sumaBsPrevi(l,orderData)
    /////////////////////////////////
        this.data.isLoadding=false;
        if(orderData.length>0){
          this.flag=true;
        }else{
          this.flag=false;
          this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
        }
      })
    }else if(mA>=m){
      this.dataSource=this.orderServices.getOrderPrevi(s,a,m)
      .subscribe(data=>{
        let orderData:Cobros[]=data;
        this.cobrosPrevi=orderData;
        let l=orderData.length;
    //////////////////////////////////
    this.totalUsd=this.suma.sumaDolPrevi(l,orderData)
    /////////////////////////////////
    //////////////////////////////////
     this.totalBs=this.suma.sumaBsPrevi(l,orderData)
    /////////////////////////////////
        this.dataSource=new MatTableDataSource(orderData);
        this.data.isLoadding=false;
        if(orderData.length>0){
          this.flag=true;
        }else{
          this.flag=false;
          this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
        }
      })
    }
  }
}
