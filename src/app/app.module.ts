import {  CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {MaterialModule} from './material.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HashLocationStrategy, registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { ContactComponent } from './shared/components/contact/contact.component';
import { CKEditorModule } from 'ng2-ckeditor';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';


registerLocaleData(localeEsAr);


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#0077cb',
  bgsOpacity: 0.5,
   bgsPosition: 'bottom-right',
   bgsSize: 60,
   bgsType: 'ball-spin-clockwise',
   blur: 5,
   delay: 0,
   fastFadeOut: true,
   fgsColor: '#0077cb',
   fgsPosition: 'center-center',
   fgsSize: 60,
   fgsType: 'ball-spin-clockwise',
   gap: 24,
   logoPosition: 'center-center',
   logoSize: 110,
   logoUrl: 'https://idbclinicas.com/wp-content/uploads/2017/09/grupo-de-clinicas-diapo.png',
   masterLoaderId: 'master',
   overlayBorderRadius: '0',
   overlayColor: 'rgba(175,175,175,0.8)',
   pbColor: '#0077cb',
   pbDirection: 'ltr',
   pbThickness: 3,
   hasProgressBar: true,
   text: 'IDB',
   textColor: '#FFFFFF',
   textPosition: 'center-center',
   maxTime: -1,
   minTime: 300  
};




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    CKEditorModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Ar',useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {  }
