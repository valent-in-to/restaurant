import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor( private auth: UserService,
    private router: Router ) { }

  canActivate(){
    if(this.auth.isLogged() == false){
      this.router.navigate(['login'])
      return false
    }else{
      return true
    }
  }
}

