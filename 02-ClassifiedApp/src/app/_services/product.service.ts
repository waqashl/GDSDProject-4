import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddItemDTO } from '../_models/add-item-dto';
import { ProductModelResponse } from '../_models/product-model';
import { CategoryModelResponse } from '../_models/category-model';

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

  public addProduct(obj: FormData) : Observable<any> {           
    return this.http.post(this.baseUrl + '/products/', obj);
  }


}
