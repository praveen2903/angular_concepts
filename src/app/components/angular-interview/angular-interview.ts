import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-interview',
  standalone: false,
  templateUrl: './angular-interview.html',
  styleUrl: './angular-interview.css',
})
export class AngularInterview {
  dataBindingCode = `
Data Binding
What Is It?
------------
Communication between
Component (TS) ↔ Template (HTML)

Types
------------
1. Interpolation {{ }}
2. Property Binding [] -- for disabled, src, sending data to dom
3. Event Binding ()    -- for sending events onClick--> (click), onChange --> (change)...
4. Two-Way Binding [()]  -- [(ngModel)]

Interview Trap
------------
[(ngModel)] is NOT a separate binding type.

It combines: Property Binding + Event Binding

Example
------------
<input [(ngModel)]="name">
    
<input  [value]="name" (input)="name=$any($event.target).value">`;

lifecycleCode = `
Lifecycle Hooks

What Is It?
------------
Methods executed during component lifecycle.

Important Hooks
------------
constructor()
ngOnInit()
ngOnChanges()
ngAfterViewInit()
ngOnDestroy()

Execution Order
------------
constructor
     ↓
ngOnChanges
     ↓
ngOnInit
     ↓
ngAfterViewInit
     ↓
ngOnDestroy

Interview Trap
------------
API Calls should be done?
✔ ngOnInit()
❌ constructor()

Reason: Component not fully initialized if constructor is 1st to perform so initialization and DI done in it.

Example
------------
ngOnInit(){
 this.loadUsers(); - calling loadUsers() has the calling services 
}`;

diCode = `
Dependency Injection (DI)

What Is It?
------------
Angular creates and injects dependencies automatically.

Purpose
------------
Loose Coupling

Without DI
------------
const service = new UserService();

With DI
------------
constructor(
 private userService: UserService
){}

Interview Trap
------------
providedIn:'root'  
- single instance for entire app is injected so all methods stored in single service 
and runs as static which removes need of creating object and injected to component.

Creates Singleton Service One instance for entire app.

Example
------------
@Injectable({
 providedIn:'root'
})
export class UserService{}
`;

observableCode = `
Observable: Base building block of RxJS as this creates stream.
Purpose
------------
Creates stream of data.

Used In
------------
✔ HttpClient
✔ WebSocket
✔ Events
✔ Async Operations

Interview Trap
------------
Observable does NOTHING until subscribe().

Example
------------
this.http.get('/users').subscribe(data=>{
 console.log(data);
});
`;

subjectCode = `
Subject

What Is It?
------------
Observable + Observer

Purpose
------------
Component Communication

Interview Trap
------------
Subject stores NO value.
Late subscribers miss previous emissions.

Example
------------
const subject = new Subject<string>();
subject.next('Angular');
subject.subscribe(data=>{
 console.log(data);
});

Output
------------
Nothing Printed
`;

behaviorSubjectCode = `
BehaviorSubject

What Is It?
------------
Special Subject that stores latest value.

Purpose
------------
Shared State

Interview Trap
------------
Requires Initial Value.

Example
------------
const behavior = new BehaviorSubject('Initial');
behavior.next('Angular');
behavior.subscribe(data=>{
 console.log(data);
});

Output
------------
Angular

Difference
------------
Subject
❌ No stored value

BehaviorSubject
✔ Stores latest value`;

switchMapCode = `
switchMap

Purpose
------------
Cancels previous request.
Most Asked RxJS Operator.

Used In
------------
Search APIs

Interview Trap
------------
Previous API call gets cancelled automatically.

Example
------------
search$.pipe( 
 debounceTime(500), switchMap(text =>
  this.http.get('/search?q='+text)
 )
).subscribe();

Use Case
------------
Typeahead Search
`;

reactiveFormsCode = `Reactive Forms

What Is It?
------------
Model Driven Forms.

Advantages
------------
✔ Validation
✔ Dynamic Controls
✔ Better Testing

Interview Trap
------------
Reactive Forms are preferred for enterprise projects.

Template Forms
------------
Small Forms

Reactive Forms
------------
Large Forms

Example
------------
this.form =this.fb.group({
 name:['', Validators.required]
});`;

formArrayCode = `FormArray

Purpose
------------
Dynamic Controls

Used For
------------
✔ Skills
✔ Phones
✔ Addresses

Interview Trap
------------
FormGroup: Fixed Fields
FormArray: Dynamic Fields

Example
------------
skills = this.fb.array([]);

addSkill(){
 this.skills.push(this.fb.control(''));
}
`;

changeDetectionCode = `Change Detection

Purpose
------------
Updates UI when data changes.

Strategies
------------
Default
OnPush

Interview Trap
------------
Default Checks entire tree.

OnPush

Checks only when:
✔ Input Changes
✔ Event Triggered
✔ Observable Emits

Example
------------
@Component({
 changeDetection: ChangeDetectionStrategy.OnPush
})
`;

trackByCode = `trackBy

Purpose
------------
Improves ngFor performance.

Problem
------------
Without trackBy Entire DOM recreated when the trackBy variable matches.

trackBy -allowing key to each item coming in for loop like map key will be there right
Helps Angular identify items efficiently.

Example
------------
trackById(index:number, item:any){
 return item.id;
} 

<div class="demo-box">
  <div *ngFor="let user of users;
      trackBy: trackByUserId">
    {{ user.id }} - {{ user.name }}
  </div>
</div>
<pre>{{trackby}}</pre>

Without trackBy  -- if id matches also destroy dom
      ↓
Destroy DOM
      ↓
Create Again
______________________________
With trackBy
      ↓
Reuse Existing DOM
_______________________________
Benefit
------------
Only changed rows rerender.

real Example:
State 1 (Current UI)
══════════════════════════════════════
User A: {id: 'u101',name: 'Alice'} //Rendered in DOM Node #1

User B: {id: 'u102', name: 'Bob'}  //Rendered in DOM Node #2

State 2 (Fresh API Response) -> new data
══════════════════════════════════════
User A: {id: 'u101',name: 'Alicia'}
User B: {id: 'u102',name: 'Bob'}
User C: {id: 'u103', name: 'Charlie'}

When fresh data is occured don't destroy the DOM instead trackBy the id and stores the node and adds new one`;

asyncPipeCode = `Async Pipe
Purpose
------------
Auto Subscribe
Auto Unsubscribe

Interview Trap
------------
Prevents Memory Leaks.

Without Async Pipe
------------
subscribe()
unsubscribe()

With Async Pipe
------------
{{ users$ | async }}

Example
------------
users$ = this.http.get('/users');
<div *ngFor="let user of users$ | async"></div>`;

routeGuardCode = `Route Guard
Purpose
------------
Protect Routes.

Types
------------
CanActivate
CanDeactivate
CanLoad

Interview Trap
------------
Authentication ≠ Authorization

Auth
------------
Logged In?

Authorization
------------
Has Permission?

Example
------------
canActivate(){
 return !!localStorage.getItem('token');
}`;

interceptorCode = `
HTTP Interceptor

Purpose
------------
Intercept every request.

Used For
------------
✔ JWT Token
✔ Logging
✔ Error Handling

Interview Trap
------------
Runs before request and after response.

Example
------------
intercept(req,next){
 const authReq =req.clone({
  setHeaders:{
   Authorization:'Bearer token'
  }
 });
 return next.handle(authReq);
}
`;

viewChildCode = `
ViewChild

Purpose
------------
Access DOM or Child Component.

Interview Trap
------------
ViewChild available only after:

ngAfterViewInit()

Example
------------
@ViewChild('search')
search!:ElementRef;

ngAfterViewInit(){
 this.search.nativeElement.focus();
}`;

angularTopics = [
  {
    title: 'Observable',
    code: this.observableCode
  },
  {
    title: 'Subject vs BehaviorSubject',
    code: this.behaviorSubjectCode
  },
  {
    title: 'switchMap',
    code: this.switchMapCode
  },
  {
    title: 'Reactive Forms',
    code: this.reactiveFormsCode
  },
  {
    title: 'FormArray',
    code: this.formArrayCode
  },
  {
    title: 'Change Detection',
    code: this.changeDetectionCode
  },
  {
    title: 'trackBy',
    code: this.trackByCode
  },
  {
    title: 'Async Pipe',
    code: this.asyncPipeCode
  },
  {
    title: 'Route Guard',
    code: this.routeGuardCode
  },
  {
    title: 'HTTP Interceptor',
    code: this.interceptorCode
  },
];


searchMachineCode = `
Search Autocomplete

Problem
------------
Search users while typing.

Core Snippet
------------
search$ = new Subject<string>();

search$
.pipe(
 debounceTime(500),
 distinctUntilChanged(),
 switchMap(text =>
   this.http.get(
    '/users?q='+text
   )
 )
)
.subscribe();

Implementation
------------
<input
 (input)="search$.next(
  $any($event.target).value
 )">

Interview Trap
------------
switchMap

Cancels previous API call.

Real Usage
------------
Amazon Search
Google Search
LinkedIn Search
`;
employeeFormCode = `
Employee Registration

Problem
------------
Add unlimited skills.

Core Snippet
------------
skills =
this.fb.array([]);

addSkill(){

 this.skills.push(
  this.fb.control('')
 );

}

Implementation
------------
<div formArrayName="skills">

 <input
  *ngFor="
   let skill of skills.controls;
   let i=index
  "
  [formControlName]="i">

</div>

Interview Trap
------------
Dynamic Fields

=> FormArray

Fixed Fields

=> FormGroup

Real Usage
------------
Employee Forms
Resume Builders
Profile Pages
`;

shoppingCartCode = `
Shopping Cart

Problem
------------
Global cart state.

Core Snippet
------------
cart$ =
new BehaviorSubject<any[]>(
 []
);

add(product:any){

 this.cart$.next([
  ...this.cart$.value,
  product
 ]);

}

Implementation
------------
this.cartService
.cart$
.subscribe(items=>{

 this.items = items;

});

Interview Trap
------------
BehaviorSubject

Stores latest state.

Subject

Loses previous state.

Real Usage
------------
Amazon
Flipkart
Myntra
`;

infiniteScrollCode = `
Infinite Scroll

Problem
------------
Load more data while scrolling.

Core Snippet
------------
page = 1;

loadMore(){

 this.api
 .getUsers(this.page++)
 .subscribe(data=>{

  this.users = [
   ...this.users,
   ...data
  ];

 });

}

Implementation
------------
IntersectionObserver

detects bottom element.

Interview Trap
------------
Append data

✔ Correct

Replace data

❌ Wrong

Real Usage
------------
Instagram
Facebook
Twitter
`;

jwtAuthCode = `
JWT Authentication

Problem
------------
Attach token automatically.

Core Snippet
------------
intercept(req,next){

 const authReq =
 req.clone({

  setHeaders:{
   Authorization:
   'Bearer ' + token
  }

 });

 return next.handle(
  authReq
 );

}

Implementation
------------
providers:[
 {
  provide:
  HTTP_INTERCEPTORS,

  useClass:
  AuthInterceptor,

  multi:true
 }
]

Interview Trap
------------
Token Logic

belongs in Interceptor

NOT every component

Real Usage
------------
Every Enterprise App
`;

routeGuardCodeImplement = `
Route Guard

Problem
------------
Protect routes.

Core Snippet
------------
canActivate(){

 return !!localStorage
 .getItem('token');

}

Implementation
------------
{
 path:'dashboard',
 canActivate:[
  AuthGuard
 ]
}

Interview Trap
------------
Authentication

≠ Authorization

Real Usage
------------
Admin Panels
Employee Portals
`;

fileUploadCode = `
File Upload

Problem
------------
Upload images/documents.

Core Snippet
------------
const formData =
new FormData();

formData.append(
 'file',
 file
);

this.http.post(
 '/upload',
 formData
);

Implementation
------------
<input
 type="file"
 (change)="upload($event)">

Interview Trap
------------
Use FormData

NOT JSON

Real Usage
------------
Resume Upload
Profile Images
Documents
`;

chatCode = `
Real Time Chat

Problem
------------
Instant messaging.

Core Snippet
------------
socket.on(
 'message',
 data => {

  this.messages.push(
   data
  );

 });

Implementation
------------
WebSocket
Socket.IO

Interview Trap
------------
Always unsubscribe
on destroy.

Real Usage
------------
WhatsApp
Slack
Teams
`;

kanbanCode = `
Kanban Board

Problem
------------
Move cards between columns.

Core Snippet
------------
onDrop(event){

 moveItemInArray(
  this.tasks,
  event.previousIndex,
  event.currentIndex
 );

}

Implementation
------------
Angular CDK
DragDropModule

Interview Trap
------------
Most companies expect
Angular CDK solution.

Real Usage
------------
Jira
Trello
Azure Boards
`;


typeaheadCacheCode = `
Typeahead Cache

Problem
------------
Avoid duplicate API calls.

Core Snippet
------------
cache =
new Map();

if(
 cache.has(search)
){

 return of(
  cache.get(search)
 );

}

Implementation
------------
Store response
inside cache map.

Interview Trap
------------
Most candidates build
search only.

Senior candidates

add caching.

Real Usage
------------
Google
Amazon
Netflix
`;

}
