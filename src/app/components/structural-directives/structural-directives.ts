import { Component } from '@angular/core';

@Component({
  selector: 'app-structural-directives',
  standalone: false,
  templateUrl: './structural-directives.html',
  styleUrl: './structural-directives.css',
})
export class StructuralDirectives {
  indexCode = `<div *ngFor="let skill of skills;
  let i = index;
  let first = first;
  let last = last">
{{ i }} -{{ skill }} | First: {{ first }}| Last: {{ last }}
</div>`;

ngifelseTemplate = `<div *ngIf="showCourses; else noCourses">
  <p *ngFor="let skill of skills">{{skill}}</p>
</div>

<ng-template #noCourses>
  <p>No Courses Available</p>
</ng-template>`

trackbyUsage =`State 1 (Current UI)
══════════════════════════════════════
User A: {id: 'u101',name: 'Alice'} //Rendered in DOM Node #1

User B: {id: 'u102', name: 'Bob'}  //Rendered in DOM Node #2

State 2 (Fresh API Response) -> new data
══════════════════════════════════════
User A: {id: 'u101',name: 'Alicia'}
User B: {id: 'u102',name: 'Bob'}
User C: {id: 'u103', name: 'Charlie'}

When fresh data is occured don't destroy the DOM instead trackBy the id and stores the node and adds new one`
trackby = `<div *ngFor="let user of users;
    trackBy: trackByUserId">
  {{ user.id }} - {{ user.name }}
</div>`

oddEvenCode = `<div *ngFor="
    let skill of skills;
    let even = even;
    let odd = odd">
  {{ skill }}| Even : {{ even }}| Odd : {{ odd }}
</div>`

  ngIfElseCode = `
<div *ngIf="condition; else block">
  ----------True condition code -----------------
</div>
<ng-template #block>
  ----else condition code ------------------
</ng-template>`

  ngifcode = `<div *ngIf="!loggedIn" class="danger-box">
  User Logged Out
</div>`

ngswitchcode =`TS: selectedRole='Admin'

<div [ngSwitch]="selectedRole">
  <div *ngSwitchCase="'Admin'">
    Admin Dashboard
  </div>
  <div *ngSwitchCase="'Manager'">
    Manager Dashboard
  </div>
  <div *ngSwitchDefault>
    User Dashboard
  </div>
</div>`
  tableCode = `<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let emp of employees;
        let even = even;
        let odd = odd"
      [class.even-row]="even"
      [class.odd-row]="odd">
    
      <td>{{ emp.id }}</td>
      <td>{{ emp.name }}</td>
      <td>{{ emp.salary }}</td>
    </tr>
  </tbody>
</table>`;
   loggedIn = false;
   employees = [
  { id:1, name:'Praveen', salary:50000 },
  { id:2, name:'Sai', salary:60000 },
  { id:3, name:'Rahul', salary:70000 },
  { id:4, name:'Kiran', salary:80000 }
];

  showCourses = false;

  selectedRole = 'Admin';

  skills = [
    'Angular',
    'React',
    'Node',
    'PostgreSQL',
    'Redis'
  ];

  users = [
    { id: 1, name: 'Praveen' },
    { id: 2, name: 'Sai' },
    { id: 3, name: 'Rahul' }
  ];

  toggleLogin(): void {
    this.loggedIn = !this.loggedIn;
  }

  toggleCourses(): void {
    this.showCourses = !this.showCourses;
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
