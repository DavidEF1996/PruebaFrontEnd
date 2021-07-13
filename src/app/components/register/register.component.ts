import { Component, OnInit } from '@angular/core';
//Paso1: Importar el modelo de usuario
import {User} from '../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  //Paso 2:  Definir propiedades publicas
    public page_title: String; // titulo de la pagina
    public user: User; //  Objeto de tipo usuario que va a interactuar con el formulario y enviar al backend
    public status: string;
    
  constructor(
    private _userService:UserService
  ) {
    this.page_title = 'Registrate';
    this.user = new User('','','','','','','ROLE_USER');

   }

  ngOnInit() {
    //llamar al servicio
    console.log(this._userService.prueba());
  }

  onSubmit(form){
     this._userService.registrar(this.user).subscribe(
       response=>{
         if(response.user && response.user._id){
            this.status ='success';
            form.reset();
         }else{
           this.status = 'error';
         }
       },
       error =>{

        console.log(error);
       }
     );
  }

}
