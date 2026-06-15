import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-angular-concepts',
  standalone: false,
  templateUrl: './basic-angular-concepts.html',
  styleUrl: './basic-angular-concepts.css',
})
export class BasicAngularConcepts {
ngStyleCodes = `<div
  [ngStyle]="{
    color: isRed ? 'red' : 'green',
    fontSize: '20px',
    fontWeight: 'bold'
  }"
>
  Employee
</div>
`;

ngModelDemo =`<input type="text" [(ngModel)]="searchText" placeholder="Search..."  (keyup.enter)="search()" />
  <button (click)="search()">Search</button>
--------------------------------------------------- or call method on entering input like (input) --eventbinding
  <input type="text" [(ngModel)]="searchText" (input)="search()" placeholder="search...">`

  stylebindingcode = `<div [style.color]="isRed ? 'red':'green'" [style.font-size.px]="20" [style.font-weight]="bold">
  ___________________________________________________________________________________
  <button (click)="toggleTheme()">Toggle Color</button>
  <h3 [style.color]="isRed ? 'red' : 'green'"> Angular Style Binding </h3>
_______________________________________________________________________________________________
<div [style.background]="salary > 50000 ? 'lightgreen' : 'lightcoral'">
  Employee Salary : {{ salary }}
</div>`

ngClass = `<div [class.active]="active" [class.disabled]="disabled" [class.highlight]="highlight">
active = true;
disabled = false;
highlight = true;

Generates: 
<div class="active highlight">
_____________________________________________________________
<span [ngClass]="{online: user.status==='ONLINE', offline: user.status==='OFFLINE', busy: user.status==='BUSY'}">
  {{user.status}}
</span>

.online{
  color:green;
}
.offline{
  color:red;
}
.busy{
  color:orange;
}`
classbindingcode = `[class.className] -- the .className will be written in the css file

<button (click)="toggleLogin()">Toggle Login</button>
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
    *ngFor="let emp of employees;
      let isEven = even;
      let isOdd = odd"

    [class.even-row]="isEven"
    [class.odd-row]="isOdd">    
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
}
  -------------------------------------------------------
  <div
  [class.high-salary]="salary > 100000"
  [class.medium-salary]="salary >= 50000 && salary <=100000"
  [class.low-salary]="salary < 50000"
>
  Salary : {{salary}}
</div>
.high-salary{
  color:green;
}

.medium-salary{
  color:orange;
}

.low-salary{
  color:red;
}
------------------------------------------------------
<tr
  *ngFor="let emp of employees"
  [class.selected-row]="selectedId===emp.id"
  [class.high-earner]="emp.salary > 80000"
  (click)="selectedId = emp.id"
>
  
.selected-row{
  border:2px solid blue;
}

.high-earner{
  background:#dcfce7;
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
