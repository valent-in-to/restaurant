import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor( private auth: UserService,
    private router: Router ) { }

  canActivate(){
    if(this.auth.getUserData().identity.name == 'admin'){
      
      return true
    }else{
      this.router.navigate(['orders'])
      return false
    }
  }
}
