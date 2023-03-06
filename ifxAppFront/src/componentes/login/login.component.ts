import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service'
import { UserInfo } from '../../models/userinfo.model';
import { UserInfoInterface } from '../../models/userinfo.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit  {
  checkLoginForm: any;
  userInfo: UserInfo= new UserInfo;
  //tokenExpiration: string = '';
  //role: any;

  constructor (
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
    
  ) {
    this.checkLoginForm = this.fb.group({
      email: "",
      password: "",

   });
  }
  ngOnInit(): void {
   
  }

  async onSubmit(){
    this.userInfo.Email = this.checkLoginForm.value.usuario;
    this.userInfo.Password = this.checkLoginForm.value.password;

    const data = this.checkLoginForm.value;

    let userInfoInterface: UserInfoInterface = Object.assign({}, this.checkLoginForm.value);

    (await this.loginService.LoginUsers(userInfoInterface)).subscribe(
      token => this.getToken(token)),
    (error: any) => this.errorMessage(error)
    alert("Login Successful");
    this.checkLoginForm.reset()
    this.router.navigate(['inicio']);
    //window.location.reload();
  
  }

  getToken(token: { token: string, tokenExpiration: string, role: string }) { 
    console.log(token);
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.tokenExpiration);
    localStorage.setItem('role', token.role);
    //this.router.navigate(['home']);
  }

  errorMessage(error: any) {
      if (error && error.error) {
      alert(error.error[""]);
    }
  }
 } 



