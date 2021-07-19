import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { TermsOfServicesComponent } from '@app/pages/auth/register/terms-of-services/terms-of-services.component';
import { AdminMedService } from '@app/Services/admin-med.service';
import { EspecialidadI, F_MedicosI, MedicosI, RegisterMedI } from '@app/shared/components/models/data';
import { ICreatedMed, IMedFull } from '@app/shared/components/models/dataResponseMed';


@Component({
  selector: 'app-create-med',
  templateUrl: './create-med.component.html',
  styleUrls: ['./create-med.component.css']
})
export class CreateMedComponent implements OnInit {
  especialidades:EspecialidadI[]=[{'especialidad':' ' ,'id': 0}]
  _flag=false;
  noData:string='';
  flag=false;
  isData=false;
  msjx:string='';
  messageErr:string='';
_medico:IMedFull={
  'activo':false,
  'apellidos':'',
  'celular':'',
  'ciudad':'',
  'direccion':'',
  'email':'',
  'full_Name':'',
  'id':0,
  'nombres':'',
  'rif':'',
  'sexo':'',
  'zona':'',
  'extId':'',
  'especialidad':0
}

createdMed=this.fr.group({
  id:[0],
  extId: [''],
  nombres: [''],
  apellidos: [''],
  full_Name: [''],
  rif: [''],
  direccion: [''],
  email: [''],
  celular: [''],
  sexo: [''],
  zona: [''],
  ciudad: [''],
  especialidad: [''],
  activo: [false]
})
userAcountMed=this.fr.group({
  username:[''],
  password:[''],
  contrato:[false],
  cortesia:[false]
})
  constructor(private fr:FormBuilder,private authserv:AuthService,public dialog:MatDialog,private  adminService:AdminMedService) { }

  ngOnInit(): void {
    this.authserv.getEspecialidad().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      let cont:number=0;
      this.especialidades= oData;
    })

  }
  registrar(){

    const dataRegister:ICreatedMed=
    {
      'medico':this.createdMed.value,
      'contrato':this.userAcountMed.value.contrato,
      'cortesia':this.userAcountMed.value.cortesia,
      'password':this.userAcountMed.value.password,
      'username':this.userAcountMed.value.username
    }


    this.adminService.registerMed(dataRegister).subscribe(res=>{

    },(err=>{
      this._flag=true;
      this.messageErr=err.error;
    }))
  }
  getDataProfit(c:string){

    this.adminService.dataProfit(c).subscribe(res=>{
      this.isData=true

      this._medico=res;
      if(this._medico.extId===null){
        this.noData='No hay informacion en Profit, por favor completa los datos manualmente'
      }

    },(err=>{

      this.msjx=err.error;
      this.flag=true;
      this.isData=false;
    }))
  }
  onKeydown(event: any) {
    if (event.key === "Enter") {

    }
  }
  reload(){
    this._flag=false;
    this.flag=false;
  }

}
