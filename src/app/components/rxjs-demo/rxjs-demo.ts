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
    this.subject.next(5000);  //observer emits data
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
const userSubject = new BehaviorSubject<string>('Guest');  -- inital value
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
Observable

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

Example
------------
const observable = new Observable(observer => {
  observer.next('Angular');
  observer.next('React');
  observer.complete();
});

observable.subscribe(data => console.log(data));`;

ofCode = `
of()

What Is It?
------------
Creates an Observable from static values.

JavaScript Equivalent
------------
const skills = [
  'Angular',
  'React',
  'Node'
];

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
  return of([
    { id: 1, name: 'Praveen' }
  ]);
}

Example
------------
of('Angular', 'React', 'Node')
.subscribe(data => console.log(data));

Output
------------
Angular
React
Node`;
fromCode = `
from()

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
const skills = [
  'Angular',
  'React'
];

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
from([
  'Angular',
  'React'
])
.subscribe(data => console.log(data));

Output
------------
Angular
React
`;
mapCode = `
map()

What Is It?
------------
Transforms each emitted value.

JavaScript Equivalent
------------
users.map(user => ({
  ...user,
  active: true
}));

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
of(1,2,3)
.pipe(
  map(value => value * 10)
)
.subscribe(console.log);

Output
------------
10
20
30
`;

filterCode = `
filter()

What Is It?
------------
Filters unwanted values.

JavaScript Equivalent
------------
users.filter(
 user => user.age > 18
);

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
of(1,2,3,4,5)
.pipe(
  filter(value => value > 2)
)
.subscribe(console.log);

Output
------------
3
4
5
`;

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

subject.subscribe(
 data => console.log(data)
);

subject.next('Hello');

Output
------------
Hello
if other event subscribed this hello is lost
`;

behaviorCode = `
BehaviorSubject

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
`;

debounceCode = `
debounceTime()

JavaScript Equivalent
------------
setTimeout()

Purpose
------------
Wait before firing request.

distinctUntilChanged()

Purpose
------------
Ignore duplicate values.

switchMap()

Purpose
------------
Cancel previous request.

Used In
------------
✔ Search Bars
✔ Auto Complete
✔ Live Filters

Example
------------
searchSubject.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  switchMap(value =>
    this.http.get(
      '/users?q=' + value
    )
  )
);

Problem Solved
------------
P
Pr
Pra
Prav
Praveen

Without switchMap
------------
5 API Calls

With switchMap
------------
1 API Call
`;

forkJoinCode = `
forkJoin()

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
 users:
  this.http.get('/users'),

 products:
  this.http.get('/products'),

 orders:
  this.http.get('/orders')
});

Output
------------
All responses together.
`;

mergeMapCode = `
mergeMap()

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
of(1,2,3)
.pipe(
 mergeMap(id =>
  this.http.get(
   '/users/' + id
  )
 )
);

Output
------------
All responses.

Order?
------------
Not Guaranteed
`;

concatMapCode = `
concatMap()

JavaScript Equivalent
------------
for await...
or sequential async/await

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
of(1,2,3)
.pipe(
 concatMap(id =>
  this.http.get(
   '/users/' + id
  )
 )
);

Output
------------
User1
User2
User3

Order?
------------
Guaranteed
`;

combineLatestCode = `
combineLatest()

Purpose
------------
Combine latest values from
multiple observables.

Used In
------------
Filters
Dashboard Widgets
Live Data

Example
------------
combineLatest([
 user$,
 role$
]);

Output
------------
['Praveen','Admin']

Whenever either value changes,
new output is emitted.
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
destroy$ =
 new Subject<void>();

interval(1000)
.pipe(
 takeUntil(
  destroy$
 )
)
.subscribe();

ngOnDestroy() {
 destroy$.next();
 destroy$.complete();
}
`;


}