import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/servicios/empresas.service';
import { EmpleadosService } from '../../servicios/empleados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  usuarios: any;
  empresas: any;
  usuarioId: string = "";
  rol: any;

  constructor(
    private empleadosService: EmpleadosService,
    private empresasService: EmpresasService) { }
  
  ngOnInit(): void { 

    this.getData();
    this.getEmpresas();
    this.rol = this.GetRole();

   }

   GetRole() {
    const item = window.localStorage.getItem('role');
    
    return item;
  }

  public async getData(){
    (await this.empleadosService.getEmpleados()).subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp;
     });
    }
    public async getEmpresas(){
      (await this.empresasService.getEmpresas()).subscribe((resp: any) => {
        console.log(resp);
        this.empresas = resp;
       });
      }

    public async deleteData(usuarioId: string) {
      try {
        (await this.empleadosService.DeleteEmpleado(usuarioId));
        alert("Registro borrado con éxito")
      } catch (error) {
        console.error(error);
      }
      this.getData();
    }

    public async deleteEmpresa(empresaId: string){
      try {
      (await this.empresasService.DeleteEmpresa(empresaId))
        alert("Empresa borrada con exito")	
      } catch (error) {
        console.error(error);
      }
      this.getEmpresas();
      }
}
