import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { AdminMedService } from '@app/Services/admin-med.service';
import { DataService } from '@app/Services/data.service';
import { EspecialidadI, F_MedicosI } from '@app/shared/components/models/data';
import { IMedFull, IMedUp } from '@app/shared/components/models/dataResponseMed';

@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent implements OnInit {
  flag=false;
especialidades:EspecialidadI[]=[{'especialidad':' ' ,'id': 0}]
_medico:IMedUp={
  'medico':{
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
  },
  'contrato':false,
  'cortesia':false
}
updateMed=this.fr.group({
  id:[''],
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
  activo: [''],

})
especiales=this.fr.group({
  contrato:[false],
  cortesia:[false]
})
  constructor(@Inject(MAT_DIALOG_DATA) public data:{c:string},private fr:FormBuilder,public med:AuthService,private date:DataService,private  adminService:AdminMedService) { }

  ngOnInit(): void {
    this.flag=false;

      this.date.getMedicoEdit(this.data.c).subscribe(data=>{
        this._medico=data;
        this.flag=true;
      })
      this.med.getEspecialidad().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      this.especialidades= oData;
    })
  }
  updateMedi(){
    if(this.updateMed.invalid){
      return;
    }

   const dataUp:IMedUp={'contrato':this.especiales.value.contrato,'cortesia':this.especiales.value.cortesia,'medico':this.updateMed.value}
    this.adminService.updateMed(dataUp).subscribe(data=>{

   })
  }

}
