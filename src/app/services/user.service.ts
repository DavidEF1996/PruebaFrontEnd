import { Injectable } from "@angular/core"; //insertar el servicio en cualquier parte 
import { HttpClient, HttpHeaders } from '@angular/common/http';
//este ultimo primoero lo cargamos en el appmodule
import { Observable } from "rxjs"; //muestra lo que hace el api
import { User } from "../models/user"; //modelo de usuario
import { global } from "./global";

@Injectable()
export class UserService{
    public url:string; //esta contendra la url
    public identity;
    public token;

    constructor(private _http:HttpClient){
            this.url = global.url;
    }  

    prueba(){
        return "Hola mundo";
        //cargamos al registe component ts
    }

    registrar(user):Observable<any>{
        //Convertir el bojeto del usuario a un json string
        let params = JSON.stringify(user);
        console.log(params);


        //Definir las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Hacer la peticion ajax
        return this._http.post(this.url+'registrar',params,{headers:headers});
    }


    singup(user, gettoken = null):Observable<any>{

        //Comprobar si llega el getToken
            if(gettoken!=null){
                user.gettoken=gettoken;
                //adjunto el gettoken al user

            }

            let params = JSON.stringify(user);
            let headers= new HttpHeaders().set('Content-Type','application/json');

            return this._http.post(this.url+'login', params,{headers:headers});
    }


    //METODOS PARA OBTENER LOS DATOS DEL LOCALSTORAGE

    getIdentity(){
            let identity = JSON.parse(localStorage.getItem('identity')); //CONVERtir lo que esta en localstorage a un objeto de java script
            if(identity&& identity!=null && identity!=undefined && identity!= "undefined"){
                    this.identity = identity; // si se cumplen todas las validaciones se guarda el objeto del usuario en identity
            }else{
                    this.identity = null; // se deja identity como null
            }
            return this.identity;
        }

    getToken(){

        let token = localStorage.getItem('token'); //CONVERtir lo que esta en localstorage a un objeto de java script
        if(token&& token!=null && token!=undefined && token!= "undefined"){
                this.token = token; // si se cumplen todas las validaciones se guarda el objeto del usuario en identity
        }else{
                this.token = null; // se deja identity como null
        }
        return this.token;
        //cargar los metoods al app 
    }

    //MOSTRAR TODOS LOS USUARIOS

    getAllUsers():Observable<any>{
        let headers  = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'allUsers',{headers:headers});

    }
    
}