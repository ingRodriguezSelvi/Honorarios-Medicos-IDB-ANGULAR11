import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '@app/Services/data.service';
import { EspecialidadI, F_MedicosI, MedicosI} from '@app/shared/components/models/data';
import { IChangePass } from '@app/shared/components/models/dataResponseMed';
import { AuthService } from '../auth.service';
import { TermsOfServicesComponent } from './terms-of-services/terms-of-services.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  especialidades:EspecialidadI[]=[{'especialidad':' ' ,'id': 0}]
  isNewPass=false;
  changePass:IChangePass={'anterior':'','nueva':''};
  registerForms=this.fr.group({
    id:[''],
    rif:[''],
    nombres:[''],
    apellidos:[''],
    sexo:[''],
    email:[''],
    especialidad:[''],
    celular:[''],
    zona:[''],
    ciudad:[''],
    direccion:[''],
    extId:[sessionStorage.getItem('cedula')]
  })
  updatePassword=this.fr.group({
    anterior:[''],
    nueva:[''],
    repnuev:[''],
  })
  medico:F_MedicosI={'id':0,'nombres':'','apellidos':'','celular':0,'ciudad':'','email':'','rif':'','sexo':'','zona':'','direccion':'','activo':false,
                      'especialidad':0,'extId':'','full_Name':''};
  constructor(private fr:FormBuilder, private authserv:AuthService,
    private router:Router,public dialog:MatDialog,public data:DataService) { }
  ngOnInit(): void {

    this.authserv.getEspecialidadTemp().subscribe(data=>{
      let oData:EspecialidadI[]= data;
      let cont:number=0;
      this.especialidades= oData;
    })
    this.authserv.saveMedRegister().subscribe(res=>{

      this.medico=res;
    })
  }
  registrar(x:MedicosI){
    this.isNewPass=true
    this.authserv.updateMedico(x).subscribe(data=>{
   });

  }
  updatePass(x:any){
    if(x.anterior===x.nueva){

      //contraseña igual que la anterior
    }else if(x.nueva===x.repnuev){
      //Proceso avanza

      this.changePass!.anterior=x.anterior;
      this.changePass!.nueva=x.nueva;

    this.authserv.changePass(this.changePass!).subscribe(data=>{(data)});
    sessionStorage.setItem('token',sessionStorage.getItem('tokenRegister')!);
      this.data.isLogin=true;
    this.router.navigate(['home']);
    }else if(x.nueva!=x.repnuev){
      //Las contraseñas no coinciden

    }


  }
  openModal(){
    if(this.registerForms.valid){
      return
    }
    this.dialog.open(TermsOfServicesComponent);
}
}
