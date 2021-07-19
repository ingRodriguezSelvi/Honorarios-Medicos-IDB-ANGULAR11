import { Component, Inject, OnInit } from '@angular/core';
import { Cobros, MedicosI, PaymentsDetailsI } from '@app/shared/components/models/data';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MedDataService } from '../Services/med-data.service';
import { AuthService } from '@app/pages/auth/auth.service';
import { PdfService } from '@app/Services/pdf.service';
import { DataService } from '@app/Services/data.service';
@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {
  displayedColumns: string[] = ['Numero de factura', 'Paciente','Fecha','Monto Honorario Bs','Monto Honorario USD'];
  dataSource = JSON.parse(sessionStorage.getItem('cobros')||'{}');
  totales= [{}];
  loadding=false;
  medico:MedicosI={'celular':0,'ciudad':'','email':'','sexo':'','zona':'','apellidos':'','id':0,'nombres':'','rif':'','direccion':''};
  sexo='';
  pagos:PaymentsDetailsI[]=[];
  date=new Date();
  ordersDetails?:PaymentsDetailsI[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{numero:number,totalBs:number,totalDol:number,x:number,f:Date},private oshvc:MedDataService ,private authSvc:AuthService
    ,public pdf:PdfService,public dataService:DataService) { }
  ngOnInit(): void {
      this.loadding=true
      this.oshvc.getDetailsOrder(this.data.numero,this.data.x).subscribe(res=>{
      let orderDara:PaymentsDetailsI[]=res;
      this.pagos=orderDara;
      this.ordersDetails=orderDara;
      this.loadding=false;
    })
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
  downloadPDF(): void {
    const DATA = document.getElementById('htmlDataa')

    this.pdf.downloadPDF(DATA!);
  }
}
