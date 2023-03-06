import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { CrearEmpleadoComponent } from 'src/componentes/crear-empleado/crear-empleado.component';
import { CrearEmpresaComponent } from 'src/componentes/crear-empresa/crear-empresa.component';
import { CrearUsuarioComponent } from 'src/componentes/crear-usuario/crear-usuario.component';
import { HomeComponent } from 'src/componentes/home/home.component';
import { PageNotFoundComponent } from 'src/componentes/page-not-found/page-not-found.component';
import { AuthGuardService } from 'src/servicios/auth-guard.service';
import { LoginComponent } from '../componentes/login/login.component';

const routes: Routes = [
      {path: 'inicio', component: HomeComponent},
      {path: 'empresas', component: CrearEmpresaComponent, canActivate: [AuthGuardService]},
      {path: 'empresas-edit/:id', component: CrearEmpresaComponent},
      {path: 'empleados', component: CrearEmpleadoComponent, canActivate: [AuthGuardService]},
      {path: '',   redirectTo: 'login', pathMatch: 'full'},
      {path: 'registro', component: CrearUsuarioComponent, canActivate: [AuthGuardService]}, 
      {path: 'login', component: LoginComponent}, 
      {path: 'empleados-edit/:id', component: CrearEmpleadoComponent},
      {path: '**', component: PageNotFoundComponent},
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
