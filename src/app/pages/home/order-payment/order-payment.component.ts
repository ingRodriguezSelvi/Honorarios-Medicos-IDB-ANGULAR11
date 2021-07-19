import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/pages/auth/auth.service';
import { Cobros, Medicos, Meses, OrdenMedica, Sedes } from '@app/shared/components/models/data';
import { DetailsOrderComponent } from '../details-order/details-order.component';
import { MedDataService } from '../Services/med-data.service';
import { FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DataService } from '@app/Services/data.service';
import {meses} from 'src/app/core/mocks/Constans/meses';
import { FiltersDataService } from '@app/Services/filters-data.service';
import { MatButtonToggle } from '@angular/material/button-toggle';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfService } from '@app/Services/pdf.service';
import { SumTotalService } from '@app/Services/sum-total.service';
@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {
  filtroFecha=this.fr.group({
    fecha:[''],
  })
  htmlData:any[]=[];
  cont:number=0;
  contS='';
  txtbtn='Ver Ordenes';
  totalBs:number=0;
  totalUsd:number=0;
  datee=new Date();
  mes=new Date().getMonth();
  meses:Meses[]=meses;
  mesesView:Meses[]=[];
  anos:number[]=[];
  ano=new Date().getFullYear();
  mesActual=new Date().getMonth();
  sedes:Sedes[]=[];
  msjx:string='';
  flag:boolean=false;
  isLoadding=true;
  ordensPayments:Cobros[]=[];
  active='active'
  active1='desactive'
  displayedColumns: string[] = [

                                'Numero de Factura','Numero de Orden','Paciente','Fecha de la Factura',
                                'Monto en Bs','Monto en $'
                               ];
  disclaimer:string[]=['','','','','Total Bs','Total Bs']
  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  montoBs="";
  constructor(
    public dialog:MatDialog,private medSrvc:MedDataService,private service:AuthService
    ,private fr:FormBuilder,public data:DataService, private filtersData:FiltersDataService
    ,public pdf:PdfService,private suma:SumTotalService
    ) {}
  openModal(numero:number,totalBs:number,totalDol:number,x:number,f:Date){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.width="100%";
    dialogConfig.data={numero,totalBs,totalDol,x,f}
    this.dialog.open(DetailsOrderComponent,dialogConfig);
  }
  ngOnInit(): void {

    this.getAnos();
    let date:Date= new Date();
    this.mes=date.getMonth()+1;
    console.log(this.mes,this.meses[this.mes-1].nombre)
    this.ano=date.getFullYear();
    this.data.hC=true
    this.data.isDetails=false;
    this.medSrvc.getSedes().subscribe(data=>{
      let dataSedes:Sedes[]=data;
      this.sedes=dataSedes;
    //  let aux:number= dataSedes.length;
    //  this.tipoSede(dataSedes[aux-1].id)
     this.tipoSede(1,this.ano,this.mes);
    },((err)=>{
      this. data.isLoadding=false;
      this.data.isErr=true;
      this.data.msjErr='Error de conexion por favor intenta mas tarde';
    }))
  }
  reload(){
    this.data.clearErr();
    this.ngOnInit();
  }
  tipoHono(x:string){
    this.filtersData.tipoHono(x);
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
downloadPDF(): void {
  const DATA = document.getElementById('htmlData')
  this.pdf.downloadPDF(DATA!);
}

 tipoSede(x:number,a:number,m:number,e?:MatButtonToggle){
    this.active='active';
    this.active1='desactive';
    this.tipoHono('option1');
    let mes= m;
    this.isLoadding=true;
    this.data.sede=x;
    this.data.isPrevimedica=false;
    this.data.hXC=false;
    if(x==4){
      this.data.isPrevimedica=true;
      this.isLoadding=false;
    }
    if(this.data.isPrevimedica==true){
      return;
    }else if(this.data.isPrevimedica==false){
    this.dataSource=this.medSrvc.getOrder(x,a,mes).subscribe(data=>{
    let orderData:Cobros[]= data;
    for(x=0;x<orderData.length;x++){
      this.cont=this.cont+1;
      this.contS=String(this.cont);
      console.log(this.cont)
    }
    this.ordensPayments=orderData;
    let l=orderData.length;
    //////////////////////////////////
    this.totalUsd=this.suma.sumaDol(l,orderData)
    /////////////////////////////////
    //////////////////////////////////
     this.totalBs=this.suma.sumaBs(l,orderData)
    /////////////////////////////////
    this.dataSource=new MatTableDataSource(orderData);
    this.isLoadding=false;
    if(orderData.length>0){
      this.flag=true;
    }else{
      this.flag=false;
      this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
    }
  },((err)=>{
    this. data.isLoadding=false;
    this.data.isErr=true;
    this.data.msjErr='Error de conexion por favor intenta mas tarde';
  }))}
 }
 viewOrdenes(){
  this.filtersData.viewOrdenes();
  this.txtbtn=this.data.txtBtnDetails;
 }
 getAnos(){
  this.filtersData.getAnos();
 }
 aplyFilterDate(ano:number,mes:number,idSede:number){
   this.mes=mes;
   console.log(this.mes)
   this.isLoadding=true;
   this.flag=false;
   let mA=new Date().getMonth()+1
   if(mes>mA){
    this.dataSource=this.medSrvc.getOrder(idSede,ano-1,mes).subscribe(data=>{
      let orderData:Cobros[]= data;
      let l=orderData.length;
    //////////////////////////////////
    this.totalUsd=this.suma.sumaDol(l,orderData)
    /////////////////////////////////
    //////////////////////////////////
     this.totalBs=this.suma.sumaBs(l,orderData)
    /////////////////////////////////
      this.dataSource=new MatTableDataSource(orderData);
      this.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
      }
    },
    (()=>{
      this.isLoadding=false;
      this.data.isErr=true;
      this.data.msjErr='Error de conexion por favor intenta mas tarde';
    }))
   }else if(mA>=mes){
    this.dataSource=this.medSrvc.getOrder(idSede,ano,mes).subscribe(data=>{
      let orderData:Cobros[]= data;
      this.ordensPayments=orderData;
      let l=orderData.length;
    //////////////////////////////////
    this.totalUsd=this.suma.sumaDol(l,orderData)
    /////////////////////////////////
    //////////////////////////////////
     this.totalBs=this.suma.sumaBs(l,orderData)
    /////////////////////////////////
      this.dataSource=new MatTableDataSource(orderData);
      this.isLoadding=false;
      if(orderData.length>0){
        this.flag=true;
      }else{
        this.flag=false;
        this.msjx='El rango de fecha y sede seleccionado no tiene informacion para mostrar. Por favor seleccione otro rango de fecha';
      }
   },
   (()=>{
    this.isLoadding=false;
    this.data.isErr=true;
    this.data.msjErr='Error de conexion por favor intenta mas tarde';
  }))}
 }
 expression(x:string){
   this.tipoHono(x);
   if(this.active==='desactive'){
    this.active='active';
    this.active1='desactive';
  }
 }
 expression1(x:string){
  this.tipoHono(x);
  if(this.active1==='desactive'){
   this.active1='active1';
   this.active='desactive';
 }
}
}
