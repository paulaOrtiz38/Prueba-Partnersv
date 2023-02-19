import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Control-Usuarios';
  faSignOutAlt = faSignOutAlt;
 
  
  constructor(){
   
  }
  ngOnInit(): void {
  }
  isAutenticado(){
   
  }

}
