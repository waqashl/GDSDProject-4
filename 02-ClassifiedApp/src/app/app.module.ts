import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FakeServiceForTestingService } from './_services/fake-service-for-testing.service';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryListAndProductComponent } from './categories/CategoryListAndProduct.component';
import { HomeComponent } from './home/home.component';
import { CategoriesService } from './_services/categories.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helper/jwt.interceptor';
import { ErrorInterceptor } from './_helper/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    CategoryListAndProductComponent,
    HomeComponent  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [FakeServiceForTestingService, CategoriesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private library: FaIconLibrary) {

    //https://stackblitz.com/edit/angular-fontawesome-sample?file=src%2Fapp%2Fapp.module.ts
    //https://github.com/FortAwesome/angular-fontawesome
    library.addIcons(faSquare, faCheckSquare, farSquare, farCheckSquare, faStackOverflow, faGithub, faMedium);
  }

 }
