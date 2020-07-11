import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../shared/user.model";
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token : string;

  constructor( private http:HttpClient ) { }

  registerUser(user: User){
    const body = {
      username: user.username,
      password: user.password
    }

    return this.http.post(environment.apiURL + 'signup', body);
  }

  loginUser(user: User){
    const body = {
      username: user.username,
      password: user.password
    }

    return this.http.post(environment.apiURL + 'login', body)
  }

  saveToken(token:string){
    this.token = token;
    localStorage.setItem('usertoken', token);
  }

  getToken(): string{
    if (!this.token){
      return localStorage.getItem('usertoken');
      
    }
    
    return this.token
  }

  getUserData(){
    const token = this.getToken()
    if (token){
      let res = token.split('.')[1]
      res = window.atob(res)
      return JSON.parse(res)
      
    }else{
      return null;
    }
  }

  public isLogged(){
    if(this.getUserData() != null){
      return true
    }
    return false
  }

  public logout(){
    this.token = '';
    localStorage.removeItem('usertoken')
  }
}
