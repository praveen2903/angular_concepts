import { ModelDemo } from './../../services/model-demo';
import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user-model';

@Component({
  selector: 'app-models-usage',
  standalone: false,
  templateUrl: './models-usage.html',
  styleUrl: './models-usage.css',
})
export class ModelsUsage implements OnInit {
  users: User[] = [];
  selectedUser!: User;
  openModal = false;
  constructor(private ModelDemo: ModelDemo) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.ModelDemo.getUsers().subscribe({
        next: (response) => {
          // console.log('users before: ', this.users)
          this.users = response;
          // console.log('Users Loaded',this.users);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  viewUser(user: User): void {
    this.selectedUser = user;
    this.openModal = true;
  }
  closeModal(): void {
    this.openModal = false;
  }

  modelDemoCode = `Acts same like type & interface to the angular services.
Mostly used in services & forms
Used to define structure of data that will be sent to backend & received from backend

  export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}`

modalDemoService = `import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user-model';

@Injectable({
  providedIn: 'root'
})

export class ModelDemo {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}`

modalusageTsCode = `users: User[] = [];
  selectedUser!: User;
  openModal = false;
  constructor(private ModelDemo: ModelDemo) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.ModelDemo.getUsers().subscribe({
        next: (response) => {
          // console.log('users before: ', this.users)
          this.users = response;
          // console.log('Users Loaded',this.users);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }`

  modalUsageHtmlCode = `<table border="1">
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngIf="users.length === 0">
      <td colspan="4">
        No Users Found
      </td>
    </tr>
    <tr *ngFor="let user of users">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td> <button (click)="viewUser(user)">View</button></td>
    </tr>
  </tbody>

</table>`
  withoutModels = `users: any[] = [];
  
❌ No type safety
❌ No IntelliSense
❌ Typing mistakes
❌ Hard to maintain`

useOfModels = `users: User[] = [];
Class model uses to give initial Default values and mostly used for forms & memory allocated to object & can have methods too
export class User {
  id: number = 0;
  name: string = '';
  email: string = '';
  role: string = '';
}
  
Interface model just used to define types and attached to services to capture data & No object created
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
  
✅ Type Safety
✅ Auto Suggestions
✅ Cleaner Code
✅ Reusable
✅ Easy Refactoring`
randomDefs= `
╔══════════════════════════════════════════════════════╗
║             ANGULAR COMPLETE ARCHITECTURE           ║
╚══════════════════════════════════════════════════════╝
Browser
   ↓
main.ts
   ↓
App Module
   ↓
Routing
   ↓
Components
   ↓
Templates
   ↓
Services
   ↓
HttpClient
   ↓
Backend API
   ↓
Observable
   ↓
UI Update

═══════════════════════════════════════════════════════
1. COMPONENT
═══════════════════════════════════════════════════════
Purpose: UI Building Block
Contains:
• HTML
• CSS
• TypeScript

Example:
@Component({
 selector:'app-user',  -- name of the component when we use it in other components
 templateUrl:'./user.html', -- path to the html file
 styleUrl:'./user.css'  -- path to the css file
})
export class UserComponent {}

Used For:
• Login
• Dashboard
• Product Card
• Navbar
• Sidebar
═══════════════════════════════════════════════════════
2. TEMPLATE
═══════════════════════════════════════════════════════
Purpose: HTML View Of Component
Features:
• Interpolation
• Property Binding
• Event Binding
• Directives

Example:
{{name}}
(click)="save()"
[disabled]="isLoading"
[(ngModel)]="name"

═══════════════════════════════════════════════════════
3. MODULE
═══════════════════════════════════════════════════════
Purpose: Groups Angular Features
Example:
@NgModule({
 declarations:[...], -- components,directive,pipe which are used in this module
 imports:[...],      -- modules which are imported from other modules
 providers:[...],    -- services which are used in this module
 bootstrap:[]        -- components which are used in this module
})

Types:
• AppModule
• SharedModule
• AdminModule
• UserModule


═══════════════════════════════════════════════════════
4. MODEL
═══════════════════════════════════════════════════════
Purpose: Represents Business Data

Example:

export class Employee {
 id:number = 0;
 name:string = '';
 salary:number = 0;
}

Used For:

Backend Data Structure
API Responses
Forms
State Management


═══════════════════════════════════════════════════════
5. INTERFACE
═══════════════════════════════════════════════════════

Purpose: Type Safety
Example:
export interface Employee {
 id:number;
 name:string;
 salary:number;
}

Difference:

Interface
↓
Contract Only

Model
↓
Can Have Logic


═══════════════════════════════════════════════════════
6. SERVICE
═══════════════════════════════════════════════════════

Purpose: Reusable Business Logic

Example:

@Injectable({
 providedIn:'root'
})
export class UserService {}

Used For:

• API Calls
• Authentication
• Logging
• Caching
• Shared Logic


═══════════════════════════════════════════════════════
7. DEPENDENCY INJECTION
═══════════════════════════════════════════════════════

Purpose: Automatically Provides Services, formBuilders, httpClients------

constructor(private userService:UserService){}

Flow:
Component
    ↓
Injector
    ↓
Service
    ↓
Usage


═══════════════════════════════════════════════════════
8. HTTPCLIENT
═══════════════════════════════════════════════════════

Purpose: Backend Communication
Example: this.http.get('/users')
Flow:
Angular
   ↓
HttpClient
   ↓
API
   ↓
Response


═══════════════════════════════════════════════════════
9. OBSERVABLE (RXJS)
═══════════════════════════════════════════════════════

Purpose: Async Data Streams
Example:
this.http.get('/users').subscribe(data=>{})

Used For:
• API Calls
• WebSockets
• Events
• Real Time Updates


═══════════════════════════════════════════════════════
10. INTERCEPTOR
═══════════════════════════════════════════════════════

Purpose:
Intercept HTTP Requests

Example Uses:

• JWT Token
• Logging
• Error Handling
• Loader

Flow:

Request
   ↓
Interceptor
   ↓
Backend
   ↓
Response
   ↓
Interceptor
   ↓
Component


═══════════════════════════════════════════════════════
11. ROUTING
═══════════════════════════════════════════════════════

Purpose: Page Navigation

Example:
{
 path:'users',
 component:UsersComponent
}

Used For:
• Dashboard
• Orders
• Users
• Profile


═══════════════════════════════════════════════════════
12. ROUTE GUARDS
═══════════════════════════════════════════════════════

Purpose: Protect Routes

Types:
• CanActivate
• CanDeactivate
• CanLoad
• CanMatch
• Resolve

Example: canActivate:[authGuard]


═══════════════════════════════════════════════════════
13. DIRECTIVES
═══════════════════════════════════════════════════════

Purpose: Manipulate DOM

Structural:
*ngIf
*ngFor
*ngSwitch

Attribute:
ngClass
ngStyle


═══════════════════════════════════════════════════════
14. PIPES
═══════════════════════════════════════════════════════

Purpose: Transform Data

Examples:
uppercase
currency
date
percent
json
custom pipe
Example:
{{salary | currency:'INR'}}


═══════════════════════════════════════════════════════
15. FORMS
═══════════════════════════════════════════════════════

Template Driven: [(ngModel)]

Reactive Forms
FormGroup
FormControl
FormArray

Used For:
• Login
• Registration
• Profile
• Dynamic Forms


═══════════════════════════════════════════════════════
16. INPUT
═══════════════════════════════════════════════════════

Purpose: Parent → Child Data

@Input()
user!:User

Flow:

Parent
  ↓
Input
  ↓
Child


═══════════════════════════════════════════════════════
17. OUTPUT
═══════════════════════════════════════════════════════

Purpose:
Child → Parent Events

@Output()
save = new EventEmitter()

Flow:

Child
  ↓
EventEmitter
  ↓
Parent


═══════════════════════════════════════════════════════
18. VIEWCHILD
═══════════════════════════════════════════════════════

Purpose: Access DOM / Child Component

@ViewChild('inputRef')
input!:ElementRef

Used For:

• Focus Input
• Child Method Calls
• DOM Access


═══════════════════════════════════════════════════════
19. LIFECYCLE HOOKS -- too important
═══════════════════════════════════════════════════════

constructor
     ↓
ngOnChanges
     ↓
ngOnInit
     ↓
ngDoCheck
     ↓
ngAfterViewInit
     ↓
ngOnDestroy

Used For:

• API Calls
• Input Changes
• Cleanup
• View Initialization


═══════════════════════════════════════════════════════
20. ENVIRONMENT FILES
═══════════════════════════════════════════════════════

Purpose: Configuration
environment.ts
environment.prod.ts
Example:

apiUrl:'https://api.company.com'
Used For:

• URLs
• Keys
• Feature Flags


═══════════════════════════════════════════════════════
INDUSTRY FLOW
═══════════════════════════════════════════════════════

User Click
    ↓
Component
    ↓
Service
    ↓
HttpClient
    ↓
Interceptor
    ↓
Backend API
    ↓
Observable
    ↓
Component
    ↓
Pipe
    ↓
Template
    ↓
UI Update

`;

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
