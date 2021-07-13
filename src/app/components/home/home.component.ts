import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService]
})
export class HomeComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public user:Array<User>;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.page_title = 'Usuarios de la prueba Técnica'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this._userService.getAllUsers().subscribe(
        response =>{
              if(response.users){
                console.log(response)
                this.user = response.users;
              }else{
                console.log("no llego");
              }
        },
        error=>{

        }
    );
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity(); //saco el objeto y lo guardo
    
  }
  logout(){
    localStorage.clear();
    this.identity = null;
    this.token =null;
    this._router.navigate(['/inicio']);
  }
}
