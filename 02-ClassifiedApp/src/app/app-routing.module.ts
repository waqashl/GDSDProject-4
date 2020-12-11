import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListAndProductComponent } from './categories/CategoryListAndProduct.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './_helper/AuthGaurd'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
    {path: 'main', component: CategoryListAndProductComponent}
  ], canActivate: [AuthGuard] },
  {path: "**", redirectTo: '/home/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}
