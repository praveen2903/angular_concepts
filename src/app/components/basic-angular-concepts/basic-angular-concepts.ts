import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-angular-concepts',
  standalone: false,
  templateUrl: './basic-angular-concepts.html',
  styleUrl: './basic-angular-concepts.css',
})
export class BasicAngularConcepts {

  appModuleConcept = `@NgModule

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

Purpose:
• Root module of Angular application.
• Groups related components, directives, pipes and services.
• Tells Angular what belongs to the application.

Important Properties

declarations
-------------
Registers Components, Directives and Pipes.

imports
-------------
Imports other Angular Modules.

providers
-------------
Registers Services globally.

bootstrap
-------------
First component loaded when application starts.

exports
-------------
Makes components/directives/pipes available to other modules.
`;


appRoutingModuleConcept = `App Routing Module

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

Purpose:
• Handles navigation.
• Maps URL to Components.
• Supports Route Guards.
• Supports Lazy Loading.
• Supports Route Parameters.
• Supports Child Routes.

Router Methods

routerLink
-----------
Navigate using HTML.

router.navigate()
-----------
Navigate using TypeScript.

ActivatedRoute
-----------
Read URL Parameters.

router-outlet
-----------
Displays routed component.
`;



componentConcept = `@Component

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

Purpose
---------
Represents one UI screen.

Contains
---------
HTML
CSS
TypeScript

Main Properties

selector
---------
HTML tag name.

template
---------
Inline HTML.

templateUrl
---------
External HTML.

styles
---------
Inline CSS.

styleUrls
---------
External CSS.

standalone
---------
Component without NgModule.

Lifecycle

constructor()
ngOnInit()
ngOnChanges()
ngDoCheck()
ngAfterViewInit()
ngOnDestroy()
`;


routeGuardConcept = `Route Guards

@CanActivate
@CanActivateChild
@CanDeactivate
@CanLoad
@Resolve

Purpose
-------
• Control navigation.
• Protect routes.
• Load data before route activation.

Example:

import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // return true → allow navigation
  // return false → block navigation
  // Observable<boolean> → async
  // UrlTree → redirect
};

Usage:

{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
`;


serviceConcept = `@Injectable

@Injectable({
  providedIn: 'root'
})

export class UserService{

  constructor(private http:HttpClient){}

  getUsers(){
      return this.http.get('/api/users');
  }
}

Purpose
---------
Contains reusable business logic.

Why use Services?

✔ API Calls
✔ Shared Data
✔ Authentication
✔ Utility Methods
✔ Code Reusability

providedIn:'root'
-------------------
Singleton service available throughout the application.
`;

directiveConcept = `Directives

Types

1. Component Directive
-----------------------
@Component

2. Structural Directive
-----------------------
*ngIf
*ngFor
*ngSwitch

Changes DOM structure.

3. Attribute Directive
-----------------------
ngClass
ngStyle

Changes appearance of element.

Custom Directive
----------------
@Directive({
 selector:'[appHighlight]'
})
`;

pipeConcept = `Pipes

Purpose
---------
Transform data in Template.

Examples

{{name | uppercase}}

{{price | currency}}

{{today | date}}

{{text | lowercase}}

{{amount | number}}

{{value | percent}}

Custom Pipe

@Pipe({
 name:'capitalize'
})

Types

Pure Pipe
---------
Runs only when input changes.

Impure Pipe
---------
Runs every change detection.
`;

moduleConcept = `Angular Modules

Root Module
-----------
AppModule

Feature Module
--------------
AdminModule
UserModule

Shared Module
-------------
Common Components,
Directives,
Pipes

Core Module
-----------
Singleton Services.

Lazy Loaded Module
------------------
Loaded only when required.
`;

decoratorsConcept = `Angular Decorators (@)

@Component
-----------
Creates Component.

@NgModule
-----------
Creates Module.

@Injectable
-----------
Creates Service.

@Directive
-----------
Creates Directive.

@Pipe
-----------
Creates Pipe.

@Input
-----------
Receives data from Parent.

@Output
-----------
Sends data to Parent.

@HostListener
-----------
Listens to DOM Events.

@HostBinding
-----------
Binds Host Element Properties.

@ViewChild
-----------
Access Child Component.

@ViewChildren
-----------
Access Multiple Child Components.

@ContentChild
-----------
Access projected content.

@ContentChildren
-----------
Access multiple projected elements.
`;


routingConcept = `Angular Routing

<router-outlet>
---------------
Displays routed component.

routerLink
-----------
Navigate using HTML.

router.navigate()
------------------
Navigate using TypeScript.

ActivatedRoute
--------------
Read Route Parameters.

Route Parameters
----------------
users/:id

Query Parameters
----------------
products?page=1

Wildcard Route
--------------
{path:'**', component:NotFoundComponent}

Redirect Route
--------------
{path:'', redirectTo:'home', pathMatch:'full'}

Lazy Loading
------------
loadChildren()

Route Guards
------------
CanActivate

CanDeactivate

Resolve

CanLoad

CanMatch
`;


angularArchitecture = `Angular Architecture

main.ts
---------
Application Entry Point.

↓

AppModule
---------
Root Module.

↓

AppComponent
---------
Root Component.

↓

App Routing
---------
Navigation.

↓

Components
---------
UI Screens.

↓

Services
---------
Business Logic.

↓

Models
---------
Data Structure.

↓

API
---------
Backend Communication.

↓

Database
---------
Stores Data.
`;

angularFolders = `Common Angular Folder Structure

src/
│
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── guards/
│   ├── interceptors/
│   ├── directives/
│   ├── pipes/
│   ├── shared/
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.ts
│
├── assets/
│
├── environments/
│
├── styles.css
│
├── index.html
│
└── main.ts

Purpose

main.ts
---------
Starts Angular App.

app.module.ts
---------
Registers Application.

app-routing.module.ts
---------
Handles Routing.

components
---------
UI.

services
---------
Business Logic.

models
---------
Interfaces & Types.

guards
---------
Protect Routes.

interceptors
---------
Modify HTTP Requests.

pipes
---------
Transform Data.

directives
---------
Custom DOM Behaviour.

shared
---------
Reusable Components.



-- standalone = false gives the proper architecture of the application -- it will create a module file -- if standalone is true -- there is no module file -- it will be available to all the components directly.`;



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

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
