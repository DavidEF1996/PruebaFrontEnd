import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//Importar modelo de usuario
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { from } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  //cargar los servicios en los providers
  providers:[UserService]
})
export class LoginComponent implements OnInit {

    //propiedad pubica de titulo
    public page_title:string;
    public user:User;
    public status: string;
    public identity; // aqui vamos a guardar los datos que me devuelva el login
    public token;



  constructor(
     //declarar en el constructor
     private _userService:UserService,
     private _router:Router,
     private _route: ActivatedRoute
     ) { 
   
        this.page_title ="Identificate";
        this.user = new User('','','','','','','ROLE_USER');

  }

  ngOnInit() {
  }

  onSubmit(form){

    //CONSEGUIR EL OBJETO COMPLETO DEL USUARIO LOGUEADO
    this._userService.singup(this.user).subscribe(
        response =>{
            if(response.user && response.user._id){
                this.identity = response.user; // le damos el valor a identity  para usarla
              

                /**
                 * PERSISTIR LOS DATOS DEL USUARIO IDENTIFICADO EN EL LOCALSTORAGE
                 * 
                 */
                localStorage.setItem('identity',JSON.stringify(this.identity)); 


                //CONSEGUIR EL TOKEN DEL USUARIO IDENTIFICADO
                this._userService.singup(this.user, true ).subscribe(
                  response =>{
                      if(response.token){
                       
                          //console.log(response);
                          //Guardar en una propiedad el token del usuario
                          this.token = response.token;

                          /**
                           * Guardar en el localstorage el token
                           */
                          localStorage.setItem('token', this.token);
                          this.status='success';

                          this._router.navigate(['/inicio']); // si me logueo me lleva a inicio
                        }else{
                          this.status = 'error';
                      }
                      },
                  error=>{
                      this.status = 'error';
                      console.log(error);
                  }
              );

              }else{
                this.status = 'error';
            }
          
            },
        error=>{
            this.status = 'error';
            console.log(error);
        }
    );
  }
}
