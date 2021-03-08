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

  getAllCategories(): Observable<CategoryModelResponse> {
    return this.http.get<CategoryModelResponse>(this.baseUrl + "/category");

  }

  getAllCategoriesForAdmin(): Observable<CategoryModelResponse> {
    return this.http.get<CategoryModelResponse>(this.baseUrl + "/category/");

  }

  addCategory(category: string) {
    this.http.post<any>(this.baseUrl + "/category/add", { category }).subscribe(data => {
      console.log(data);
    },
      error => console.error);

  }

  deleteCategory(categoryId: number) {
    this.http.post<any>(this.baseUrl + "/category/delete", { categoryId }).subscribe(data => {
      console.log(data);
    },
      error => console.error);

  }

 
}
