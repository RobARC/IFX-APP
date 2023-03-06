import { Injectable } from '@angular/core';
import {  CanActivate, Router,  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  rol: any;

  constructor( 
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.rol = this.GetRole();
    
    if( this.rol !== 'Administrador' ) {
      alert("Acceso de negado comuniquese con el Administrdor del sistema")
      this.router.navigate(['inicio']);
      return false;
    } else {
      return true;
    }
  }
  
  GetRole() {
    const item = window.localStorage.getItem('role');
    return item;
  }

}
