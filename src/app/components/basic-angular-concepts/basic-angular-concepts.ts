import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-angular-concepts',
  standalone: false,
  templateUrl: './basic-angular-concepts.html',
  styleUrl: './basic-angular-concepts.css',
})
export class BasicAngularConcepts {

  name:string= 'praveen';
  age: number = 23;

  count: number= 0;
  loggedIn: boolean = false;

  increment():number{
    return this.count++;
  }
  decrement():number{
    return this.count--;
  }

  authLog():void{
    this.loggedIn = !this.loggedIn;
  }
}
