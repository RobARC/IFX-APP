import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearUsuarioComponent } from '../componentes/crear-usuario/crear-usuario.component';
import { HeaderComponent } from '../componentes/header/header.component';
import { FooterComponent } from '../componentes/footer/footer.component';
import { HomeComponent } from '../componentes/home/home.component';
import { EmpleadosService } from '../servicios/empleados.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../servicios/login.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptorService } from 'src/servicios/auth-interceptor.service';
import { AuthGuardService } from 'src/servicios/auth-guard.service';
import { CrearEmpleadoComponent } from '../componentes/crear-empleado/crear-empleado.component';
import { LoginComponent } from 'src/componentes/login/login.component';
import { CrearEmpresaComponent } from 'src/componentes/crear-empresa/crear-empresa.component';
import { EmpresasService } from 'src/servicios/empresas.service';

@NgModule({
  declarations: [
    AppComponent,
    CrearUsuarioComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CrearEmpleadoComponent,
    LoginComponent,
    CrearEmpresaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    CommonModule,
  ],
  providers: [EmpleadosService, LoginService, CookieService,
              AuthInterceptorService, AuthGuardService, EmpleadosService,
              EmpresasService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
