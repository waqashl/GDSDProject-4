import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddItemDTO } from '../_models/add-item-dto';
import { ProductModelResponse } from '../_models/product-model';
import { CategoryModelResponse } from '../_models/category-model';
import { ProductDetailModelResponse } from '../_models/product-detail-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  filter : {
    search: string,
    pMin: number,
    pMax: number,
    cat: number,
    sortT: string,
    sortV: string,
  } = {
    search: null,
    pMin: null,
    pMax: null,
    cat: null,
    sortT: null,
    sortV: null,
  }

  constructor(private http: HttpClient) {    
  }
  
  productsDataFromDatabase = new BehaviorSubject<ProductModelResponse>({} as ProductModelResponse);

  filteredData = new BehaviorSubject<ProductModelResponse>({} as ProductModelResponse);

  public getProductsFromDatabase() {    
    //var url = search == '' ? "/products" : "/products?sq=" + search; 
    let url = "/products"
    this.http.get<ProductModelResponse>(this.baseUrl + url).subscribe(data=> {
      this.productsDataFromDatabase.next(data);
      this.filteredData.next(data);
    },
      error=>{});
  }

  public getProductsDetail(id: string = '') : Observable<ProductDetailModelResponse> {    
    var url  = "/products?id=" + id;     
    return this.http.get<ProductDetailModelResponse>(this.baseUrl + url);
  }

  public addProduct(obj: FormData) : Observable<any> {           
    return this.http.post(this.baseUrl + '/products/', obj);
  }

  public updateProductStatus(id: number,status:String){
    console.log(id)
    
    this.http.post<any>(this.baseUrl + "/products/update/status", { id,status }).subscribe(data=> {
      console.log(data)
    },
      error=>console.error);
 
  }


   
  public getProducts() : Observable<ProductModelResponse> {    
    var url = "/products";
    let paramAdded = false;
    if(this.filter.search) {
      url += "?sq="+this.filter.search;
      paramAdded = true
    }
    if(this.filter.cat) {
      url += (paramAdded ? '&':'?') + "cat="+this.filter.cat;
      paramAdded = true
    }
    if(this.filter.pMin && this.filter.pMin != 0) {
      url += (paramAdded ? '&':'?') + "pMin="+this.filter.pMin;
      paramAdded = true
    }
    if(this.filter.pMax && this.filter.pMax != 0) {
      url += (paramAdded ? '&':'?') + "pMax="+this.filter.pMax;
      paramAdded = true
    }
    if(this.filter.sortT && this.filter.sortV) {
      url += (paramAdded ? '&':'?') + "sortT="+this.filter.sortT+"&sortV="+this.filter.sortV;
      paramAdded = true
    }
    console.log("Request products: ", url);
    return this.http.get<ProductModelResponse>(this.baseUrl + url);
  }

  public getAllProducts() : Observable<ProductModelResponse> {    
    var url =  "/products/all"  
    return this.http.get<ProductModelResponse>(this.baseUrl + url);
  }
  

}
