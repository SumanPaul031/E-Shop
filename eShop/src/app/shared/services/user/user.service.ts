import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { Credentials } from 'src/app/shared/models/credentials';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `/api/users`;
  private loginObservable$: BehaviorSubject<Object>;

  constructor(private http: HttpClient) { 
    this.loginObservable$ = new BehaviorSubject({});
  }

  get loginObservable(){
    return this.loginObservable$;
  }

  signup(user: User){
    return this.http.post(`${this.userUrl}/signup`, user).pipe(
      map(result => {
        return <{message: string}>result;
      })
    );
  }

  login(credentials: Credentials){
    return this.http.post(`${this.userUrl}/login`, credentials).pipe(
      map((result: LoginResponse) => {
        this.saveTokenToLocalStorage(result.token);
        this.loginObservable$.next({});
        return result;
      })
    );
  }

  private saveTokenToLocalStorage(token: string){
    localStorage.setItem('token', `Bearer ${token}`);
  }

  getToken(){
    return localStorage.getItem('token') ? localStorage.getItem('token') : "";
  }

  isAdmin(){
    return this.http.get(`${this.userUrl}/is-admin`).pipe(
      map(result => {
        return <boolean>result;
      }) 
    );
  }

  isLoggedIn(){
    if(this.getToken() != ''){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
    this.loginObservable$.next({});
  }

  getAllUsers(){
    return this.http.get(this.userUrl).pipe(
      map((result: { users: User[] }) => {
        return result.users;
      })
    );
  }
}

interface LoginResponse{
  message: string;
  token: string;
}