import { SearchFilterPipe } from './../../pipes/search-filter-pipe';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-routing',
  standalone: false,
  templateUrl: './pipes-routing.html',
  styleUrl: './pipes-routing.css',
})
export class PipesRouting {
  searchText = '';

employees = [
  {
    id: 1,
    name: 'Praveen',
    department: 'Engineering',
    salary: 80000
  },
  {
    id: 2,
    name: 'Sai',
    department: 'HR',
    salary: 50000
  },
  {
    id: 3,
    name: 'Rahul',
    department: 'Finance',
    salary: 70000
  },
  {
    id: 4,
    name: 'Kiran',
    department: 'Engineering',
    salary: 90000
  }
];

searchfilterpipecode = `import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'searchFilter', standalone: false,})
export class SearchFilterPipe implements PipeTransform {
   transform(employees: any[], searchText: string): any[] {
    if (!employees || !searchText) {
      return employees;
    }
    searchText = searchText.toLowerCase();
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText)
    );

  }
}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'highlightSearch',})
export class HighlightSearchPipe implements PipeTransform {
  transform(text: string, search: string): string {

    if (!search) return text;
    const regex = new RegExp(search, 'gi');
    return text.replace(regex, match => \`<mark>\${match}</mark>\`);
  }
}

_________________________________________________________
data:  may be from api too, currently double pipes neatly displayed one to filter and other to highlight the search ones.
searchText = '';
employees = [
  {
    id: 1,
    name: 'Praveen',
    department: 'Engineering',
    salary: 80000
  },
  {
    id: 2,
    name: 'Sai',
    department: 'HR',
    salary: 50000
  },
  {
    id: 3,
    name: 'Rahul',
    department: 'Finance',
    salary: 70000
  },
  {
    id: 4,
    name: 'Kiran',
    department: 'Engineering',
    salary: 90000
  }
];
____________________________________________________________________________
<input type="text" [(ngModel)]="searchText" placeholder="Search Employee"/>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
(|pipename: argument1, argument2............)
    <tr *ngFor="let employee of employees | searchFilter:searchText">
      <td>{{ employee.id }}</td>
      <td  [innerHTML]="employee.name | highlightSearch:searchText">{{ employee.name }}</td>
      <td [innerHTML]="employee.department | highlightSearch:searchText">{{ employee.department }}</td>
      <td>{{ employee.salary }}</td>
    </tr>

  </tbody>
</table>`
  name = 'praveen kumar';

  salary = 125000;

  percentage = 0.85;

  today = new Date();

  user = {
    id: 1,
    name: 'Praveen',
    role: 'Developer',
    skills: ['Angular', 'React', 'Node']
  };

  uppercaseCode = `{{ name | uppercase }}`;

  lowercaseCode = `{{ name | lowercase }}`;

  titlecaseCode = `{{ name | titlecase }}`;

  currencyCode = `{{ salary | currency:'INR' }}`;

  percentCode = `{{ percentage | percent }}`;

  dateCode = `{{ today | date:'dd/MM/yyyy' }}`;

  jsonCode = `{{ user | json }}`;

  routeConfigCode = `const routes: Routes = [

{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},

{
  path:'home',
  component:HomeComponent
},

{
  path:'users',
  component:UsersComponent
},

{
  path:'users/:id',
  component:UserDetailsComponent
}

];`;

  routerLinkCode = `<a routerLink="/home">
  Home
</a>

<a routerLink="/users">
  Users
</a>`;

  routerOutletCode = `<router-outlet></router-outlet>`;

  routeParamCode = `{
  path:'users/:id', 
  component:UserDetailsComponent
}`;

  navigateCode = `constructor(
  private router: Router
){}

goUsers(){
  this.router.navigate(['/users']);
}`;

  activatedRouteCode = `constructor(
 private route: ActivatedRoute
){}

ngOnInit(){
 const id = this.route.snapshot.paramMap.get('id');
}`;

customPipes =`import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'salary'})
export class SalaryPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 80000) {
      return 'High Salary';
    }
    if (value >= 50000) {
      return 'Medium Salary';
    }
    return 'Low Salary';
  }
}
  
____________________________________________________________
ts: salary = 125000
html:{{salary|salary}} //pipename also salary right`


routingCompleteCode = `/* ============================
   ROUTE CONFIGURATION
============================ */

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent
  }
];


/* ============================
   ROUTER LINK
============================ */

<a [routerLink]="['/users',user.id]">View User</a>

/* ============================
   PROGRAMMATIC NAVIGATION
============================ */

import { Router } from '@angular/router';
constructor(private router: Router) {}
viewUser(id: number) {
  this.router.navigate(['/users', id);
}

/* ============================
   READ PARAM (SNAPSHOT)
============================ */

import {ActivatedRoute} from '@angular/router';

constructor(private route: ActivatedRoute) {}
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}

/* ============================
   READ PARAM (SUBSCRIBE)
============================ */

this.route.paramMap.subscribe(params => {
    const id =params.get('id');
  }
);


/* ============================
   QUERY PARAM NAVIGATION
============================ */

this.router.navigate(['/users'],
  {
    queryParams: {
      id: 101,
      role: 'admin'
    }
  }
);


/* ============================
   READ QUERY PARAMS
============================ */

this.route.queryParamMap.subscribe(params => {
  const id = params.get('id');
});

/* ============================
   ROUTER OUTLET
============================ */

<router-outlet> </router-outlet>


/* ============================
   ROUTE GUARD
============================ */

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};


/* ============================
   PROTECTED ROUTE
============================ */

{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}


/* ============================
   LAZY LOADING
============================ */

{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(
        m => m.AdminModule
      )
}
`;

guardFlowCode = `
User Request
      ↓
Route Navigation
      ↓
Route Guard
      ↓

Token Exists ?
   /        \\

Yes         No
 ↓           ↓

Allow      Redirect
Route      Login Page
`;

authGuardCode = `import {
  CanActivateFn
} from '@angular/router';

export const authGuard:
CanActivateFn = () => {

  const token =
    localStorage.getItem('token');

  return !!token;

};`;

protectedRouteCode = `{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}`;

authGuardWithRedirectCode = `--like for JWT token

import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
export const authGuard:
CanActivateFn = () => {
  const router =inject(Router);
  const token = localStorage.getItem('token');
  if(token){
    return true;
  }
  return router.createUrlTree(['/login']);
};`;

roleGuardCode = `export const adminGuard:
CanActivateFn = () => {
  const role = localStorage.getItem('role');
  return role === 'Admin';
};`;

implementGaurd = `import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent} from './dashboard/admin.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path:'adminPage',
    component: AdminComponent,
    canActivate: [authGaurd, AdminGaurd]
  }
];`
}