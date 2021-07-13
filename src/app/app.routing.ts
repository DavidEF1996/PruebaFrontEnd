//Importar los modulos del router
import { ModuleWithProviders } from '@angular/core'; //primer modulo importado
import { Routes, RouterModule, Router } from '@angular/router'; // establecer rutas


//Importar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';


//Crear un array de rutas
    //(rutas para la aplicacion)
const appRoutes: Routes = [
    //esta varialbe appRoutes es igual a un objeto que contiene un arreglo de rutas

    {path:'', component:HomeComponent}, //si la ruta es vacia carga el login
    {path: 'inicio', component:HomeComponent},
    {path: 'login', component:LoginComponent}, //ruta hacia login
    {path: 'registro', component:RegisterComponent}, //ruta a registro
    {path: '**',component:LoginComponent},// esta ruta es por si se manda una ruta mala
   
];


//Exportar la configuracion
export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);