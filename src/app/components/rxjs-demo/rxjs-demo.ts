import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, of, from, interval, Subject, BehaviorSubject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-demo',
  templateUrl: './rxjs-demo.html',
  standalone: false,
  styleUrls: ['./rxjs-demo.css']
})
export class RxjsDemo implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  observableData: any[] = [];
  subjectData:any ;
  behaviorData:any;
  searchText = '';
  results: string[] = [];

  users = [
    'Praveen',
    'Sai',
    'Ravi',
    'Kiran',
    'Krishna',
    'Ramesh',
    'Vamsi',
    'Suresh',
    'Mahesh'
  ];

  private searchSubject = new Subject<string>();
  private subject = new Subject<number>();
  private behaviorSubject = new BehaviorSubject<string>('Initial Value');

  ngOnInit(): void {
    this.observableExample();
    this.ofExample();
    this.fromExample();
    this.intervalExample();
    this.subjectExample();
    this.behaviorSubjectExample();
    this.searchExample();
  }

  // Observable
  observableExample() {
    const observable = new Observable(observer => {
      observer.next(50000);
      observer.next(6000);
      observer.next(7000);
      observer.complete();
    });

    observable.subscribe(value => {
      this.observableData.push(value);
    });
  }

  ObservableDemo = ` observableData: any[] = [];
  observableExample() {
    const observable = new Observable(observer => {
      observer.next(50000);
      observer.next(6000);
      observer.next(7000);
      observer.complete();
    });

    observable.subscribe(value => {
      this.observableData.push(value);
    });
  }

  <li *ngFor="let item of observableData">
    {{ item }}
  </li>
`
  // of()
  ofExample() {
    of('Java', 'Spring', 'Angular').subscribe(value => {
      console.log('of()', value);
    });
  }

  // from()
  fromExample() {
    from(['HTML', 'CSS', 'JS']).subscribe(value => {
      console.log('from()', value);
    });
  }

  // interval()
  intervalExample() {
    interval(1000).pipe(takeUntil(this.destroy$)).subscribe(value => {
        console.log('Interval', value);
      });
  }

  // Subject
  subjectExample() {
    this.subject.subscribe(data => {
      this.subjectData = data;
    });
  }

  sendSubjectValue() {
    this.subject.next(5000);
  }

  subjectDemo =`subjectData:any;  //works as observable recieve data
  private subject = new Subject<number>();   //works as observer emits data

  subjectExample() {
    this.subject.subscribe(data => {  //observable recieves data
      this.subjectData = data;
    });
  }

  sendSubjectValue() {
    this.subject.next(5000);  //observer emits data -- if next other value added this will be lost
  }
    
<button (click)="sendSubjectValue()">
  Send Subject Value
</button>

<p>{{ subjectData }}</p>`;

subjectvsBehavioursubject = `SUBJECT vs BEHAVIORSUBJECT
==========================================================
Problem with Subject
----------------------------------------------------------
Subject only sends data to CURRENT subscribers.
If a value is emitted before a component subscribes, that value is lost forever.

Timeline
----------------------------------------------------------
Subject
next('Praveen')
      ↓
      LOST

subscribe()
      ↓
Receives Nothing

Example
----------------------------------------------------------
const userSubject = new Subject<string>();
userSubject.next('Praveen');
userSubject.subscribe(value => {
  console.log(value);
});

Output
----------------------------------------------------------
Nothing

Reason
----------------------------------------------------------
The subscription happened AFTER the value was emitted.
Subject does NOT store previous values.


Real Angular Problem
==========================================================
Auth Service

login() {
  authSubject.next(true);
}

Navbar Component

ngOnInit() {
  authSubject.subscribe(value => {
    this.isLoggedIn = value;
  });
}

Problem
----------------------------------------------------------
User logs in
      ↓
authSubject.next(true)
      ↓
Navbar loads later
      ↓
Navbar receives nothing

Current login state is lost.

One-Line Interview Answer
==========================================================

Subject emits values only to current subscribers.

BehaviorSubject remembers the latest value and
immediately provides it to new subscribers, making it
ideal for state management and component communication.`

behaviourSubjectDemo = `Solution: BehaviorSubject
==========================================================
BehaviorSubject stores the latest value.
Every new subscriber immediately receives the most recent value.

Timeline
----------------------------------------------------------
BehaviorSubject(false)

next(true)
      ↓
Stored internally

subscribe()
      ↓
Immediately gets true

Example
----------------------------------------------------------
const userSubject = new BehaviorSubject<string>('Guest');  -- inital value Default never lost

userSubject.next('Praveen');
userSubject.subscribe(value => {
  console.log(value);
});

Output
----------------------------------------------------------
Praveen

Why BehaviorSubject is Preferred
==========================================================
State must be remembered.

Examples
----------------------------------------------------------
✓ Logged In User
✓ Theme (Dark / Light)
✓ Shopping Cart Count
✓ Current Language
✓ Selected Employee
✓ Dashboard Filters
✓ Shared Data Between Components
✓ User Profile


Interview Question
==========================================================
When should you use Subject?
----------------------------------------------------------
Events
Button Clicked
Modal Opened
Notification Triggered
Refresh Data Event
Anything where old values are NOT important.


When should you use BehaviorSubject?
----------------------------------------------------------
Application State
Login State
Theme State
Cart State
Current User

Shared Component Data. Anything where the latest value must be remembered.`
  // BehaviorSubject
  behaviorSubjectExample() {
    this.behaviorSubject.subscribe(value => {
      this.behaviorData = value;
    });
  }

  updateBehaviorSubject() {
    this.behaviorSubject.next('Updated Value');
  }

  behaviourSubjectExample =`private behaviorSubject = new BehaviorSubject<string>('Initial Value');
  behaviorSubjectExample() {
    this.behaviorSubject.subscribe(value => {
      this.behaviorData = value;
    });
  }

  updateBehaviorSubject() {
    this.behaviorSubject.next('Updated Value');  //if others comes this get replaced but initial value stays, advantage
  }`
  // Search Example
  searchExample() {
    this.searchSubject.pipe( debounceTime(500), distinctUntilChanged(), switchMap(searchTerm => {
      // console.log('API Call =>', searchTerm);
      const filteredUsers = this.users.filter(user =>
        user.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return of(filteredUsers).pipe(delay(1000));

    }), takeUntil(this.destroy$)).subscribe(users => {
      this.results = users;
    });
  }

  search() {
     this.searchSubject.next(this.searchText);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  rxjsSearchDemo=`searchText = '';
results: string[] = [];

users = [
  'Praveen',
  'Sai',
  'Ravi',
  'Kiran',
  'Krishna',
  'Ramesh',
  'Vamsi',
  'Suresh',
  'Mahesh'
];

private searchSubject = new Subject<string>();
ngOnInit(){
    this.searchExample();
}
searchExample() {
  this.searchSubject.pipe( debounceTime(500), distinctUntilChanged(), switchMap(searchTerm => {
    // console.log('API Call =>', searchTerm);
    const filteredUsers = this.users.filter(user =>
      user.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredUsers).pipe(delay(1000));

  }), takeUntil(this.destroy$)).subscribe(users => {
    this.results = users;
  });
}

search() {
  this.searchSubject.next(this.searchText);
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}`

rxjsSearchDemoHtml =`<div style="display: flex; gap:20px">
  <input type="text" [(ngModel)]="searchText" placeholder="Search..."  (keyup.enter)="search()" />
  <button (click)="search()">Search</button>

  <input type="text" [(ngModel)]="searchText" (input)="search()" placeholder="search...">
</div>
<ul>
  <li *ngFor="let user of results">
    {{ user }}
  </li>
</ul>`;
 observableCode = `
Observables (emit (observer) using .next (generally stream data generated by service http request) + receive (observable) subscribe)

What Is It?
------------
Base building block of RxJS.

Purpose
------------
Creates a stream of data over time.

Used In
------------
✔ Services
✔ Components
✔ Custom Event Streams
✔ WebSocket Streams

Why Angular Uses It?
------------
HttpClient returns Observable.

Example--without httpclient
------------
const observable = new Observable(observer => {
  observer.next('Angular');
  observer.next('React');
  observer.complete();
});

observable.subscribe(data => console.log(data));`;

ofCode = `of()

What Is It?
------------
Creates an Observable (recieve) from static values.

JavaScript Equivalent
------------
const skills = ['Angular', 'React', 'Node'];
skills.forEach(console.log);

Purpose
------------
Convert static values into Observable.

Used In
------------
✔ Services
✔ Guards
✔ Resolvers
✔ Mock APIs
✔ Unit Tests

Real Angular Example
------------
getUsers() {
  return of([{ id: 1, name: 'Praveen' }]);
}

Example
------------
of('Angular', 'React', 'Node').subscribe(data => console.log(data));

Output
------------
Angular
React
Node`;
fromCode = `from()

What Is It?
------------
Converts existing data into Observable.

Can Convert
------------
✔ Array
✔ Promise
✔ Set
✔ Iterable

JavaScript Equivalent
------------
const skills = ['Angular','React'];
skills.forEach(console.log);

Purpose
------------
Convert existing structure into stream.

Used In
------------
✔ Promise To Observable
✔ Array Streams
✔ Async Data Conversion

Example
------------
from(['Angular','React']).subscribe(data => console.log(data));

Output
------------
Angular
React
`;
mapCode = `map()

What Is It?
------------
Transforms each emitted value.

JavaScript Equivalent
------------
users.map(user => ({...user, active: true}));

Purpose
------------
Modify data before UI.

Used In
------------
✔ API Response Transformation
✔ Formatting Data
✔ DTO Mapping

Example
------------
of(1,2,3).pipe(map(value => value * 10)).subscribe(console.log);
pipe() is the mechanism that connects RxJS operators to an Observable and allows operator chaining.

Output
------------
10
20
30
`;

filterCode = `filter()

What Is It?
------------
Filters unwanted values.

JavaScript Equivalent
------------
users.filter(user => user.age > 18);

Purpose
------------
Keep matching values only.

Used In
------------
✔ Search Results
✔ Permissions
✔ Active Records

Example
------------
of(1,2,3,4,5).pipe(filter(value => value > 2)).subscribe(console.log);

Output
------------
3
4
5`;

subjectCode = `Subject

What Is It?
------------
Event broadcaster.

Purpose
------------
Send data to multiple listeners.

Used In
------------
✔ Component Communication
✔ Refresh Events
✔ Notifications

Example
------------
const subject = new Subject<string>();
subject.subscribe(data => console.log(data));  //observable
subject.next('Hello'); //observer emit data

Output
------------
Hello
if other event subscribed this hello is lost

Angular example:
const buttonClick$ = new Subject<string>();
// Listener 1
buttonClick$.subscribe(value => {
  console.log('Analytics:', value);
});
// Listener 2
buttonClick$.subscribe(value => {
  console.log('UI Update:', value);
});

// Event Trigger
buttonClick$.next('Login Button Clicked');
buttonClick$.next('Logout Button Clicked');

output:
Analytics: Login Button Clicked
UI Update: Login Button Clicked
Analytics: Logout Button Clicked
UI Update: Logout Button Clicked


Example2: Most common as subject used for events

searchSubject = new Subject<string>();

ngOnInit() {
  this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {console.log('API Call:', value);});
}

onSearch(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.searchSubject.next(value);
}
  
<input type="text" (input)="onSearch($event)" placeholder="Search..."/>


Subject
-------
Subscriber joins late
❌ Does NOT receive previous values

BehaviorSubject
---------------
Subscriber joins late
✅ Receives latest value immediately



import { Subject } from 'rxjs';

const user$ = new Subject<string>();

// Component A subscribes
user$.subscribe(user => {
  console.log('Header:', user);
});

user$.next('Sai');

// Component B loads later
user$.subscribe(user => {
  console.log('Profile:', user);
});

output:
Header: Sai
Profile:      (sai is missed for other subscribe)`;

behaviorCode = `BehaviorSubject

What Is It?
------------
Subject with memory.

Purpose
------------
Stores latest value.

Used In
------------
✔ Login User State
✔ Theme State
✔ Shopping Cart
✔ Global Store

Why Industry Loves It?
------------
New subscriber immediately gets latest value.

Example
------------
const user$ = new BehaviorSubject('Guest');
user$.next('Praveen');

Output
------------
Guest
Praveen

import { BehaviorSubject } from 'rxjs';

const user$ = new BehaviorSubject<string>('Guest');

// Component A subscribes
user$.subscribe(user => {
  console.log('Header:', user);
});

user$.next('Sai');

// Component B loads later
user$.subscribe(user => {
  console.log('Profile:', user);
});

output:
Header: Guest
Header: Sai
Profile: Sai


usage of Behaviour subject : maintain auth state/ login/role to save some value for state
--------------------------------------------------------
import { BehaviorSubject } from 'rxjs';

const isLoggedIn$ = new BehaviorSubject<boolean>(false);

// Subscriber 1
isLoggedIn$.subscribe(value => {
  console.log('Navbar:', value);
});

isLoggedIn$.next(true); // User logs in

// Subscriber 2 joins later
isLoggedIn$.subscribe(value => {
  console.log('Profile Page:', value);
});

output:
Navbar: false
Navbar: true

Profile Page: true


Example 2:
--------------
cartCount$ = new BehaviorSubject<number>(0);

cartCount$.next(1);
cartCount$.next(2);
cartCount$.next(3);

// New subscriber
cartCount$.subscribe(value => {
  console.log(value);
});
cartCount$.subscribe(value => {
  console.log(value);
});
output: 3   3 //value not lost for other event
`;

debounceCode = `SEARCH OPTIMIZATION IN RXJS
══════════════════════════════
Operators
------------
debounceTime(500)
→ Waits 500ms after the user stops typing.

distinctUntilChanged()
→ Ignores consecutive duplicate values.

switchMap()
→ Cancels the previous API request and keeps only the latest one.

Why Needed?
------------
Without optimization, every keystroke triggers an API request.

User Types
------------
P
Pr
Pra
Prav
Prave
Praveen

Without RxJS Operators
------------
P        → API Call #1
Pr       → API Call #2
Pra      → API Call #3
Prav     → API Call #4
Prave    → API Call #5
Praveen  → API Call #6

Result:
❌ Too many API calls
❌ Server load increases
❌ Unnecessary network traffic

Example
------------
this.searchSubject.pipe( debounceTime(500), distinctUntilChanged(), switchMap(value =>
    this.http.get('/users?q=' + value)
  )
).subscribe();

Execution Flow
------------
User Types:
P → Pr → Pra → Prav → Praveen

debounceTime(500)
------------
Waits until user stops typing.

Only: Praveen moves forward.

distinctUntilChanged()
------------
Praveen
Praveen
Praveen

Only first value passes.

switchMap()
------------
Search: "Pra"     → API Call Started
Search: "Prav"    → Previous Call Cancelled
Search: "Prave"   → Previous Call Cancelled
Search: "Praveen" → Only This Call Completes

Result
------------
✔ Only latest search result shown
✔ Old requests automatically cancelled
✔ Better performance
✔ Cleaner user experience

Common Use Cases
------------
✔ Search Bars
✔ Auto Complete
✔ Product Filters
✔ User Lookup
✔ Typeahead Search
✔ Live Suggestions

Interview One-Liner
------------
debounceTime: Wait before sending request.

distinctUntilChanged: Ignore duplicate values.

switchMap: Cancel old request and process only the latest request.
`;

forkJoinCode = ` forkJoin()

JavaScript Equivalent
------------
Promise.all()

Purpose
------------
Wait for all requests.

Used In
------------
Dashboard Loading
Profile Page
Reports

Example
------------
forkJoin({
  users: this.http.get('/users'),
  posts: this.http.get('/posts'),
  comments: this.http.get('/comments')
}).subscribe(result => {
  console.log(result.users);
  console.log(result.posts);
  console.log(result.comments);
});

Output
------------
All responses together.

forkJoin()
------------
Runs multiple Observables in parallel and waits for ALL of them to complete.

Returns: One final result containing all responses.

Use When
------------
✔ Load dashboard data
✔ Multiple independent API calls
✔ Need all responses before rendering

Important
------------
❌ If one API fails, forkJoin fails.
❌ No result until all complete.`;

mergeMapCode = `mergeMap()

JavaScript Equivalent
------------
Promise.all()

Purpose
------------
Execute requests in parallel.

Used In
------------
Bulk Updates
Bulk Downloads

Example
------------
from([1,2,3]).pipe(mergeMap(id =>
    this.http.get('/users/' + id)
  )
).subscribe(user => {
  console.log(user);
});

Output
------------
All responses.

Order?
------------
Not Guaranteed

Output
------------
User 2
User 1
User 3

Order not guaranteed.

Important
------------
✔ Faster parallel processing
✔ Multiple results emitted
❌ Order may change
❌ Can create many concurrent requests

Example Scenario
------------
Need Dashboard Data?
Users API
Posts API
Comments API

Use: forkJoin()
-------------------------------
Need User Details For Each ID?
IDs: [1,2,3,4,5]

Use: mergeMap()`;

concatMapCode = `concatMap()

JavaScript Equivalent
------------
for await...
or sequential async/await (mergeMap()+ order guaranteed)

Purpose
------------
Run requests one by one.

Used In
------------
Payment Processing
File Upload Queue
Order Processing

Example
------------
of(1,2,3).pipe(concatMap(id =>
  this.http.get('/users/' + id)
 )
);

Output
------------
User1
User2
User3

Example 2:
-----------------
from(['withdraw', 'updateBalance', 'sendNotification']).pipe(
  concatMap(action => this.apiCall(action))
).subscribe();
output:
---------
sendNotification completed
withdraw completed
updateBalance completed

Order?
------------
Guaranteed

mergeMap
--------
Need maximum speed. Order doesn't matter.

concatMap
---------
Need sequence. Order matters.

switchMap
---------
Need only latest request.

exhaustMap
----------
Ignore repeated clicks while one request is running.`;

combineLatestCode = `combineLatest()

Purpose
------------
Combine latest values from multiple observables.

Used In
------------
Filters
Dashboard Widgets
Live Data

Example
------------
combineLatest([user$,role$]);

Output
------------
['Praveen','Admin']

Whenever either value changes, new output is emitted.
`;

takeUntilCode = `
takeUntil()

Purpose
------------
Auto unsubscribe.

Why Needed?
------------
Angular components are destroyed.
Subscriptions remain alive.
This creates memory leaks.

Used In
------------
✔ ngOnDestroy()
✔ interval()
✔ WebSocket
✔ Long Running Streams

Example
------------
destroy$ = new Subject<void>();
interval(1000).pipe(takeUntil(destroy$)).subscribe();

ngOnDestroy() {
 destroy$.next();
 destroy$.complete();
}`;
tapDemo =`tap() is used to perform side effects without changing the data flowing through the Observable.
Think of it as:
"Look at the value and do something, but don't modify it."

Example
of(1, 2, 3).pipe( tap(value => console.log('Before:', value)), map(value => value * 10)).subscribe(console.log);

Output:
Before: 1
10
Before: 2
20
Before: 3
30

Notice:
tap() logs the value.
map() transforms the value.
tap() does not affect the stream.


mainly used to set loading states before fetch loading true after it is false`
searchComponentService=`import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchUsers(term: string): Observable<User[]> {
    return this.http.get<User[]>(
      \`https://jsonplaceholder.typicode.com/users?name_like=\${term}\`
    );
  }
}`
searchComponentTs = `import { Component, OnInit } from '@angular/core';
import {Subject, Observable, of} from 'rxjs';
import {debounceTime,distinctUntilChanged, switchMap, catchError, tap} from 'rxjs/operators';
import {SearchService,User} from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  searchSubject = new Subject<string>();
  users$!: Observable<User[]>;
  loading = false;
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.users$ = this.searchSubject.pipe(debounceTime(500), distinctUntilChanged(), tap(() => this.loading = true),
      switchMap(term =>  this.searchService.searchUsers(term).pipe(catchError(() => of([])))),
      tap(() => this.loading = false)
    );
  }

  search(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }
}`
searchComponentHtml =`<h2>User Search</h2>
<input type="text" placeholder="Search User..." (input)="search($event)" />

<div *ngIf="loading">Loading...</div>
<ul>
  <li *ngFor="let user of users$ | async">
    {{ user.name }} - {{ user.email }}
  </li>
</ul>`
}