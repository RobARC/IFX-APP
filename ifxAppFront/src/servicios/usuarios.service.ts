import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleados } from '../models/empleados.model';
import { IUsuarios } from '../componentes/crear-usuario/usuarios.class';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url_api: string = 'https://localhost:7223'

  constructor(private http: HttpClient) { }

  //async getUsuarios(): Promise<Observable<Empleados[]>> {
  //  return this.http.get<Empleados[]>(`${this.url_api}/api/Empleados`)
  //}

  async putUsuarioId(id: string,  data: IUsuarios) {
    return await this.http.put(`${this.url_api}/api/Account/Create/${id}`, data).subscribe();
  }

  async UsuarioPost(data: IUsuarios){
    console.log(data);
    
    return await this.http.post(`${this.url_api}/api/Account/Create`, data,).subscribe();
  } 

  //async getUsuaurioById(id: string) {
  //  return await this.http.get<IUsuarios[]>(`${this.url_api}/Account/Create/${id}`)
  //}

  //async DeleteUsuaurio(id: string){
  //  return await this.http.delete(`${this.url_api}/api/Empleados/${id}`).subscribe();
  //}

}
