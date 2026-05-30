import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-angular-concepts',
  standalone: false,
  templateUrl: './basic-angular-concepts.html',
  styleUrl: './basic-angular-concepts.css',
})
export class BasicAngularConcepts {

  stylebindingcode = `<button (click)="toggleTheme()">Toggle Color</button>
  <h3 [style.color]="isRed ? 'red' : 'green'"> Angular Style Binding </h3>
_______________________________________________________________________________________________
<div [style.background]="salary > 50000 ? 'lightgreen' : 'lightcoral'">
  Employee Salary : {{ salary }}
</div>`

classbindingcode = `<button (click)="toggleLogin()">Toggle Login</button>
<h3 [class.success]="loggedIn" [class.danger]="!loggedIn">
  User Status
</h3>

.success {
  background: #22c55e;
  color: white;
  padding: 10px;
}

.danger {
  background: #ef4444;
  color: white;
  padding: 10px;
}
_____________________________________________________________________________________
<table>
  <tr
    *ngFor="
      let emp of employees;
      let isEven = even;
      let isOdd = odd
    "
    [class.even-row]="isEven"
    [class.odd-row]="isOdd"
  >

    <td>{{ emp.id }}</td>
    <td>{{ emp.name }}</td>
    <td>{{ emp.salary }}</td>

  </tr>

</table>


.even-row {
  background: #d1fae5;
}

.odd-row {
  background: #fee2e2;
}`
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
  isRed = true;

toggleTheme() {
  this.isRed = !this.isRed;
}
toggleLogin() {
  this.loggedIn = !this.loggedIn
}
}
