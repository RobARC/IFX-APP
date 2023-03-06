import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  rol: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.rol = this.GetRole();
    console.log(this.rol);
  }

  GetRole() {
    const item = window.localStorage.getItem('role');
    return item;
  }


  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }
}
