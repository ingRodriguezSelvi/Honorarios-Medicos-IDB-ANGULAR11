import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '@app/Services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin=false;
@Output() toggleSidenav= new EventEmitter<void>();
  constructor(
    private authSvc:AuthService,
    private router:Router,
    public data:DataService,
    public dialog:MatDialog
    ) { }
  ngOnInit(): void {

    if(sessionStorage.getItem('token')){
      this.data.isLogin=true;
    }
  }
  onToggleSidenav():void{
    this.toggleSidenav.emit();
  }
  closedSesion(){
    this.authSvc.logout();
    this.router.navigate(['login']);
    if(!sessionStorage.getItem('token')){
      this.data.isLogin=false;
    }
  }
  openContact(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.width="100%";
    this.dialog.open(ContactComponent,dialogConfig)
  }

}
