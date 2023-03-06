import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/models/usuario.model';
import { UsuariosService } from '../../servicios/usuarios.service';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit  {

  checkoutForm: any;
  today = Date.now()
  date: Date = new Date(this.today);
  editMode: boolean = false;
  usuario: Usuario = new Usuario();
  usuarioId!: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    public activatedRoute: ActivatedRoute
    ) { this.checkoutForm = this.fb.group({
          id:0,
          userName: "",
          email: "",
          password: "",
          RoleId:""
     });
    }
  ngOnInit(): void {
 
}

  getDataForm(data: any) {
    this.checkoutForm.patchValue({
      id: data.id,
      userName: data.userName,
      email: data.email,
      password: data.password,
      roleId: data.roleId
      
    });
  }

  async onSubmit(){
  this.usuario.Id= this.checkoutForm.value.id;
  this.usuario.UserName = this.checkoutForm.value.userName;
  this.usuario.Email = this.checkoutForm.value.email;
  this.usuario.Password = this.checkoutForm.value.password
  this.usuario.RoleId = this.checkoutForm.value.roleId

  const data = this.checkoutForm.value;

    //Add and Update post
    if(this.editMode === true)
    {   
      try {
        await this.usuarioService.putUsuarioId(this.usuarioId.toString(), data);
        alert("Update Successful");
        this.checkoutForm.reset();

      } catch (error) {
        console.log(error);
        alert("Update Failed");
      }

    } else {
      try {
        await this.usuarioService.UsuarioPost(data);

        alert("Registro Exitoso");

      } catch (error) {
        console.log(error);
        alert("El Registrato  ha Fallado");
      }
      this.checkoutForm.reset();
    }
  }
}
