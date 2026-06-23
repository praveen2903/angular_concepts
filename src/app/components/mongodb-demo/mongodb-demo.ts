import { Component } from '@angular/core';

@Component({
  selector: 'app-mongodb-demo',
  standalone: false,
  templateUrl: './mongodb-demo.html',
  styleUrl: './mongodb-demo.css',
})
export class MongodbDemo {
  sqlVsNosql = [
    
{
  title: 'SQL vs NoSQL',
  icon: '⚖️',

  purpose: `Understand why MongoDB exists and when NoSQL is preferred.`,

  input: `
Employee Data

ID
Name
Email
Skills`,

  query: `
SQL (PostgreSQL)
Table
  ↓
Rows
  ↓
Columns


NoSQL (MongoDB)
Database
  ↓
Collection
  ↓
Documents(JSON)
  `,

  output: `
SQL
employees
101 | John | john@gmail.com


MongoDB
{
  "_id": 101,
  "name": "John",
  "email": "john@gmail.com"
}  `,

  interview: `
SQL
----
Structured Data
Fixed Schema
Uses JOINs

NoSQL
------
Flexible Schema
JSON Documents
Scales Horizontally`
},
  ]
mongoDbSections = [


{
  title: 'Table vs Collection',
  icon: '📦',

  purpose: `
Understand SQL and MongoDB equivalents.
  `,

  query: `

SQL
----
Database
  ↓
Table
  ↓
Row


MongoDB
--------
Database
  ↓
Collection
  ↓
Document

  `,

  output: `

employees Table

↓

employees Collection

  `
},

{
  title: 'Row vs Document',
  icon: '📄',

  purpose: `
A MongoDB document is equivalent to a SQL row.
  `,

  input: `

SQL Row

101 | John | 50000

  `,

  query: `

{
  "_id": 101,
  "name": "John",
  "salary": 50000
}

  `,

  output: `

One SQL Row

=

One MongoDB Document

  `
},

{
  title: 'Schema in MongoDB',
  icon: '🏗️',

  purpose: `MongoDB does not require fixed schemas. Documents in same collection may differ.`,

  query: `
Document 1

{
  "name":"John",
  "salary":50000
}


Document 2
{
  "name":"Emma",
  "salary":70000,
  "city":"London"
}  `,

  output: `

Both Documents Valid

Same Collection

  `,

  interview: `

SQL

Fixed Schema


MongoDB

Flexible Schema

  `
},

{
  title: 'Create Database & Collection',
  icon: '🏢',

  purpose: `
Create database and collection.
  `,

  query: `
use companyDB
db.createCollection("employees")
  `,

  output: `Database Created
Collection Created  `
},
];
mongodbsections = [
  {
  title: 'INSERT (Create)',
  icon: '➕',

  purpose: `Insert documents into collection. Equivalent to SQL INSERT.`,

  input: `
John
50000
  `,

  query: `db.employees.insertOne({name:"John", salary:50000})`,

  output: `
{
 acknowledged:true,
 insertedId:ObjectId(...)
}`
},
{
  title: 'INSERT MANY',
  icon: '📚',

  purpose: `
Insert multiple documents at once.
  `,

  query: `

db.employees.insertMany([
{
  name:"John",
  salary:50000
},
{
  name:"Emma",
  salary:70000
}
])

  `,

  output: `

2 Documents Inserted

  `
},

{
  title: 'SELECT (Read)',
  icon: '🔍',

  purpose: `
Fetch documents from collection.
Equivalent to SQL SELECT.
  `,

  query: `

db.employees.find()

  `,

  output: `

John 50000

Emma 70000

Mike 90000

  `
},

{
  title: 'SELECT WHERE',
  icon: '🎯',

  purpose: `
Filter documents.
Equivalent to SQL WHERE.
  `,

  query: `

db.employees.find({
  salary:{$gt:60000}
})

  `,

  output: `

Emma 70000

Mike 90000

  `
},

{
  title: 'Projection',
  icon: '📑',

  purpose: `
Return only selected fields.
Equivalent to SQL column selection.
  `,

  query: `

db.employees.find(
 {},
 {
   name:1,
   salary:1,
   _id:0
 }
)

  `,

  output: `

{
 name:"John",
 salary:50000
}

  `
},

{
  title: 'UPDATE ONE',
  icon: '✏️',

  purpose: `
Update single document.
Equivalent to SQL UPDATE.
  `,

  query: `

db.employees.updateOne(
 {name:"John"},
 {
   $set:{
     salary:60000
   }
 }
)

  `,

  output: `

John

50000

↓

60000

  `
},

{
  title: 'UPDATE MANY',
  icon: '📝',

  purpose: `
Update multiple documents.
  `,

  query: `

db.employees.updateMany(
 {},
 {
   $inc:{
     salary:5000
   }
 }
)

  `,

  output: `
All Salaries Increased
  `
},

{
  title: 'DELETE ONE',
  icon: '🗑️',

  purpose: `Delete one document. Equivalent to SQL DELETE.`,

  query: `
db.employees.deleteOne(
 {name:"John"}
)
  `,

  output: `
1 Document Deleted`
},

{
  title: 'DELETE MANY',
  icon: '❌',

  purpose: `Delete multiple documents.`,

  query: `db.employees.deleteMany({salary:{$lt:50000}})`,

  output: `Low Salary Records Deleted`
},

{
  title: 'SQL CRUD vs Mongo CRUD',
  icon: '⚖️',

  purpose: `Compare common CRUD operations.`,

  query: `
SQL
INSERT INTO employees ...
SELECT * FROM employees
UPDATE employees ...
DELETE FROM employees ...

MongoDB
insertOne()
find()
updateOne()
deleteOne()
  `,

  output: `
Create → insertOne()
Read → find()
Update → updateOne()
Delete → deleteOne()`
},

{
  title: 'MongoDB Operators',
  icon: '🎯',

  purpose: `Used for filtering and updates. `,

  query: `
$gt   Greater Than
$lt   Less Than
$gte  Greater Than Equal
$lte  Less Than Equal
$eq   Equal
$ne   Not Equal
$in   IN
$nin  NOT IN
  `,

  output: `
db.employees.find({
 salary:{
   $gt:50000
 }
})  `
}
];

queries = [
    {
  title:'Get Employee By Id',
  icon:'🆔',

  route:`
GET /employees/101
  `,

  backend:`
app.get(
 '/employees/:id',
 async(req,res)=>{

  const employee =
  await Employee.findOne({
   employeeId:
   req.params.id
  });

  res.json(employee);

 });
  `,

  mongoDb:`
db.employees.findOne({
 employeeId:101
});
  `,

  sql:`
SELECT *
FROM employees
WHERE employee_id = 101;
  `,

  angularService:`
getEmployee(id:number){

 return this.http.get(
  \`/employees/\${id}\`
 );

}
  `,

  angularComponent:`
employee:any;

ngOnInit(){

 this.employeeService
 .getEmployee(101)
 .subscribe(res=>{

  this.employee = res;

 });

}
  `,

  react:`
const [employee,
setEmployee] =
useState(null);

useEffect(()=>{

 axios
 .get('/employees/101')
 .then(res=>{

  setEmployee(
   res.data
  );

 });

},[]);
  `,

  output:`
{
 employeeId:101,
 name:'John'
}
  `
},
{
  title: 'Get All Employees',
  icon: '👥',

  route:`
GET /employees
  `,

  backend:`
app.get('/employees', async(req,res)=>{
  const employees = await Employee.find();
  res.json(employees);
 }
);`,

  mongoDb:`db.employees.find();`,

  sql:`SELECT * FROM employees;`,

  angularService:`
getEmployees(){
 return this.http.get('/employees');
}`,

  angularComponent:`
employees:any[]=[];
ngOnInit(){
 this.employeeService.getEmployees().subscribe(res=>{
  this.employees = res;
 });
}
  `,

  react:`
const [employees, setEmployees] = useState([]);
useEffect(()=>{
  axios.get('/employees')
  .then(res=>{
    setEmployees(res.data);
  });
},[]);
  `,

  output:`
[
 {
  employeeId:101,
  name:'John',
  salary:50000
},
{
 employeeId:102,
 name:'Emma',
 salary:70000
}
]
  `
},
{
  title:'Create Employee',
  icon:'➕',

  route:`
POST /employees
  `,

  backend:`
app.post(
 '/employees',
 async(req,res)=>{

  const employee =
  await Employee.create(
   req.body
  );

  res.json(employee);

 });
  `,

  mongoDb:`
db.employees.insertOne({

 name:'John',
 salary:50000

});
  `,

  sql:`
INSERT INTO employees(
 name,
 salary
)
VALUES(
 'John',
 50000
);
  `,

  angularService:`
createEmployee(data:any){

 return this.http.post(
  '/employees',
  data
 );

}
  `,

  angularComponent:`
employee={
 name:'John',
 salary:50000
};

response:any;

save(){
 this.employeeService.createEmployee(this.employee).subscribe(res=>{
    this.response = res;
 });
}
  `,

  react:`
const [response, setResponse] = useState(null);

const employee={
 name:'John',
 salary:50000
};

const save=()=>{
 axios.post('/employees',employee).then(res=>{ 
    setResponse(res.data);
 });
};`,

  output:`{
 name:'John',
 salary:50000
}`
},
{
  title:'Pagination',
  icon:'📄',

  route:`
GET /employees?page=1
  `,

  backend:`
const page =
req.query.page;
  `,

  mongoDb:`
db.employees
.find()
.skip(0)
.limit(10);
  `,

  sql:`
SELECT *
FROM employees
LIMIT 10
OFFSET 0;
  `,

  angularService:`
getEmployees(page:number){

 return this.http.get(
  \`/employees?page=\${page}\`
 );

}
  `,

  angularComponent:`
employees:any[]=[];

ngOnInit(){

 this.employeeService
 .getEmployees(1)
 .subscribe(res=>{

  this.employees = res;

 });

}
  `,

  react:`
const [employees,
setEmployees] =
useState([]);

useEffect(()=>{

 axios
 .get(
  '/employees?page=1'
 )
 .then(res=>{

  setEmployees(
   res.data
  );

 });

},[]);
  `
},
{
  title:'Bearer Token',
  icon:'🔐',

  route:`
GET /profile
  `,

  backend:`
const token =
req.headers
.authorization;
  `,

  angularService:`
getProfile(){

 return this.http.get(
  '/profile',
  {
   headers:{
    Authorization:
    'Bearer ' +
    localStorage
    .getItem('token')
   }
  }
 );

}
  `,

  angularComponent:`
profile:any;

ngOnInit(){

 this.authService
 .getProfile()
 .subscribe(res=>{

  this.profile = res;

 });

}
  `,

  react:`
const [profile,
setProfile] =
useState(null);

useEffect(()=>{

 axios.get(
  '/profile',
  {
   headers:{
    Authorization:
    'Bearer ' +
    localStorage
    .getItem('token')
   }
  }
 )
 .then(res=>{

  setProfile(
   res.data
  );

 });

},[]);
  `
},
{
  title:'Update Employee',
  icon:'✏️',

  route:`
PUT /employees/101
  `,

  backend:`
app.put(
 '/employees/:id',
 async(req,res)=>{

  const employee =
  await Employee
  .findOneAndUpdate(
   {
    employeeId:
    req.params.id
   },
   req.body,
   {new:true}
  );

  res.json(employee);

 });
  `,

  mongoDb:`
db.employees.updateOne(
 {employeeId:101},
 {
  $set:{
   salary:70000
  }
 }
);
  `,

  sql:`
UPDATE employees
SET salary=70000
WHERE employee_id=101;
  `,

  angularComponent:`
update(){

 this.employeeService
 .updateEmployee(
  101,
  {
   salary:70000
  }
 )
 .subscribe(res=>{

  this.employee = res;

 });

}
  `,

  react:`
axios.put(
 '/employees/101',
 {
  salary:70000
 }
)
.then(res=>{

 setEmployee(
  res.data
 );

});
  `
},

]

httpInteview = `
========================================================
PUT VS PATCH
========================================================
PUT
--------------------------------------------------------
Updates Entire Resource

PATCH
--------------------------------------------------------
Updates Specific Fields
========================================================
PUT Request
--------------------------------------------------------
{
 name:"John",
 age:25,
 city:"Hyd"
}

========================================================
PATCH Request
--------------------------------------------------------
{
 city:"Vizag"
}

========================================================
Interview Trap
--------------------------------------------------------
PUT = Full Update
PATCH = Partial Update


========================================================
POST VS PUT
========================================================
POST
--------------------------------------------------------
Create New Resource

PUT
--------------------------------------------------------
Update Existing Resource

========================================================
POST
--------------------------------------------------------
POST /employees

========================================================
PUT
--------------------------------------------------------
PUT /employees/101

========================================================
Interview Trap
--------------------------------------------------------
POST Can Create Many
PUT Targets One Resource


========================================================
PUT VS PATCH EXAMPLE
========================================================

Existing Employee
--------------------------------------------------------

{
 id:101,
 name:"John",
 age:25,
 city:"Hyd"
}

========================================================

PUT
--------------------------------------------------------

{
 name:"Mike",
 age:30,
 city:"Vizag"
}

Result
--------------------------------------------------------

Entire Object Replaced

========================================================

PATCH
--------------------------------------------------------

{
 city:"Vizag"
}

Result
--------------------------------------------------------

Only City Changes

========================================================

Interview Trap
--------------------------------------------------------

PATCH Saves Bandwidth.

========================================================
200 VS 201
========================================================

200 OK
--------------------------------------------------------

Request Successful

Usually GET

PUT

PATCH

========================================================

201 CREATED
--------------------------------------------------------

Resource Created

Usually POST

========================================================

Interview Trap
--------------------------------------------------------

POST Should Return 201
Not 200

========================================================
200 VS 204
========================================================

200
--------------------------------------------------------

Returns Data

========================================================

204
--------------------------------------------------------

No Content

========================================================

Example
--------------------------------------------------------

DELETE /employees/101

204 No Content

========================================================

Interview Trap
--------------------------------------------------------

204 Response
Cannot Have Body.

========================================================
GET VS POST
========================================================

GET
--------------------------------------------------------

Fetch Data

========================================================

POST
--------------------------------------------------------

Send Data

========================================================

GET
--------------------------------------------------------

/users?page=1

========================================================

POST
--------------------------------------------------------

{
 name:"John"
}

========================================================

Interview Trap
--------------------------------------------------------

GET Should Not Modify Data.


========================================================
SAFE HTTP METHODS
========================================================

Safe Methods
--------------------------------------------------------

GET

HEAD

OPTIONS

========================================================

Unsafe Methods
--------------------------------------------------------

POST

PUT

PATCH

DELETE

========================================================

Interview Trap
--------------------------------------------------------

Safe Means

No Data Modification.


========================================================
DELETE VS SOFT DELETE
========================================================

DELETE
--------------------------------------------------------

Remove Record

========================================================

SOFT DELETE
--------------------------------------------------------

Mark As Deleted

========================================================

Example
--------------------------------------------------------

isDeleted=true

========================================================

Interview Trap
--------------------------------------------------------

Most Real Projects
Use Soft Delete.


========================================================
req.params VS req.query
========================================================

req.params
--------------------------------------------------------

Required Resource

/users/101

========================================================

req.query
--------------------------------------------------------

Optional Filters

/users?page=1

========================================================

Interview Trap
--------------------------------------------------------

params = Identity

query = Filters


========================================================
401 VS 403
========================================================

401
--------------------------------------------------------

Not Logged In

========================================================

403
--------------------------------------------------------

Logged In

No Permission

========================================================

Interview Trap
--------------------------------------------------------

401 = Authentication

403 = Authorization


========================================================
res.send VS res.json
========================================================

res.send()
--------------------------------------------------------

Any Response

========================================================

res.json()
--------------------------------------------------------

JSON Response

========================================================

Interview Trap
--------------------------------------------------------

For APIs

Prefer res.json()



========================================================
Bearer Token VS Cookie
========================================================

Bearer Token
--------------------------------------------------------

Stored In

LocalStorage

SessionStorage

========================================================

Cookie
--------------------------------------------------------

Stored By Browser

Automatically Sent

========================================================

Bearer Header
--------------------------------------------------------

Authorization:
Bearer token

========================================================

Cookie
--------------------------------------------------------

token=abc123

========================================================

Interview Trap
--------------------------------------------------------

httpOnly Cookie

Cannot Be Read
By JavaScript.


========================================================
req.body VS req.headers
========================================================

req.body
--------------------------------------------------------

Payload Data

========================================================

req.headers
--------------------------------------------------------

Metadata

========================================================

Body
--------------------------------------------------------

{
 name:"John"
}

========================================================

Headers
--------------------------------------------------------

Authorization:
Bearer token

========================================================

Interview Trap
--------------------------------------------------------

Token Usually
Lives In Headers.



========================================================
URL STRUCTURE
========================================================

/employees/101
?department=IT
&page=1

========================================================

req.params
--------------------------------------------------------

101

========================================================

req.query.department
--------------------------------------------------------

IT

========================================================

req.query.page
--------------------------------------------------------

1

========================================================

Interview Trap
--------------------------------------------------------

Everything After ?

Becomes Query Params.`

idempotentMethods = `
========================================================
WHAT IS IDEMPOTENCY?
========================================================

Definition
--------------------------------------------------------

An Operation Is Idempotent

If Executing It Multiple Times

Produces Same Final State.

========================================================

Example
--------------------------------------------------------

Light Switch OFF

OFF

↓

OFF

↓

OFF

========================================================

Final State
--------------------------------------------------------

Still OFF

========================================================

Result
--------------------------------------------------------

Idempotent

========================================================
WHY IS IDEMPOTENCY IMPORTANT?
========================================================

Problem
--------------------------------------------------------

Network Timeout

User Double Click

Browser Retry

Load Balancer Retry

========================================================

Without Idempotency
--------------------------------------------------------

Duplicate Orders

Duplicate Payments

Duplicate Users

Duplicate Emails

========================================================

With Idempotency
--------------------------------------------------------

Only One Action Happens.

========================================================

Interview Answer
--------------------------------------------------------

Protects Against
Duplicate Requests.

========================================================
GET IS IDEMPOTENT
========================================================

Request
--------------------------------------------------------

GET /employees/101

========================================================

1 Time
--------------------------------------------------------

Returns John

========================================================

100 Times
--------------------------------------------------------

Returns John

========================================================

Database
--------------------------------------------------------

No Changes

========================================================

Result
--------------------------------------------------------

Idempotent

========================================================
PUT IS IDEMPOTENT
========================================================

Request
--------------------------------------------------------

PUT /employees/101

{
 salary:50000
}

========================================================

1 Time
--------------------------------------------------------

salary=50000

========================================================

10 Times
--------------------------------------------------------

salary=50000

========================================================

Final State
--------------------------------------------------------

Same

========================================================

Result
--------------------------------------------------------

Idempotent

========================================================
PATCH IS USUALLY IDEMPOTENT
========================================================

Request
--------------------------------------------------------

PATCH /employees/101

{
 city:"Vizag"
}

========================================================

1 Time
--------------------------------------------------------

city=Vizag

========================================================

100 Times
--------------------------------------------------------

city=Vizag

========================================================

Final State
--------------------------------------------------------

Same

========================================================

Result
--------------------------------------------------------

Idempotent

========================================================
PATCH CAN BE NON IDEMPOTENT
========================================================

Request
--------------------------------------------------------

PATCH /employees/101

{
 incrementSalary:1000
}

========================================================

1 Time
--------------------------------------------------------

50000

↓

51000

========================================================

2 Times
--------------------------------------------------------

51000

↓

52000

========================================================

Final State
--------------------------------------------------------

Changes Every Call

========================================================

Result
--------------------------------------------------------

Not Idempotent

========================================================
DELETE IS IDEMPOTENT
========================================================

Request
--------------------------------------------------------

DELETE /employees/101

========================================================

1 Time
--------------------------------------------------------

Employee Removed

========================================================

10 Times
--------------------------------------------------------

Employee Still Missing

========================================================

Final State
--------------------------------------------------------

Deleted

========================================================

Result
--------------------------------------------------------

Idempotent


========================================================
POST IS NOT IDEMPOTENT
========================================================

Request
--------------------------------------------------------

POST /employees

{
 name:"John"
}

========================================================

1 Time
--------------------------------------------------------

Creates Record

========================================================

2 Times
--------------------------------------------------------

Creates Another Record

========================================================

Final State
--------------------------------------------------------

Different

========================================================

Result
--------------------------------------------------------

Not Idempotent





========================================================
POST PAYMENT EXAMPLE
========================================================

POST /payment

{
 amount:1000
}

========================================================

1 Click
--------------------------------------------------------

₹1000 Charged

========================================================

Double Click
--------------------------------------------------------

₹2000 Charged

========================================================

Problem
--------------------------------------------------------

Duplicate Payment

========================================================

Result
--------------------------------------------------------

Non Idempotent


========================================================
IDEMPOTENCY KEY
========================================================

Purpose
--------------------------------------------------------

Prevent Duplicate Requests.

========================================================

Request Header
--------------------------------------------------------

Idempotency-Key:
abc123

========================================================

Flow
--------------------------------------------------------

Request 1

↓

Process Payment

↓

Store Key

========================================================

Request 2

Same Key

↓

Return Old Result

========================================================

Interview Trap
--------------------------------------------------------

Used In Payment APIs.


========================================================
HTTP METHODS TABLE
========================================================

GET
--------------------------------------------------------
Idempotent ✅

PUT
--------------------------------------------------------
Idempotent ✅

DELETE
--------------------------------------------------------
Idempotent ✅

PATCH
--------------------------------------------------------
Usually ✅

POST
--------------------------------------------------------
No ❌

========================================================

Most Interview Answer
--------------------------------------------------------

GET
PUT
DELETE

Always Idempotent

POST

Never Idempotent

PATCH

Depends On Logic

========================================================
HOW TO MAKE POST IDEMPOTENT?
========================================================

Problem
--------------------------------------------------------

POST /payments

{
 amount:1000
}

========================================================

User Clicks Twice
--------------------------------------------------------

Request 1

Request 2

========================================================

Result
--------------------------------------------------------

₹2000 Charged

========================================================

Solution
--------------------------------------------------------

Use Idempotency Key.

========================================================

Header
--------------------------------------------------------

Idempotency-Key:
PAY123

========================================================

Store Key
--------------------------------------------------------

PAY123

Already Processed?

========================================================

Yes
--------------------------------------------------------

Return Old Response

========================================================

No
--------------------------------------------------------

Process Payment

Store Key

========================================================

Result
--------------------------------------------------------

POST Becomes Idempotent.

========================================================
IDEMPOTENCY KEY FLOW
========================================================

Client
--------------------------------------------------------

POST /payment

Idempotency-Key:
abc123

========================================================

Server
--------------------------------------------------------

Check Database

========================================================

Key Exists?
--------------------------------------------------------

YES

↓

Return Previous Response

========================================================

NO

↓

Process Request

↓

Store Key

↓

Return Response

========================================================

Interview Trap
--------------------------------------------------------

Many Payment Gateways
Use This Pattern.

========================================================
WHERE TO STORE IDEMPOTENCY KEYS?
========================================================

Options
--------------------------------------------------------

Database

Redis

Cache

========================================================

Common
--------------------------------------------------------

Redis

========================================================

Why?
--------------------------------------------------------

Fast Lookup

Automatic Expiry

========================================================

Example
--------------------------------------------------------

abc123

→

Payment Success

========================================================

Future Request
--------------------------------------------------------

Same Key

↓

Return Cached Result

========================================================
WHAT HAPPENS IF API
IS NOT IDEMPOTENT?
========================================================

Scenario
--------------------------------------------------------

User Clicks

Pay Now

Twice

========================================================

Request 1
--------------------------------------------------------

₹1000 Charged

========================================================

Request 2
--------------------------------------------------------

₹1000 Charged Again

========================================================

Result
--------------------------------------------------------

₹2000 Charged

========================================================

Business Impact
--------------------------------------------------------

Money Loss

Customer Complaints

Refund Requests

========================================================
CAN CREATE API
BE IDEMPOTENT?
========================================================

Normal POST
--------------------------------------------------------

POST /users

========================================================

Request 1
--------------------------------------------------------

User Created

========================================================

Request 2
--------------------------------------------------------

Another User Created

========================================================

Not Idempotent
--------------------------------------------------------

Duplicate Records

========================================================

Solution
--------------------------------------------------------

Use Unique Identifier

Email

Phone

External Id

Idempotency Key

========================================================
IDEMPOTENT VS SAFE
========================================================

SAFE
--------------------------------------------------------

Does Not Modify Data

========================================================

IDEMPOTENT
--------------------------------------------------------

May Modify Data

But Final State Same

========================================================

GET
--------------------------------------------------------

Safe ✅

Idempotent ✅

========================================================

PUT
--------------------------------------------------------

Safe ❌

Idempotent ✅

========================================================

DELETE
--------------------------------------------------------

Safe ❌

Idempotent ✅

========================================================

POST
--------------------------------------------------------

Safe ❌

Idempotent ❌

========================================================

Interview Trap
--------------------------------------------------------

Safe

≠

Idempotent


========================================================
INTERVIEW TRAP
========================================================

Question
--------------------------------------------------------

DELETE Removes Data.

How Can It Be Idempotent?

Answer
--------------------------------------------------------

Because Idempotency Checks

Final State

Not Action Count.

========================================================

DELETE 1 Time
--------------------------------------------------------

Resource Missing

========================================================

DELETE 100 Times
--------------------------------------------------------

Resource Missing

========================================================

Final State Same

Therefore

Idempotent ✅
========================================================
INTERVIEW QUESTION
========================================================

Q:
Can POST Be Idempotent?

========================================================

A:
Yes.

By Default

POST Is Not Idempotent.

But Using

Idempotency Keys

Unique Request IDs

Deduplication Logic

POST Can Be Made
Idempotent.


========================================================
HOW AMAZON/STRIPE
HANDLE PAYMENTS?
========================================================

Client Generates

Unique Key

========================================================

Example
--------------------------------------------------------

payment_123

========================================================

Every Retry
--------------------------------------------------------

Uses Same Key

========================================================

Server
--------------------------------------------------------

Checks Key

========================================================

If Exists
--------------------------------------------------------

Returns Existing Result

========================================================

If Missing
--------------------------------------------------------

Processes Payment

========================================================

Result
--------------------------------------------------------

No Double Charge

========================================================
HOW TO IMPLEMENT
IN NODEJS EXPRESS?
========================================================

Middleware
--------------------------------------------------------

const key =
req.headers[
 'idempotency-key'
];

========================================================

Check Redis
--------------------------------------------------------

const existing =
await redis.get(key);

========================================================

Exists?
--------------------------------------------------------

return res.json(
 JSON.parse(existing)
);

========================================================

Else
--------------------------------------------------------

Process Request

Store Response

========================================================

Save
--------------------------------------------------------

await redis.set(
 key,
 JSON.stringify(result)
);`

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