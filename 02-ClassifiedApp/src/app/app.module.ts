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
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SellItemComponent } from './sell-item/sell-item.component';
import { ProductsSearchComponent } from './search/products-search/products-search.component';
import { LoaderAnimationComponent } from './_helperComponents/loader-animation/loader-animation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    CategoryListAndProductComponent,
    HomeComponent,
    MainComponent,
    SearchComponent,
    ProductDetailComponent,
    SellItemComponent,
    ProductsSearchComponent,
    LoaderAnimationComponent
      ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule,
    FontAwesomeModule,
    NgxGalleryModule
  ],
  providers: [FakeServiceForTestingService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private library: FaIconLibrary) {

    //https://stackblitz.com/edit/angular-fontawesome-sample?file=src%2Fapp%2Fapp.module.ts
    //https://github.com/FortAwesome/angular-fontawesome
    library.addIcons(faSquare, faCheckSquare, farSquare, farCheckSquare, faStackOverflow, faGithub, faMedium);
  }

 }
