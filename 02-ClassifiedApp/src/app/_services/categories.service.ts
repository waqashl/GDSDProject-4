import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModelResponse } from '../_models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  public getAllCategories() : Observable<CategoryModelResponse> {
    return this.http.get<CategoryModelResponse>(this.baseUrl + "/category");

  }

}
