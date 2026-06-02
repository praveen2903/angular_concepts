import { ServicesDemo } from './../../services/services-demo';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-services-templateref',
  standalone: false,
  templateUrl: './services-templateref.html',
  styleUrl: './services-templateref.css',
})
export class ServicesTemplateref {
loading = false;

errorMessage = '';
serviceFlowCode = `
Component
    ↓
Requests Data
    ↓
Service
    ↓
API / Business Logic
    ↓
Return Data
    ↓
Component
    ↓
    UI`;

serviceCode = `import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    return ['Praveen', 'Sai', 'Rahul'];
  }
}`;

serviceUsageCode = `import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
 selector:'app-users',
 templateUrl:'./users.component.html'
 styleUrl: './users.component.css',
})

export class UsersComponent {
 users:string[] = [];
 constructor(private userService: UserService) {}

 ngOnInit() {
   this.users = this.userService.getUsers();
 }
}`;

serviceHtmlCode = `<ul>
  <li *ngFor="let user of users">
    {{ user }}
  </li>
</ul>`;

serviceOutputCode = `
UsersComponent Created
        ↓
Angular Injector
        ↓
Create UserService
        ↓
Inject Service
        ↓
ngOnInit()
        ↓
getUsers()
        ↓
['Praveen','Sai','Rahul']
        ↓
UI Rendered
`;



templateRefCode = `<input #userInput type="text"/>
<button (click)="showValue(userInput.value)">Show Value</button>`;

templateRefTsCode = `showValue(value:string){
 console.log(value);
}`;

templateRefFlowCode = `
HTML Element
      ↓
#userInput
      ↓
Template Ref Variable
      ↓
userInput.value
      ↓
Component Method
      ↓
TypeScript
`;



viewChildCode = `import {Component,ViewChild,ElementRef, AfterViewInit} from '@angular/core';

export class UsersComponent implements AfterViewInit {

 @ViewChild('userInput') -- @viewChildRef
 input!: ElementRef;

 ngAfterViewInit() {
   this.input.nativeElement.focus();
 }
}`;

viewChildFlowCode = `
HTML
  ↓
#userInput
  ↓
ViewChild
  ↓
ElementRef
  ↓
Access DOM
`;



enterpriseServiceCode = `/* =================================================
   PRODUCT SERVICE
================================================= */
@Injectable({providedIn:'root'})

export class ProductService {
 constructor(private http: HttpClient) {}

 getProducts() {
   return this.http.get('/api/products');
 }

 addProduct(product:any) {
  return this.http.post('/api/products', product);
 }
}

/* =================================================
   COMPONENT
================================================= */
export class ProductsComponent {
 products:any[] = [];
 constructor(private productService: ProductService){}
 ngOnInit(){
   this.productService.getProducts().subscribe(data => {
      this.products =data;
   });
 }
}`;

dependencyInjectionCode = `/* WITHOUT DI */
export class UserComponent {
 userService = new UserService();
}
/* Problems
❌ Tight Coupling
❌ Hard To Test
❌ Multiple Instances
❌ Angular Cannot Control Lifecycle

/* WITH DI */
constructor(private userService: UserService){}
/* Benefits
✅ Loose Coupling
✅ Easy Testing
✅ Singleton Service
✅ Angular Managed

*/`;



realWorldCode = `
Login Component
       ↓
AuthService.login()
       ↓
Backend API
       ↓
JWT Token
       ↓
Store Token
       ↓
Navigate Dashboard

--------------------------------

Products Component
       ↓
ProductService
       ↓
REST API
       ↓
Products Data
       ↓
Render UI

--------------------------------

Cart Component
       ↓
CartService
       ↓
Add Item
       ↓
Update Count
       ↓
Navbar Updated
`;


serviceInterviewCode = `Q. Why Services?
A. Reusable Business Logic
--------------------------------
Q. Service Lifetime?
A. Usually Singleton
--------------------------------
Q. How Service Created?
A. Angular Injector
--------------------------------
Q. Most Common Service?
A. HttpClient Service
--------------------------------
Q. Can Components Communicate Through Service?
A. Yes (Subject/BehaviorSubject)
--------------------------------
Q. Service vs Component?
Service -> Logic
Component -> UI
`;



templateInterviewCode = `Q. What is #input?
A. Template Reference Variable
--------------------------------
Q. Where Available?
A. Template Only
--------------------------------
Q. Access In TS?
A. ViewChild
--------------------------------
Q. ViewChild Available In?
A. ngAfterViewInit
--------------------------------
Q. Can We Access DOM Directly?
A. Yes Using ElementRef
--------------------------------
Q. Preferred?
A. Angular Binding First
`;

constructorRef = `export class UsersComponent {
  constructor(private userService: UserService) {}
}`


 users: any[] = [];

  @ViewChild('nameRef')
  nameRef!: ElementRef;

  constructor(private servicesDemo: ServicesDemo) {}

  loadUsers() {
    this.servicesDemo.getUsers().subscribe({
        next: (response:any) => {
          console.log('GET SUCCESS',response);
          this.users = response;
        },
        error: (err) => {
          console.log('GET ERROR',err);
        }
      });
  }

  getSingleUser() {
    this.servicesDemo.getUserById(101).subscribe(response => {
        console.log('USER DETAILS',response);
      });
  }

  searchUser() {
    this.servicesDemo.searchUsers('Praveen','Developer').subscribe(response => {
        console.log('SEARCH RESULT',response);
      });
  }

  addUser() {
    const body = {
      name: this.nameRef.nativeElement.value,
      role:'Developer',
      salary: 7000
    };

    this.servicesDemo.createUser(body).subscribe(response => {
        console.log('POST SUCCESS',response);
      });
  }

  updateUser() {
    const body = {
      name:'Updated Praveen',
      role:'Lead Developer',
      salary:10000
    };

    this.servicesDemo.updateUser(101,body).subscribe(response => {
        console.log('PUT SUCCESS', response);
      });
  }

  deleteUser() {
    this.servicesDemo.deleteUser(101).subscribe(response => {
        console.log('DELETE SUCCESS',response);

      });
  }

  userServicesDemoService = `import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesDemo {
  private api = 'http://localhost:5200/api/users';
  constructor(private http: HttpClient) {}  //injecting httpClient

  getUsers() {
    return this.http.get(this.api);
  }

  /* ====================================
      GET USER BY ID - normal params
  ==================================== */

  getUserById(id: number) {
    return this.http.get(\`\${this.api}/\${id}\`);
  }

  /* ====================================
      QUERY PARAMS   http://localhost:5200?name=..&page = ...
  ==================================== */

  searchUsers(name: string, role: string) {
    const params = new HttpParams().set('name', name).set('role', role);
    return this.http.get(this.api, { params });
  }
  createUser(user: any) {
    return this.http.post(this.api, user);
  }

  updateUser(id: number, user: any) {
    return this.http.put(\`\${this.api}/\${id}\`,  user);
  }

  deleteUser(id: number) {
    return this.http.delete(\`\${this.api}/\${id}\`);
  }
}`

serviceInjectionToComponent=`users: any[] = [];

  @ViewChild('nameRef')
  nameRef!: ElementRef;

  constructor(private servicesDemo: ServicesDemo) {}

  loadUsers() {
    this.servicesDemo.getUsers().subscribe({
        next: (response:any) => {
          console.log('GET SUCCESS',response);
          this.users = response;
        },
        error: (err) => {
          console.log('GET ERROR',err);
        }
      });
  }

  getSingleUser() {
    this.servicesDemo.getUserById(101).subscribe(response => {
        console.log('USER DETAILS',response);
      });
  }

  searchUser() {
    this.servicesDemo.searchUsers('Praveen','Developer').subscribe(response => {
        console.log('SEARCH RESULT',response);
      });
  }

  addUser() {
    const body = {
      name: this.nameRef.nativeElement.value,
      role:'Developer',
      salary: 7000
    };

    this.servicesDemo.createUser(body).subscribe(response => {
        console.log('POST SUCCESS',response);
      });
  }

  updateUser() {
    const body = {
      name:'Updated Praveen',
      role:'Lead Developer',
      salary:10000
    };

    this.servicesDemo.updateUser(101,body).subscribe(response => {
        console.log('PUT SUCCESS', response);
      });
  }

  deleteUser() {
    this.servicesDemo.deleteUser(101).subscribe(response => {
        console.log('DELETE SUCCESS',response);

      });
  }`

  implementRefandServiceHtml = `<section class="card">
  <h2>User Management</h2>
<input #nameRef type="text" placeholder="Enter Name"/>

<hr>

<button (click)="loadUsers()">GET Users</button>
<button (click)="getSingleUser()">GET User By Id</button>
<button (click)="searchUser()">Query Params</button>
<button (click)="addUser()">POST User</button>
<button (click)="updateUser()">PUT User</button>
<button (click)="deleteUser()">DELETE User</button>

<hr>

<!-- Loading -->

<div *ngIf="loading">
  Loading Users...
</div>

<!-- Error -->

<div *ngIf="errorMessage">
  {{ errorMessage }}
</div>

<!-- Table -->

<table *ngIf="users.length > 0">
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
    </tr>
  </thead>

  <tbody>

    <tr *ngFor="let user of users">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
    </tr>

  </tbody>

</table>

<!-- Empty State -->

<div *ngIf="!loading && !errorMessage && users.length === 0">
  No Users Found
</div>
</section>`;
}

