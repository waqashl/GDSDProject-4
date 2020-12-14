import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModelResponse } from '../_models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

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


  public getProducts(search: string = '') : Observable<ProductModelResponse> {    
    var url = search == '' ? "/products" : "/products?sq=" + search;     
    return this.http.get<ProductModelResponse>(this.baseUrl + url);
  }


}
