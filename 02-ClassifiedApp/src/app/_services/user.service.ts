import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModelResponse } from '../_models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {    
  }
  
  usersDataFromDatabase = new BehaviorSubject<UserModelResponse>({} as UserModelResponse);


  public getAllUsers() {    
    //var url = search == '' ? "/products" : "/products?sq=" + search; 
    let url = "/user/all"
    this.http.get<UserModelResponse>(this.baseUrl + url).subscribe(data=> {
      this.usersDataFromDatabase.next(data);
    },
      error=>{});
  }


  public updateUserStatus(id: number,status:String){
    console.log(id)
    
    this.http.post<any>(this.baseUrl + "/user/update/status", { id,status }).subscribe(data=> {
      console.log(data)
    },
      error=>console.error);
 
  }


 /* public getProducts(search: string = '') : Observable<ProductModelResponse> {    
    var url = search == '' ? "/products" : "/products?sq=" + search;     
    return this.http.get<ProductModelResponse>(this.baseUrl + url);
  }*/

  public getAllUser() : Observable<UserModelResponse[]> {    
    var url =  "/user/all"  
    return this.http.get<UserModelResponse[]>(this.baseUrl + url);
  }
  


}
