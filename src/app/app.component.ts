import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'foro-angu';
  public identity;
  public token;
  constructor(
      private _userService:UserService,
      private _router:Router,
      private _route:ActivatedRoute

  ){
      this.identity = this._userService.getIdentity(); //saco el objeto y lo guardo
      this.token = this._userService.getToken(); 
  }
  
  ngOnInit(){
    //es un evento que detecta cuando un compoente esta cargado
    console.log("Este es:   ",this.identity);
    console.log(this.token);
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
