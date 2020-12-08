import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModelResponse } from '../_models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }


  public getProducts(search: string = '') : Observable<ProductModelResponse> {

    var url = search == '' ? "/products" : "/products?sq=" + search; 
    return this.http.get<ProductModelResponse>(this.baseUrl + url);

  }
}
