import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { meses } from '@app/core/mocks/Constans/meses';
import { DataService } from '@app/Services/data.service';
import { PdfService } from '@app/Services/pdf.service';
import { SumTotalService } from '@app/Services/sum-total.service';
import { HonoXPagar, Meses } from '@app/shared/components/models/data';
import { MedDataService } from '../Services/med-data.service';

@Component({
  selector: 'app-hono-por-pagar',
  templateUrl: './hono-por-pagar.component.html',
  styleUrls: ['./hono-por-pagar.component.css']
})
export class HonoPorPagarComponent implements OnInit {
  @Input() tiposedes?:number;
  @Input() mes?:number;
  @Input() ano?:number;
  totalBs =0;
  totalUsd=0;
  mesView='';
  meses:Meses[]=meses;
  mesActual=new Date().getMonth();
  flag:boolean=false;
  msjx:string='';
  odersForPayments:HonoXPagar[]=[];
  isLoadding=true;
  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  displayedColumns: string[] = [
    'numero','fecha','paciente','montoBs','montoDol',];
  constructor(private medSrvc:MedDataService,public data:DataService,public pdf:PdfService,private suma:SumTotalService) { }

  ngOnInit(): void {
    this.getOrder();
    this.mesView=this.meses[this.mes!-1].nombre;
  }
  downloadPDF(): void {
    const DATA = document.getElementById('htmlDataXpagar')
    this.pdf.downloadPDF(DATA!);
  }
  getOrder(){
    this.isLoadding=true
    this.dataSource=this.medSrvc.getOrderXPagar(this.tiposedes!,this.data.anno,this.data.mes+1).
    subscribe(data=>{
      let orderData:HonoXPagar[]=data;
      this.odersForPayments=orderData;
      let l=orderData.length;
    //////////////////////////////////
    this.totalUsd=this.suma.sumaDolXC(l,orderData)
    /////////////////////////////////
    //////////////////////////////////
     this.totalBs=this.suma.sumaBsXC(l,orderData)
    /////////////////////////////////
      this.dataSource=new MatTableDataSource(orderData);
      this.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
      }
    })
  }
  aplyFilterDate(a:number,m:number,s:number){
    this.mesView='Mes';
    if(m==12){
      this.mesActual=11;
    }
    this.isLoadding=true;
    this.flag=false;
    let aA=new Date().getFullYear()-1
    let mA=new Date().getMonth()+1
    if(m>mA){
      this.dataSource=this.medSrvc.getOrderXPagar(s,aA,m)
      .subscribe(data=>{
        let orderData:HonoXPagar[]=data;
        this.odersForPayments=orderData;
        let l=orderData.length;
        //////////////////////////////////
        this.totalUsd=this.suma.sumaDolXC(l,orderData)
        /////////////////////////////////
        //////////////////////////////////
         this.totalBs=this.suma.sumaBsXC(l,orderData)
        /////////////////////////////////
        this.dataSource=new MatTableDataSource(orderData);
        this.isLoadding=false;
        if(orderData.length>0){
          this.flag=true;
        }else{
          this.flag=false;
          this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
        }
      })
    }else if(mA>=m){
      this.dataSource=this.medSrvc.getOrderXPagar(s,a,m)
      .subscribe(data=>{
        let orderData:HonoXPagar[]=data;
        this.odersForPayments=orderData;
        let l=orderData.length;
        //////////////////////////////////
        this.totalUsd=this.suma.sumaDolXC(l,orderData)
        /////////////////////////////////
        //////////////////////////////////
         this.totalBs=this.suma.sumaBsXC(l,orderData)
        /////////////////////////////////
        this.dataSource=new MatTableDataSource(orderData);
        this.isLoadding=false;
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
