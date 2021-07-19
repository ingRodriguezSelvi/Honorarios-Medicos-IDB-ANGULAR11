import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ {path:'',redirectTo:'/login',pathMatch:'full'},
                        { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
                        { path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
                         { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
                         { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
                         { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) },
                         {path: '**', redirectTo: '/login',pathMatch:'full'}];

@NgModule({

  imports: [BrowserModule,
            FormsModule,
            RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }