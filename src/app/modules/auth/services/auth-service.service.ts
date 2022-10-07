import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/auth.interface';
 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}
  jwtService: JwtHelperService = new JwtHelperService();

  get isLoggedIn(){
    // this is not right but for tesing only
    var token  = localStorage.getItem('token');
    console.log(token);
    
    return token ? true : false;
  }
 
  userLogin(payload: LoginModel) {
    return this.httpClient
      .post(this.baseURL + 'login', payload)
      .pipe(
        map((data) => {
          console.log(data);
          
          localStorage.setItem("token" , "VYLTnsjHezoaREiJ9LGJ8rT62meCtctUuMnu42fIiWMPPI5DPkbdCZXHMfYd");
          console.log("test");
          
          return true;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
    );
  }

  getToken(){
    return localStorage.getItem('token');
  }


  logout(){
    localStorage.removeItem('token');
  }
}