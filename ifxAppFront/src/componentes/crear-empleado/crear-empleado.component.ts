import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empleados } from 'src/models/empleados.model';
import { EmpleadosService } from 'src/servicios/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  checkoutForm: any;
  editMode: boolean = false;
  empleado: Empleados = new Empleados();
  empleadoId!: number;

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadosService,
    public activatedRoute: ActivatedRoute
  ) { this,this.checkoutForm = this.fb.group({
    id: 0,
    nombre: "",
    apellido: "",
    fechaIngreso:"",
    cargo:"",
    empresa: "",

  });
}

    ngOnInit(): void {
     this.activatedRoute.params.subscribe(params => {
      if(params['id'] === undefined){
        return;
      }
      this.editMode = true;
      this.empleadoId = Number(params['id']);
      this.getDataById(this.empleadoId.toString())
      console.log(this.editMode);
      
    });
  }

  public async getDataById(id: string) {
    //console.log(id);
    (await this.empleadosService.getEmpleadoById(id)).subscribe(
      (resp: any)=> {
      this.getDataForm(resp), 
      console.log(resp);
        (error: any) => console.error(error)
    })
  }
  getDataForm(data: any) {
    this.checkoutForm.patchValue({
      id: data.id,
      nombre: data.nombre,
      apellido: data.apellido,
      fechaIngreso: data.fechaIngreso,
      cargo: data.cargo,
      empresa: data.empresa,
      
    });
  }
    async onSubmit(){
      
      this.empleado.Nombre = this.checkoutForm.value.nombre;
      this.empleado.Apellido = this.checkoutForm.value.apellido;
      this.empleado.FechaIngreso = this.checkoutForm.value.fechaIngreso;
      this.empleado.Cargo = this.checkoutForm.value.cargo;
      this.empleado.Empresa = this.checkoutForm.value.empresa;

      const data = this.checkoutForm.value;

        //Add and Update post
    if(this.editMode === true)
    {   
      try {
        await this.empleadosService.putEmpleadosId(this.empleadoId.toString(), data);
        alert("Actualización Satisfactoria!");
        this.checkoutForm.reset();

      } catch (error) {
        console.log(error);
        alert("La actualización ha fallado");
      }

    } else {
      try {
        await this.empleadosService.EmpleadosPost(data);

        alert("Registro satisfactorio!");

      } catch (error) {
        console.log(error);
        alert("El registro ha fallado");
      }
        this.checkoutForm.reset();
      }
    }
  }
