import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from './Services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MECM';
  deviceInfo:any
  constructor(private deviceService: DeviceDetectorService,private DataS:DataService) {
    this.epicFunction();
  }
  epicFunction() {
    this.deviceInfo=this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log('MOVIL',isMobile);
    console.log('Desktop',isDesktopDevice);
    console.log('Tablet',isTablet)
    if(isDesktopDevice==true){
      this.DataS.isMobile=false;
    }else if(isMobile==true){
      this.DataS.isMobile=true;
    }
  }
}
