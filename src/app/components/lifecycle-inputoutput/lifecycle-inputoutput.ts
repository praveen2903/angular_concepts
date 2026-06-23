import { Component } from '@angular/core';

@Component({
  selector: 'app-lifecycle-inputoutput',
  standalone: false,
  templateUrl: './lifecycle-inputoutput.html',
  styleUrl: './lifecycle-inputoutput.css',
})
export class LifecycleInputoutput {

  employeeName = 'Praveen';
randomDefs = `
═══════════════════════════════════════════════════════
19. LIFECYCLE HOOKS -- too important you would see usage in machinecodes
═══════════════════════════════════════════════════════
constructor  -- 1st to execute
     ↓
ngOnChanges  
-- works only when parent -> child/ child->parent communication if internal setTimeout, setInterval Macrotasks changes recording need the ChangeDetectionRef
     ↓
ngOnInit  -- like useEffect with empty dependency works on page load
     ↓
ngDoCheck
     ↓
ngAfterViewInit
     ↓
ngOnDestroy  - unmounting timeouts, intervals, removelisteners

Used For:
• API Calls
• Input Changes
• Cleanup
• View Initialization`;

inputCode = `import { Input } from '@angular/core';
@Input()
userName!: string;`;

outputCode = `import {Output,  EventEmitter} from '@angular/core';
@Output()
userClicked = new EventEmitter<string>();

sendData(){
  this.userClicked.emit(
    'Hello Parent'
  );
}`;

parentHtmlCode = `<app-child [userName]="employeeName" (userClicked)="receiveData($event)"></app-child>`;

parentTsCode = `export class ParentComponent {
  employeeName = 'Praveen';
  receiveData(data:string){
    console.log(data);
  }
}`;

childHtmlCode = `<h3>{{ userName }}</h3>
<button (click)="sendData()">
 Send To Parent
</button>`;

inputFlowCode = `
Parent Component
        ↓
      Data
        ↓
     @Input
        ↓
 Child Component
`;

outputFlowCode = `Child Component
        ↓
 EventEmitter
        ↓
   @Output
        ↓
 Parent Component`;

lifecycleOrderCode = `
Constructor
      ↓
ngOnChanges
      ↓
ngOnInit
      ↓
ngDoCheck
      ↓
ngAfterContentInit
      ↓
ngAfterContentChecked
      ↓
ngAfterViewInit
      ↓
ngAfterViewChecked
      ↓
ngOnDestroy
`;

  lifecycleCode = `import {Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
 AfterViewChecked, OnDestroy} from '@angular/core';

constructor(){
 console.log('Constructor');
}

ngOnChanges(){
 console.log('ngOnChanges');
}
ngOnInit(){
 console.log('ngOnInit');
}

ngDoCheck(){
 console.log('ngDoCheck');
}

ngAfterContentInit(){
 console.log('ngAfterContentInit');
}

ngAfterContentChecked(){
 console.log('ngAfterContentChecked');

}

ngAfterViewInit(){
 console.log('ngAfterViewInit');
}

ngAfterViewChecked(){
 console.log('ngAfterViewChecked');
}

ngOnDestroy(){
 console.log('ngOnDestroy');
}`;

  changeFlowCode = `
Parent Updates Data
        ↓
@Input Updated
        ↓
ngOnChanges
        ↓
ngDoCheck
        ↓
View Updated
`;

  viewChildCode = `@ViewChild('inputRef')
inputRef!: ElementRef;

ngAfterViewInit(){
 this.inputRef.nativeElement.focus();
}`;

  realWorldCode = `export class UsersComponent implements OnInit, OnDestroy {
  subscription:any;
  constructor(
    private http:HttpClient
  ){}

  ngOnInit(){
    this.subscription = this.http.get('/api/users').subscribe();  // or call the service which is industrial standard
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
}`;

withoutDepenencyInjection = `export class UserComponent {
  userService = new UserService();
}
  UserComponent
      ↓
Creates UserService
❌ Tight Coupling
❌ Hard To Test
❌ Multiple Instances
❌ Angular Cannot Manage Lifecycle`
dependencyInjection = `constructor(
  private userService: UserService
) {}
  
Angular Injector
        ↓
Creates UserService
        ↓
Provides Instance
        ↓
Injects Into Component

but need service to mention: 
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
  getUsers() {
    return ['Praveen','Sai','Rahul'];
  }
}`
childtoparent = `sending data child->parent in an event

/* ======================================================
   CHILD COMPONENT
====================================================== */

import {Component,Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html'
})
export class ChildComponent {
  employee = {
    id: 101,
    name: 'Praveen',
    department: 'Engineering',
    salary: 80000
  };

  @Output()
  employeeSelected = new EventEmitter<any>();

  sendEmployee() {                             -- sendEmployee method that using the event emitter and emit to parent
    this.employeeSelected.emit(this.employee);
  }
}

<button (click)="sendEmployee()">Send Employee</button>

/* ======================================================
   PARENT COMPONENT
====================================================== */

import { Component } from '@angular/core';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  selectedEmployee: any;

  receiveEmployee(employee: any) {   //employee event like selected employee
    this.selectedEmployee = employee;
  }
}

<app-child (employeeSelected)="receiveEmployee($event)"></app-child>   //employeeselected eventemitter in child and recieveEmployee method in parent ts
<hr>
<h3>Employee Details</h3>
<p>Id : {{ selectedEmployee?.id }}</p>
<p>Name : {{ selectedEmployee?.name }}</p>
<p>Department : {{ selectedEmployee?.department }}</p>
<p>Salary : {{ selectedEmployee?.salary }}</p>`

lifecycleMethodsOutput= `1. Constructor
userName = Praveen
2. ngOnChanges
{
  userName: {
    previousValue: undefined,
    currentValue: 'Praveen',
    firstChange: true
  }
}
3. ngOnInit
API Calls Usually Here
4. ngDoCheck
5. ngAfterViewInit
--------------------------------
Click Change Name
4. ngDoCheck
--------------------------------
Parent Change Input
2. ngOnChanges
{
  userName: {
    previousValue: 'Praveen',
    currentValue: 'Rahul',
    firstChange: false
  }
}
4. ngDoCheck
--------------------------------
Component Removed
6. ngOnDestroy`
 lifecyleMethods = `import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  DoCheck,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: \`
    <h2>{{ userName }}</h2>

    <button (click)="changeName()">
      Change Name
    </button>
  \`
})
export class UserCardComponent implementsOnChanges,OnInit,DoCheck,AfterViewInit,OnDestroy {
  @Input()
  userName = 'Praveen';
  constructor() {
    console.log('1. Constructor');
    console.log('userName '=this.userName);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('2. ngOnChanges');
    console.log(changes);
  }
  ngOnInit() {
    console.log('3. ngOnInit');
    console.log('API Calls Usually Here');
}
  ngDoCheck() {
    console.log('4. ngDoCheck');
  }
  ngAfterViewInit() {
    console.log('5. ngAfterViewInit');
  }
  changeName() {
    this.userName ='Sai';
  }
  ngOnDestroy() {
    console.log('6. ngOnDestroy');
  }
}`

interviewQuestions = `
Parent Component
       ↓
Load Child
       ↓
User Click Button
       ↓
sendEmployee()
       ↓
employeeSelected.emit(employee)
       ↓
@Output()
       ↓
(employeeSelected)
       ↓
receiveEmployee($event)
       ↓
selectedEmployee = employee
       ↓
UI Updated
@Output()
userSelected = new EventEmitter<User>();
selectUser() {
  this.userSelected.emit(this.user);
}
-----------------------------------
<app-user-card (userSelected)="loadUser($event)">
</app-user-card>
-----------------------------------
loadUser(user: User) {
  console.log(user);
}`
parentproduct = ` But child to parent event is passed 
parent -> child : products sent [parentRecords]
child -> parent : products added to card (childEventEmitter)="parentMethod($event)" event binding

--parent.ts

import { Component } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  cartCount = 0;
  products = [
    {
      id: 1,
      name: 'iPhone 16',
      price: 80000,
      stock: 10
    },
    {
      id: 2,
      name: 'Samsung S26',
      price: 70000,
      stock: 5
    },
    {
      id: 3,
      name: 'OnePlus 15',
      price: 50000,
      stock: 8
    }
  ];

  addToCart(product: any) {
      this.cartService.add(product);
      this.store.dispatch(addToCart(product));
      this.http.post('/api/cart', product).subscribe();
  }
}
  
-------parent.html

<h2>Cart Count : {{ cartCount }}</h2>

<app-product-card *ngFor="let product of products" [product]="product" (cartClicked)="addToCart($event)"></app-product-card>


-- child.ts

import {Component,Input,Output,EventEmitter} from '@angular/core';

@Component({
 selector:'app-product-card',
 templateUrl:'./product-card.html'
})
export class ProductCardComponent {
 @Input()
   PARENT COMPONENT
====================================================== */

import { Component } from '@angular/core';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  selectedEmployee: any;

  receiveEmployee(employee: any) {   //employee event like selected employee
    this.selectedEmployee = employee;
  }
}

<app-child (employeeSelected)="receiveEmployee($event)"></app-child>   //employeeselected eventemitter in child and recieveEmployee method in parent ts
<hr>
<h3>Employee Details</h3>
<p>Id : {{ selectedEmployee?.id }}</p>
<p>Name : {{ selectedEmployee?.name }}</p>
<p>Department : {{ selectedEmployee?.department }}</p>
<p>Salary : {{ selectedEmployee?.salary }}</p>`

// lifecycleMethodsOutput= `1. Constructor
// userName = Praveen
// 2. ngOnChanges
// {
//   userName: {
//     previousValue: undefined,
//     currentValue: 'Praveen',
//     firstChange: true
//   }
// }
// 3. ngOnInit
// API Calls Usually Here
// 4. ngDoCheck
// 5. ngAfterViewInit
// --------------------------------
// Click Change Name
// 4. ngDoCheck
// --------------------------------
// Parent Change Input
// 2. ngOnChanges
// {
//   userName: {
//     previousValue: 'Praveen',
//     currentValue: 'Rahul',
//     firstChange: false
//   }
// }
// 4. ngDoCheck
// --------------------------------
// Component Removed
// 6. ngOnDestroy`
//  lifecyleMethods = `import {
//   Component,
//   Input,
//   OnChanges,
//   SimpleChanges,
//   OnInit,
//   DoCheck,
//   AfterViewInit,
//   OnDestroy
// } from '@angular/core';

// @Component({
//   selector: 'app-user-card',
//   template: \`
//     <h2>{{ userName }}</h2>

//     <button (click)="changeName()">
//       Change Name
//     </button>
//   \`
// })
// export class UserCardComponent implementsOnChanges,OnInit,DoCheck,AfterViewInit,OnDestroy {
//   @Input()
//   userName = 'Praveen';
//   constructor() {
//     console.log('1. Constructor');
//     console.log('userName '=this.userName);
//   }
//   ngOnChanges(changes: SimpleChanges) {
//     console.log('2. ngOnChanges');
//     console.log(changes);
//   }
//   ngOnInit() {
//     console.log('3. ngOnInit');
//     console.log('API Calls Usually Here');
// }
//   ngDoCheck() {
//     console.log('4. ngDoCheck');
//   }
//   ngAfterViewInit() {
//     console.log('5. ngAfterViewInit');
//   }
//   changeName() {
//     this.userName ='Sai';
//   }
//   ngOnDestroy() {
//     console.log('6. ngOnDestroy');
//   }
// }`

// interviewQuestions = `
// Parent Component
//        ↓
// Load Child
//        ↓
// User Click Button
//        ↓
// sendEmployee()
//        ↓
// employeeSelected.emit(employee)
//        ↓
// @Output()
//        ↓
// (employeeSelected)
//        ↓
// receiveEmployee($event)
//        ↓
// selectedEmployee = employee
//        ↓
// UI Updated
// @Output()
// userSelected = new EventEmitter<User>();
// selectUser() {
//   this.userSelected.emit(this.user);
// }
// -----------------------------------
// <app-user-card (userSelected)="loadUser($event)">
// </app-user-card>
// -----------------------------------
// loadUser(user: User) {
//   console.log(user);
// }`
// parentproduct = ` But child to parent event is passed 
// parent -> child : products sent [parentRecords]
// child -> parent : products added to card (childEventEmitter)="parentMethod($event)" event binding

// --parent.ts

// import { Component } from '@angular/core';
// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html'
// })
// export class ProductsComponent {
//   cartCount = 0;
//   products = [
//     {
//       id: 1,
//       name: 'iPhone 16',
//       price: 80000,
//       stock: 10
//     },
//     {
//       id: 2,
//       name: 'Samsung S26',
//       price: 70000,
//       stock: 5
//     },
//     {
//       id: 3,
//       name: 'OnePlus 15',
//       price: 50000,
//       stock: 8
//     }
//   ];

//   addToCart(product: any) {
//       this.cartService.add(product);
//       this.store.dispatch(addToCart(product));
//       this.http.post('/api/cart', product).subscribe();
//   }
// }
  
// -------parent.html

// <h2>Cart Count : {{ cartCount }}</h2>

// <app-product-card *ngFor="let product of products" [product]="product" (cartClicked)="addToCart($event)"></app-product-card>


// -- child.ts

// import {Component,Input,Output,EventEmitter} from '@angular/core';

// @Component({
//  selector:'app-product-card',
//  templateUrl:'./product-card.html'
// })
// export class ProductCardComponent {
//  @Input()
//  product!: any;

//  @Output()
//  cartClicked = new EventEmitter<any>();

//   addProduct() {
//     this.cartClicked.emit(this.product);
//   }
// }
 
// ---child html

// <div class="card">
//   <h3>{{ product.name }}</h3>
//   <p>₹{{ product.price| INR }}</p>
//   <p>Stock : {{ product.stock }}</p>

//   <button (click)="addProduct()"> Add To Cart </button>
// </div>`

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
