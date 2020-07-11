import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';

import { NgForm } from "@angular/forms";
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;


  constructor( private userService: UserService,
              private router: Router ) { }

  ngOnInit(): void {
    this.resetForm()
  }


  resetForm(form?:NgForm){
    if(form != null){ 
      form.reset() 
    }
    this.user = {
      username: '',
      password: ''
    }
  }

  onSubmit(form:NgForm){
    this.userService.registerUser(form.value).subscribe(res=>{
      this.resetForm(),
    this.router.navigate(['login'])});
    
  }
}
