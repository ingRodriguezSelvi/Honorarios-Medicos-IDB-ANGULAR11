import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit,Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedDataService } from '@app/pages/home/Services/med-data.service';
import { AdminMedService } from '@app/Services/admin-med.service';
import { DataService } from '@app/Services/data.service';
import { DesactiveMedResponseI, F_MedicosI } from '@app/shared/components/models/data';
import { IDocListPag, ILisMed } from '@app/shared/components/models/dataResponseMed';
import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CreateMedComponent } from '../create-med/create-med.component';
import { EditMedComponent } from '../edit-med/edit-med.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  loadding=true;
  medicos:IDocListPag[]=[];
  cedula:string='';
  desactive:DesactiveMedResponseI={'enable':false,'id':0};
  displayedColumns: string[] = ['Nombre','cedula','direccion','contrato','cortesia','acciones'];
  dataSource:any
  datebase:MedDataService|undefined;
  constructor(public dialog:MatDialog,private dataService:MedDataService,public data:DataService,private  adminService:AdminMedService,private _httpClient: HttpClient) { }
  ngOnInit(): void {
    this.loadding=true;
    this.getListMed();
    this.getListMedPagination();
  }
  applyFilter(c:string) {
    this.dataService.getListMedPagination('1','10',c).subscribe(data=>{
      this.loadding=false
      this.dataSource=data;
    })
  }
  addMed(){
    this.dialog.open(CreateMedComponent).afterClosed().subscribe(()=>{
      this.loadding=true;
      this.getListMed();

    });
  }
  getListMed(){
    this.dataService.getListMed().subscribe(data=>{
     // this.medicos=data;
     // this.dataSource=new MatTableDataSource(data);
      this.loadding=false;
      this.data.listMed=data;
     // this.dataSource.paginator.pageIndex
    })
  }
  getListMedPagination(){
    this.dataService.getListMedPagination('1','10').subscribe(data=>{
      console.log(data)
      this.dataSource=data;
    })
  }
  onPaginateChange(event:PageEvent){
    let page=event.pageIndex;
    let size=event.pageSize;
    page=page+1;
    this.dataService.getListMedPagination(String(page),String(size)).subscribe(data=>{
      this.dataSource=data;
    })
  }
  getCobro(x:string){
    this.cedula=x;
    this.data.isCobroMed=true;
  }
  editMed(c:string){
    this.dialog.open(EditMedComponent,{data:{c}}).afterClosed().subscribe(()=>{
     this.loadding=true;
      this.getListMed();
    })
  }
  deleteMed(x:number){
    this.desactive.id=x;
    this.desactive.enable=false;
    this.adminService.disableMed(this.desactive).subscribe(data=>{
    })
  }
}
