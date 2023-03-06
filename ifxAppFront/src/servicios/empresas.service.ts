import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpresa } from 'src/models/empresa.class';
import { Empresa } from 'src/models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  
  url_api: string = 'https://localhost:7223'

  constructor(private http: HttpClient) { }

  async getEmpresas(): Promise<Observable<Empresa[]>> {
    return this.http.get<Empresa[]>(`${this.url_api}/api/Empresas`)
  }

  async putEmpresaId(id: string, data: IEmpresa) {
    return this.http.put(`${this.url_api}/api/Empresas/${id}`, data).subscribe();
  }

  async empresasPost(data: IEmpresa){
    return await this.http.post(`${this.url_api}/api/Empresas`, data,).subscribe();
  } 

  async getEmpresaById(id: string) {
    return await this.http.get<IEmpresa[]>(`${this.url_api}/api/Empresas/${id}`)
  }

  async DeleteEmpresa(id: string){
    return await this.http.delete(`${this.url_api}/api/Empresas/${id}`).subscribe();
  }



}
