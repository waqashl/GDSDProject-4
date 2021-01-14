import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Product, ProductModelResponse } from 'src/app/_models/product-model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CategoriesService } from 'src/app/_services/categories.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.css']
})
export class ProductsSearchComponent implements OnInit {
  
  @Input() categoryId: number;
  @Input() searchString: string;
  @Input() isTopRecord: boolean;

  products = {} as ProductModelResponse;
  totalRecords = 0;
  isLoaded = false;
  sortT: string;
  sortV: string;
  pMin: number;
  pMax: number;
  sortIndex: number = 0;
  
  baseUrl = environment.apiUrl;




  constructor(private _http: HttpClient,
		private _categoryService: CategoriesService,
    private _productService: ProductService,
    private _authService: AuthenticationService) { 
  }

  ngOnInit(): void {
  
    //console.log(this.categoryId);

   // console.log(this.searchString);


    if(this.categoryId != undefined && this.searchString != undefined)
    {
      this.getProducts();
      //this._productService.productsDataFromDatabase.subscribe(data=> {      
			//this.products = data;
      //}, error=>{});
    }
  }

  getProducts(){    

    this.isLoaded = false;
    if(!this.isTopRecord)
    {
      console.log('calling product-search.component');
      //console.log(this.searchString);
      
      this._productService.getProducts().subscribe(data=> {
      
        console.log(data);
        
        let p = data.products;
        if(this.categoryId != 0)
        {
          p = data.products.filter(m=> m.category == this.categoryId);
        }
        
        this.products = {products: p} as ProductModelResponse;
        this.totalRecords = this.products.products.length;
        this.isLoaded = true;
        //this._productService.productsDataFromDatabase.next({products: p} as ProductModelResponse);
      }, error=>{console.log(error)});
  
    }
    else
    {
      //top record
      this._productService.getProducts().subscribe(data=> {
      
        let p = data.products;
        if(this.categoryId != 0)
        {
          p = data.products.filter(m=> m.category == this.categoryId);
        }
        
        this.products = {products: p} as ProductModelResponse;
        this.isLoaded = true;
        //this._productService.productsDataFromDatabase.next({products: p} as ProductModelResponse);
      }, error=>{console.log(error)});
    }

  }

  sortChanged() {
    this.sortT = null;
    this.sortV = null;

    if(this.sortIndex == 0 || this.sortIndex == 1) {
      this.sortT = 'dt';
      this.sortV = this.sortIndex == 1 ? 'asc' : 'desc';
    }
    else if(this.sortIndex == 2 || this.sortIndex == 3) {
      this.sortT = 'p';
      this.sortV = this.sortIndex == 3 ? 'asc' : 'desc';
    }

    if(this.sortT && this.sortV) {
      this._productService.filter.sortT = this.sortT;
      this._productService.filter.sortV = this.sortV;
    }
    this.getProducts();
  }

  priceChanged() {
    this._productService.filter.pMin = this.pMin;
    this._productService.filter.pMax = this.pMax;
    this.getProducts();
    return false;
  }

}
