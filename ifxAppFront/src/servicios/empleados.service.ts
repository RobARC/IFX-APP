import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleados } from '../models/empleados.model';
import { IUsuarios } from '../componentes/crear-usuario/usuarios.class';
import { IEmpleados } from 'src/models/empleados.class ';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url_api: string = 'https://localhost:7223'

  constructor(private http: HttpClient) { }

  async getEmpleados(): Promise<Observable<Empleados[]>> {
    return this.http.get<Empleados[]>(`${this.url_api}/api/Empleados`)
  }

  async putEmpleadosId(id: string,  data: IEmpleados) {
    return await this.http.put(`${this.url_api}/api/Empleados/${id}`, data).subscribe();
  }

  async EmpleadosPost(data: IUsuarios){
    return await this.http.post(`${this.url_api}/api/Empleados`, data,).subscribe();
  } 

  async getEmpleadoById(id: string) {
    return await this.http.get<IEmpleados[]>(`${this.url_api}/api/Empleados/${id}`)
  }

  async DeleteEmpleado(id: string){
    return await this.http.delete(`${this.url_api}/api/Empleados/${id}`).subscribe();
  }

}
