import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserDetails } from '../_models/user-model';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserDetails>;
    public currentUser: Observable<UserDetails>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserDetails {
        return this.currentUserSubject.value;
     
    }
    private baseUrl = environment.apiUrl;

    login(email: string, password: string) {
        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': 'http://localhost:2000',
            'Access-Control-Allow-Credentials':'true'
        });
        let options = { headers: headers };
        return this.http.post<any>(this.baseUrl + "/user/login", { email, password })
        //return this.http.post<any>(`${environment.apiUrl}+/user/login`, { email, password })
            .pipe(map(user => {
                console.log(user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user.user);
                return user;
            }));
    }

    register(user: User) {
        return this.http.post<any>(this.baseUrl+'/user/register', user)
        .pipe(map( res => {
            console.log(res);
            return res;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}