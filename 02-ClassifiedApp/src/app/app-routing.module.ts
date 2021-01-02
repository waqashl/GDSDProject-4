import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListAndProductComponent } from './categories/CategoryListAndProduct.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './_helper/AuthGaurd'
import { MainComponent } from './main/main.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { SellItemComponent } from './sell-item/sell-item.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [

    {path: 'main', component: MainComponent},
    {path: 'search', component: SearchComponent},
    {path: 'detail', component: ProductDetailComponent},
    {path: 'sell-item', component: SellItemComponent},
    {path: 'chat', component: ChatUserComponent},
  ] },
 /* {path:"admin",canActivate:[AuthGuard],component:AdminComponent},*/
  {path:"admin",component:AdminComponent},

  {path: "**", redirectTo: '/home/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  

  
}
