import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/models/empresa.model';
import { EmpresasService } from 'src/servicios/empresas.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {

  checkoutForm: any;
  editMode: boolean = false;
  empresa: Empresa = new Empresa();
  empresaId!: number;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresasService,
    public activatedRoute: ActivatedRoute
  ) { this.checkoutForm = this.fb.group({
        id: 0,
        nombre:"",
        ciudad:"",
        codigoPostal:""
  })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] === undefined){
        return;
      }
      this.editMode = true;
      this.empresaId = Number(params['id']);
      this.getDataById(this.empresaId.toString())
    });
  }

  public async getDataById(id: string) {
    //console.log(id);
    (await this.empresaService.getEmpresaById(id)).subscribe(
      (resp: any)=> {
      this.getDataForm(resp), 
        (error: any) => console.error(error)
    })
  }
  getDataForm(data: any) {
    this.checkoutForm.patchValue({
      id: data.id,
      nombre: data.nombre,
      ciudad: data.ciudad,
      codigoPostal: data.codigoPostal,
      
    });
  }
    async onSubmit(){
      
      this.empresa.Nombre = this.checkoutForm.value.nombre;
      this.empresa.Ciudad = this.checkoutForm.value.ciudad;
      this.empresa.CodigoPostal = this.checkoutForm.value.codigoPostal;

      const data = this.checkoutForm.value;

       //Add and Update post
    if(this.editMode === true)
    {   
      try {
        await this.empresaService.putEmpresaId(this.empresaId.toString(), data);
        alert("Actualización Satisfactoria!");
        this.checkoutForm.reset();

      } catch (error) {
        console.log(error);
        alert("La actualización ha fallado");
      }

    } else {
      try {
        await this.empresaService.empresasPost(data);

        alert("Registro satisfactorio!");

      } catch (error) {
        console.log(error);
        alert("El registro ha fallado");
      }
      this.checkoutForm.reset();
    }
  }
}

