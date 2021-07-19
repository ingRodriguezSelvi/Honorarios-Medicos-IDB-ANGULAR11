import { Component, OnInit } from '@angular/core';
import { User, UserResponse } from '@app/shared/components/models/user.interface';
import { AuthService } from '../auth.service';
import{FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import{AlertasService} from '../../home/Services/alertas/alertas.service'
import { from } from 'rxjs';
import { DataService } from '@app/Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegister=false;
  isLoadding=false;
  isCortesia=false;
  loginForm = this.fb.group({
    cedula:[''],
    password:[''],
  });
  errorStatus= false;
  msj="";

  constructor(
    private authSvc:AuthService,
    private fb:FormBuilder,
    private router:Router,
    public dialog:MatDialog,
    public data:DataService
    ) { }
  ngOnInit(): void {
    this.checkToken();
  }
  checkToken(){
    if(sessionStorage.getItem('token')){
      this.router.navigate(['home']);
    }
  }
  onLogin():void{
    if(this.loginForm.invalid){

      return;
    }
    this.isLoadding=true;
    const formValue=this.loginForm.value;
    let cacheUser:User=formValue;
    this.authSvc.login(formValue).subscribe(data=>{
      let dataResponse:UserResponse=data;

      if(dataResponse.succeeded==false){
        this.isLoadding=false;
        this.errorStatus=true;
        this.data.clearErr();

        this.msj=dataResponse.message;
      }else if(dataResponse.succeeded==true && dataResponse.statusCode===401 && dataResponse.result.rol=='MEDICO'){
        this.isLoadding=false;
        console.log(dataResponse.statusCode)
        this.data.clearErr();
        sessionStorage.setItem('tokenRegister',data.result.token);
        sessionStorage.setItem('cedula',cacheUser.cedula);
        sessionStorage.setItem('password',cacheUser.password);
        this.router.navigate(['register'])// descomentar al momento dehabilitar contratos
       this.isRegister=true;
       this.isCortesia=true;
        this.data.isLogin=true;
      }
      else if(dataResponse.succeeded==true && dataResponse.statusCode===200 && dataResponse.result.rol=='MEDICO'){
        this.isLoadding=false;
        sessionStorage.setItem('token',data.result.token);
        this.router.navigate(['home']); //descomentar al momento dehabilitar contratos
        this.isCortesia=true;
        this.data.isLogin=true;
        this.data.clearErr();
      }
      else if(dataResponse.result.rol==='USUARIO'){
        this.isLoadding=false;
        sessionStorage.setItem('token',data.result.token);
        this.router.navigate(['admin']);
        this.data.isLogin=true;
        this.data.isFinanzas=true;
        this.data.clearErr();
      }
    },(err=>{
      this.isLoadding=false;
      this.data.isErr=true;
      this.data.msjErr='Error de conexion por favor intenta mas tarde';
    }))
  }
  openModal(){
    this.dialog.open(ResetpasswordComponent);
  }
  //goToHome(){ //Comentar al momento de habilitar contratos
  //  if (this.isRegister==true){
   //   this.router.navigate(['register'])
  //  }else if(this.isRegister==false){
  //    this.router.navigate(['home']);
  //  }
  //}
}
