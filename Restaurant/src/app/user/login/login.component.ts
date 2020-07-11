import { Component, OnInit } from '@angular/core';

import { User } from "../../shared/user.model";
import { UserService } from "../../shared/user.service";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor( private userService: UserService,
    private router: Router ) { }

  ngOnInit(): void {
    this.resetForm()
  }

  login(form:NgForm){
    this.userService.loginUser(form.value).subscribe((suc:string)=>{
  
      localStorage.setItem('usertoken', suc["token"]);
      this.router.navigate(['orders'])
    },
    (err)=>{
      console.log(err)
    })
  }

  resetForm(form?: NgForm){
    if(form != null){
      form.reset();
    }
    this.user = {
      username: '',
      password: ''
    }
  }
}
