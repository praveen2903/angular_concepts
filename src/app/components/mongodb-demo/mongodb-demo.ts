import { Component } from '@angular/core';

@Component({
  selector: 'app-mongodb-demo',
  standalone: false,
  templateUrl: './mongodb-demo.html',
  styleUrl: './mongodb-demo.css',
})
export class MongodbDemo {

  findUsage = `Use find() when your goal is to extract matching documents exactly as they are stored, or with minor omissions. It is the most readable and standard approach for CRUD applications.

-> Basic Filtering: Fetching documents matching a direct condition (e.g., finding an active user by email).

-> Field Projection: Selecting or excluding specific fields to reduce network payload (e.g., returning only names and IDs).

->Standard Pagination: Applying basic .sort(), .skip(), and .limit() modifiers onto the returned database cursor.

->Low Overhead Tasks: Maximizing raw speed for basic queries because find() skips the internal pipelin0e execution machinery.


Example:   // Simple, fast retrieval with sorting and pagination
db.products.find({ category: "electronics", price: { $lt: 1000 } }, { name: 1, price: 1, _id: 0 })
.sort({ price: -1 })
.limit(10);`;
  
  aggregateUsage = `Use aggregate() when data must be combined, restructured, or calculated on the database server before sending it to your application. The MongoDB Aggregation Pipeline processes records sequentially through distinct stages.

-> Data Grouping & Metrics: Calculating sums, averages, mins, maxes, or counts across groups of documents (equivalent to SQL GROUP BY).

-> Collection Joins: Performing relational-like left outer joins with other collections via the $lookup stage.

-> Creating Computed Fields: Generating new fields on the fly using existing document properties via $addFields or $project.

-> Flattening Arrays: Deconstructing an array field within a document to output a distinct row for each item via $unwind.

-> Complex Data Reports: Constructing multi-step analytics pipelines for financial reporting, dashboards, or data tracking
  
Example:

  db.orders.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: "$region", totalRevenue: { $sum: "$amount" } } },
    { $sort: { totalRevenue: -1 } }
  ]);`

  sqlVsNosql = [
    
{
  title: 'SQL vs NoSQL',
  icon: '⚖️',

  purpose: `Understand why MongoDB exists and when NoSQL is preferred.`,

  input: `Employee Data

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
Documents(JSON)`,

  output: `
SQL
employees
Id  | Name | Email
__________________________
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
-> Structured Data
-> Fixed Schema
-> Uses JOINs

NoSQL
------
-> Flexible Schema
-> JSON Documents
-> Scales Horizontally`
},
  ]
mongoDbSections = [


{
  title: 'Table vs Collection',
  icon: '📦',

  purpose: `Understand SQL and MongoDB equivalents.`,

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
Document`,

  output: `
employees Table
    ↓
employees Collection`
},

{
  title: 'Row vs Document',
  icon: '📄',

  purpose: `A MongoDB document is equivalent to a SQL row.`,

  input: `
SQL Row
Id  | Name | Salary
--------------------
101 | John | 50000
-------------------- `,

  query: `
{
  "_id": 101,
  "name": "John",
  "salary": 50000
}`,

  output: `One SQL Row= One MongoDB Document`
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

  output: `Both Documents Valid Same Collection`,

  interview: `
SQL --> Fixed Schema

MongoDB-> Flexible Schema`
},

{
  title: 'Create Database & Collection',
  icon: '🏢',

  purpose: `Create database and collection.`,

  query: `
use companyDB
db.createCollection("employees")
  `,

  output: `Database Created & Collection Created`
},
];
mongodbsections = [
  {
  title: 'INSERT (Create)',
  icon: '➕',

  purpose: `Insert documents into collection. Equivalent to SQL INSERT.`,

  input: `John 
  50000`,

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

  purpose: `Insert multiple documents at once.`,

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
])  `,

  output: `2 Documents Inserted`
},

{
  title: 'SELECT (Read)',
  icon: '🔍',

  purpose: `Fetch documents from collection. Equivalent to SQL SELECT.`,

  query: `db.employees.find()  `,

  output: `
John 50000
Emma 70000
Mike 90000  `
},

{
  title: 'SELECT WHERE',
  icon: '🎯',

  purpose: `Filter documents. Equivalent to SQL WHERE.`,

  query: `db.employees.find({
  salary:{$gt:60000}
})
  
or 

db.employees.aggregate([
  {
    $match: {
      salary: {
        $gt: 60000
      }
    }
  }
]);`,

  output: `
Emma 70000
Mike 90000  `
},

{
  title: 'Projection',
  icon: '📑',

  purpose: `Return only selected fields. Equivalent to SQL column selection.`,

  query: `
db.employees.find({},
 {
   name:1,
   salary:1,
   _id:0
 }
)
 db.employees.find(); -- gives all`,

  output: `
{
 name:"John",
 salary:50000
}`
},

{
  title: 'UPDATE ONE',
  icon: '✏️',

  purpose: `Update single document. Equivalent to SQL UPDATE.`,

  query: `
db.employees.updateOne({name:"John"},
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
60000`
},

{
  title: 'UPDATE MANY',
  icon: '📝',

  purpose: `Update multiple documents.`,

  query: `
db.employees.updateMany({},
 {
   $inc:{
     salary:5000
   }
 }
)`,

  output: `All Salaries Increased  `
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
find() / aggregate()
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
}) 
 or
 db.employees.aggregate([
  {
    $match: {
      salary: {
        $gt: 50000
      }
    }
  }
]); `
}
];
mongoConcepts = [
{
  title:'$match',
  icon:'🎯',

  purpose:`
Filters documents.
Equivalent to SQL WHERE clause.
`,

  sql:`
SELECT *
FROM employees
WHERE salary > 50000;
`,

  mongodb:`
db.employees.find({
  salary:{
    $gt:50000
  }
})

OR (same but aggregate is more used for multiple operations and neater consistent purpose)
db.employees.aggregate([
{
  $match:{
    salary:{
      $gt:50000
    }
  }
}
]);
`,

  output:`[
 {
  name:'David',
  salary:70000
 }
]`,

  interviewPoint:` --> Usually first stage in aggregation pipeline.`
},

{
  title:'$project',
  icon:'📋',

  purpose:`
Select specific fields.
Equivalent to SQL SELECT columns.
`,

  sql:`
SELECT name, salary
FROM employees;
`,

  mongodb:`
db.employees.aggregate([
{
  $project:{
    _id:0,
    name:1,
    salary:1
  }
}
]);`,

  output:`
[
 {
  name:'John',
  salary:50000
 }
]
`,

  interviewPoint:`--> 1 = Include field,  0 = Exclude field`
},

{
  title:'$group',
  icon:'📊',

  purpose:`
Groups documents.
Equivalent to SQL GROUP BY.
`,

  sql:`
SELECT department, COUNT(*) as totalEmployees
FROM employees
GROUP BY department;`,

  mongodb:`
db.employees.aggregate([
{
  $group:{
    _id:'$department',
    totalEmployees:{
      $sum:1
    }
  }
}]);`,

  output:`
[
 {
  _id:'IT',
  totalEmployees:2
 }
]`
},

{
  title:'$sort',
  icon:'🔀',

  purpose:`Sort documents. Equivalent to ORDER BY.`,

  sql:`
SELECT *
FROM employees
ORDER BY salary DESC;`,

  mongodb:`
db.employees.aggregate([
{
  $sort:{
    salary:-1
  }
}
]);`,

  output:`
David
Sara
John
Mike
`
},

{
  title:'$limit',
  icon:'✂️',

  purpose:`
Returns first N records.
Equivalent to LIMIT.
`,

  sql:`
SELECT *
FROM employees
LIMIT 5;
`,

  mongodb:`
db.employees.aggregate([
{
  $limit:5
}
]);
`
},

{
  title:'$skip',
  icon:'⏭️',

  purpose:`Skips records. Equivalent to OFFSET.`,

  sql:`
SELECT *
FROM employees
LIMIT 10 OFFSET 20;
`,

  mongodb:`
db.employees.aggregate([
{
  $skip:20
},
{
  $limit:10
}
]);

or 
db.employees.find({}).skip(20).limit(10);
`
},

{
  title:'$unwind',
  icon:'📂',

  purpose:`Converts array items into individual documents.`,

  sampleDocument:`
{
 name:'John',
 skills:[
  'React',
  'Node',
  'MongoDB'
 ]
}
`,

  mongodb:`
db.employees.aggregate([
{
  $unwind:'$skills'
}
]);
`,

  output:`
{
 name:'John',
 skills:'React'
}
{
 name:'John',
 skills:'Node'
}
{
 name:'John',
 skills:'MongoDB'
}`
},

{
  title:'$lookup',
  icon:'🔗',

  purpose:`Performs JOIN. Equivalent to SQL INNER JOIN.`,

  sql:`
SELECT e.name, d.departmentName
FROM employees e
JOIN departments d
ON e.departmentId=d.id;
`,

  mongodb:`
db.employees.aggregate([
{
 $lookup:{
  from:'departments',
  localField:'departmentId',
  foreignField:'_id',
  as:'departmentInfo'
 }
}
]);
`
},

{
  title:'$addFields',
  icon:'➕',

  purpose:`
Creates new fields.
`,

  sql:`SELECT name, salary, salary * 12 AS yearlySalary
FROM employees;`,

  mongodb:`
db.employees.aggregate([
{
 $addFields:{
  yearlySalary:{
   $multiply:['$salary', 12]
  }
 }
}
]);
`
},

{
  title:'$count',
  icon:'🔢',

  purpose:`
Counts documents. Equivalent to COUNT(*).
`,

  sql:`
SELECT COUNT(*)
FROM employees;
`,

  mongodb:`
db.employees.aggregate([
{
 $count:'totalEmployees'
}
]);
`
},

{
  title:'$facet',
  icon:'📦',

  purpose:`Run multiple aggregations in a single query.`,

  mongodb:`
db.employees.aggregate([
{
 $facet:{
  totalEmployees:[
   {
    $count:'count'
   }
  ],
  salaries:[
   {
    $group:{
     _id:null,
     total:{$sum:'$salary'}
    }
   }
  ]
 }
}
]);
`,

  interviewPoint:`--> One query, multiple reports.`
},

{
  title:'Text Search',
  icon:'🔍',

  purpose:`
Search text quickly.
`,

  mongodb:`
db.employees.find({
 $text:{
  $search:'react'
 }
});
`,

  output:`
Returns documents
containing react.
`
},

{
  title:'Regex Search',
  icon:'📝',

  purpose:`Pattern matching.`,

  mongodb:`
db.employees.find({name:/^Jo/});
`,

  output:`
John
Joseph
Jordan
`
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
app.get('/employees/:id', async(req,res)=>{
  const employee = await Employee.findOne({employeeId: req.params.id});
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
 return this.http.get(\`/employees/\${id}\`);
}
  `,

  angularComponent:`
employee:any;
ngOnInit(){
 this.employeeService.getEmployee(101).subscribe(res=>{
    this.employee = res;
 });
}`,

  react:`
const [employee,setEmployee] = useState(null);

useEffect(()=>{
 axiosget('/employees/101').then(res=>{
  setEmployee(res.data);
 });
},[]);`,

  output:`
{
 employeeId:101,
 name:'John'
}`
},
{
  title: 'Get All Employees',
  icon: '👥',

  route:`GET /employees`,

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
app.post('/employees', async(req,res)=>{
  const employee = await Employee.create(req.body);
  res.json(employee);
 });
  `,

  mongoDb:`
db.employees.insertOne({
 name:'John',
 salary:50000
});
  `,
  sql:`INSERT INTO employees(name, salary) VALUES('John', 50000);`,

  angularService:`
createEmployee(data:any){
 return this.http.post('/employees', data);
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

const employee={name:'John', salary:50000};

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

  route:`GET /employees?page=1`,

  backend:`const page = req.query.page;`,

  mongoDb:`db.employees.find().skip(0).limit(10);`,

  sql:`SELECT *
FROM employees
LIMIT 10 OFFSET 0;`,

  angularService:`
getEmployees(page:number){
 return this.http.get(\`/employees?page=\${page}\`);
}
  `,

  angularComponent:`
employees:any[]=[];

ngOnInit(){
 this.employeeService.getEmployees(1).subscribe(res=>{
    this.employees = res;
 });
}`,

  react:`
const [employees,setEmployees] = useState([]);

useEffect(()=>{
 const fetchData = async (): Promise<void> => {
  try {
    const res = await axios.get('/employees?page=1');
    setEmployees(res.data);
  } catch (error) {
    console.log(error);
  }
  }
  fetchData();
},[]);
  `
},
{
  title:'Bearer Token',
  icon:'🔐',

  route:`GET /profile`,

  backend:`const token = req.headers.authorization;`,

  angularService:`
getProfile(){
 return this.http.get('/profile',{headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token')
   }
  }
 );
}
  `,

  angularComponent:`
profile:any;
ngOnInit(){
 this.authService.getProfile().subscribe(res=>{
  this.profile = res;
 });
}
  `,

  react:`const [profile,setProfile] =useState(null);

useEffect(()=>{

 axios.get('/profile', {
   headers:{
    Authorization:'Bearer ' + localStorage.getItem('token')
   }
  }
 ).then(res=>{
  setProfile(res.data);
 });
},[]);`
},
{
  title:'Update Employee',
  icon:'✏️',

  route:`
PUT /employees/101
  `,

  backend:`
app.put('/employees/:id', async(req,res)=>{
  const employee = await Employee.findOneAndUpdate({ employeeId:req.params.id }, req.body, {new:true});
  res.json(employee);
 });
  `,

  mongoDb:`
db.employees.updateOne({employeeId:101},
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

 this.employeeService.updateEmployee(101,{salary:70000}).subscribe(res=>{
  this.employee = res;
 });
}
  `,

  react:`
axios.put('/employees/101',{salary:70000}).then(res=>{
 setEmployee(res.data);
});  `
},

]
httpInterviewSections = [
  {
    title: 'PUT vs PATCH',
    explanation:
      'PUT updates the entire resource while PATCH updates only specific fields of a resource.',
    points: [
      'PUT = Full Update',
      'PATCH = Partial Update',
      'PATCH generally sends less data'
    ],
    example: {
      put: `{
  name: "John",
  age: 25,
  city: "Hyderabad"
}`,
      patch: `{
  city: "Vizag"
}`
    },
    interviewTrap: 'PUT replaces the complete resource whereas PATCH modifies only selected fields.'
  },

  {
    title: 'POST vs PUT',
    explanation:
      'POST is commonly used to create resources. PUT is used to update or replace a specific resource.',
    points: [
      'POST creates resources',
      'PUT updates resources',
      'POST can create multiple records',
      'PUT targets a specific resource'
    ],
    example: {
      post: 'POST /employees',
      put: 'PUT /employees/101'
    },
    interviewTrap:
      'POST can create many resources. PUT usually targets one known resource.'
  },

  {
    title: '200 vs 201 Status Codes',
    explanation:
      'Both indicate success but represent different outcomes.',
    points: [
      '200 OK = Request Successful',
      '201 Created = New Resource Created',
      'POST generally returns 201'
    ],
    interviewTrap:
      'Creating a resource should typically return 201 instead of 200.'
  },

  {
    title: '401 vs 403',
    explanation:
      'These status codes are frequently confused in interviews.',
    points: [
      '401 = Authentication Failed',
      'User is not logged in',
      '403 = Authorization Failed',
      'User is logged in but lacks permission'
    ],
    interviewTrap:
      '401 means who are you? 403 means I know who you are but you cannot access this resource.'
  },

  {
    title: 'req.params vs req.query',
    explanation:
      'Used for retrieving values from the URL.',
    points: [
      'req.params identifies a specific resource',
      'req.query provides filtering, sorting, paging options'
    ],
    example: {
      params: '/users/101',
      query: '/users?page=1'
    },
    interviewTrap:
      'params = Identity, query = Filters'
  },

  {
    title: 'Bearer Token vs Cookie',
    explanation:
      'Both are used for authentication but are handled differently.',
    points: [
      'Bearer Token stored manually',
      'Sent through Authorization header',
      'Cookies are managed by the browser',
      'Cookies are automatically sent with requests'
    ],
    interviewTrap:
      'HttpOnly cookies cannot be accessed through JavaScript.'
  },

  {
  title: 'Idempotency',

  explanation: `
PUT /employees/101

Request Body
------------
{
   "salary":70000
}

1st Request
------------
Salary = 70000

2nd Request
------------
Salary = 70000

3rd Request
------------
Salary = 70000

Final State
-----------
Salary = 70000

Even if the request is executed multiple times,
the final state remains the same.
`,

  points: [
    'GET is idempotent',
    'PUT is idempotent',
    'DELETE is idempotent',
    'POST is not idempotent by default'
  ],

  interviewTrap:
    'Idempotency checks the final state, not how many times the operation executes.'
},

{
  title: 'How to Make POST Idempotent',

  explanation: ` Without Idempotency keys   
const express = require("express");
const app = express();
app.use(express.json());

const payments = [];
app.post("/payments", (req, res) => {
    const payment = {
        id: payments.length + 1,
        amount: req.body.amount
    };
    payments.push(payment);
    res.json(payment);
});

app.listen(3000);


POST /payments

Request-1:
{
    "amount":1000
}

Response-1:
{
    "id":1,
    "amount":1000
}

Request-2:
POST /payments

{
    "amount":1000
}

Response -2:
{
    "id":2,
    "amount":1000
}
________________________________________
with Idempotency key

const express = require("express");
const app = express();
app.use(express.json());

const payments = [];
const processedRequests = new Map();

app.post("/payments", (req, res) => {
    const key = req.header("Idempotency-Key");

    // Already processed
    if (processedRequests.has(key)) {
        return res.json(processedRequests.get(key));
    }

    // Create payment
    const payment = {
        id: payments.length + 1,
        amount: req.body.amount
    };

    payments.push(payment);

    // Store response
    processedRequests.set(key, payment);
    res.json(payment);
});
app.listen(3000);

Request -1
POST /payments

Idempotency-Key: PAY123

{
    "amount":1000
}

response:1
{
    "id":1,
    "amount":1000
}

request -2:
POST /payments

Idempotency-Key: PAY123

{
    "amount":1000
}

response-2
{
    "id":1,
    "amount":1000
}

Retry with Same Key
-------------------
POST /payments

Idempotency-Key: PAY123

Server checks PAY123

✓ Already Processed

Returns Previous Response

No Duplicate Payment Created.
`,

  points: [
    'Client generates unique key',
    'Server stores the key',
    'Repeated requests return previous response',
    'Common in payment APIs'
  ],

  example: {
    header: 'Idempotency-Key: PAY123'
  },

  interviewTrap:
    'Stripe and many payment gateways use Idempotency Keys to prevent duplicate charges.'
},

{
  title: 'Safe vs Idempotent',

  explanation: `
GET /employees/101

Request 1
---------
Reads Employee

Request 2
---------
Reads Employee

Request 3
---------
Reads Employee

Database Never Changes

----------------------------

PUT /employees/101

{
   "salary":70000
}

Request 1
---------
Salary = 70000

Request 2
---------
Salary = 70000

Request 3
---------
Salary = 70000

Data Changed Once, But Final State Remains Same.


when does idempotent key changes
User clicks Pay
        │
        ▼
Generate PAY123
        │
        ▼
Send Request
        │
        ▼
Timeout
        │
        ▼
Retry
        │
Use PAY123 Again
        │
        ▼
Server Returns Previous Response

----------------------------------

User starts another payment
        │
        ▼
Generate PAY456
        │
        ▼
New Payment Created
`,

  points: [
    'Safe = Does not modify data',
    'Idempotent = Final state remains same',
    'GET is Safe and Idempotent',
    'PUT is Idempotent but not Safe',
    'DELETE is Idempotent but not Safe'
  ],

  interviewTrap:
    'Safe ≠ Idempotent'
}
];
mongoVsSqlSections = [
{
  title: 'SELECT ALL RECORDS',
  sql: `SELECT * FROM employees;`,
  mongodb: `db.employees.find({})`,
},

{
  title: 'WHERE CONDITION',

  sql: `SELECT * FROM employees WHERE salary > 50000; `,

  mongodb: `db.employees.find({ salary: { $gt: 50000 }})`
},

{
  title: 'AND CONDITION',

  sql: `SELECT * FROM employees WHERE department='IT' AND salary > 50000;`,

  mongodb: `db.employees.find({department:'IT', salary:{ $gt:50000 }})`
},

{
  title: 'OR CONDITION',

  sql: `SELECT * FROM employees WHERE department='IT' OR department='HR';`,

  mongodb: `db.employees.find({
  $or:[ { department:'IT' }, { department:'HR' }]
})`
},

{
  title: 'IN OPERATOR',

  sql: ` SELECT * FROM employees WHERE city IN ('Hyderabad','Vizag');`,

  mongodb: `
db.employees.find({
  city:{$in:['Hyderabad','Vizag']}
})
`
},

{
  title: 'NOT IN OPERATOR',
  sql: `SELECT * FROM employees WHERE city NOT IN ('Hyderabad');`,

  mongodb: `db.employees.find({
  city:{$nin:['Hyderabad']}
})`
},

{
  title: 'ORDER BY ASC',

  sql: `SELECT * FROM employees ORDER BY salary ASC; `,

  mongodb: `db.employees.find().sort({salary:1})`
},

{
  title: 'ORDER BY DESC',

  sql: `SELECT * FROM employees ORDER BY salary DESC;`,

  mongodb: `db.employees.find().sort({salary:-1})`
},

{
  title: 'LIMIT',

  sql: ` SELECT * FROM employees LIMIT 5;`,

  mongodb: `db.employees.find().limit(5)`
},

{
  title: 'COUNT',

  sql: `SELECT COUNT(*) FROM employees;`,

  mongodb: `db.employees.countDocuments()`
},

{
  title: 'SUM SALARY',

  sql: `SELECT SUM(salary) FROM employees;`,

  mongodb: `db.employees.aggregate([
  {
    $group:{
      _id:null,
      totalSalary:{$sum:'$salary'}
    }
  }
])`
},

{
  title: 'AVERAGE SALARY',

  sql: `
SELECT AVG(salary) FROM employees;
`,

  mongodb: `db.employees.aggregate([
{
  $group:{
    _id:null,
    avgSalary:{$avg:'$salary'}
  }
}]`
},

{
  title: 'MAX SALARY',

  sql: `SELECT MAX(salary) FROM employees;`,

  mongodb: `
db.employees.aggregate([
{
  $group:{
    _id:null,
    maxSalary:{$max:'$salary'}
  }
}
])
`
},

{
  title: 'MIN SALARY',

  sql: `
SELECT MIN(salary) FROM employees;
`,

  mongodb: `
db.employees.aggregate([
{
  $group:{
    _id:null,
    minSalary:{$min:'$salary'}
  }
}
])
`
},

{
  title: 'GROUP BY DEPARTMENT',

  sql: `SELECT department, COUNT(*) FROM employees GROUP BY department;`,

  mongodb: `
db.employees.aggregate([
{
  $group:{
    _id:'$department',
    totalEmployees:{ $sum:1 }
  }
}
])`
},

{
  title: 'GROUP BY + SUM',

  sql: `
SELECT department, SUM(salary) FROM employees
GROUP BY department;`,

  mongodb: `
db.employees.aggregate([
{
  $group:{
    _id:'$department',
    totalSalary:{$sum:'$salary'}
  }
}
])
`
},

{
  title: 'HAVING CLAUSE (MATCH -- where/having)',

  sql: `
SELECT department, COUNT(*) FROM employees
GROUP BY department
HAVING COUNT(*) > 1;
`,

  mongodb: `
db.employees.aggregate([
{
  $group:{
    _id:'$department',
    count:{$sum:1}
  }
},
{
  $match:{count:{ $gt:1 }}
}
])
`
},

{
  title: 'MATCH + GROUP + SORT',

  sql: `
SELECT department, SUM(salary) totalSalary
FROM employees
WHERE salary > 50000
GROUP BY department
ORDER BY totalSalary DESC;`,

  mongodb: `
db.employees.aggregate([
{
  $match:{salary:{ $gt:50000 }}
},
{
  $group:{
    _id:'$department',
    totalSalary:{$sum:'$salary'}
  }
},
{
  $sort:{totalSalary:-1}
}
])
`
},

{
  title: 'LIKE / REGEX STARTS WITH',

  sql: `
SELECT * FROM employees
WHERE name LIKE 'J%';
`,

  mongodb: `
db.employees.find({
  name:/^J/
})
`
},

{
  title: 'LIKE / REGEX CONTAINS',

  sql: `
SELECT * FROM employees
WHERE name LIKE '%ohn%';
`,

  mongodb: `
db.employees.find({
  name:/ohn/
})
`
},

{
  title: 'DISTINCT',

  sql: `
SELECT DISTINCT department FROM employees;
`,

  mongodb: `
db.employees.distinct(
  'department'
)
`
},

{
  title: 'JOIN / LOOKUP',

  sql: `
SELECT e.name, d.departmentName
FROM employees e
INNER JOIN departments d
ON e.departmentId=d.id;
`,

  mongodb: `
db.employees.aggregate([
{
  $lookup:{
    from: 'departments',
    localField: 'departmentId',
    foreignField: '_id',
    as: 'departmentInfo'
  }
}
])
`
},

{
  title: 'UNION --removes duplicates',

  sql: `
SELECT name FROM employees
UNION
SELECT name FROM managers;
`,

  mongodb: `
db.employees.aggregate([
{
  $unionWith:{coll:'managers'}
}
])
`
},
{
  title: 'PROJECT (SELECT SPECIFIC COLUMNS)',

  sql: `
SELECT name, salary FROM employees;
`,

  mongodb: `
db.employees.aggregate([
{
  $project:{
    _id:0,    
-- id is primary identifier so needed to specify it but not showing put 0 if showing 1
    
    name:1,
    salary:1
  }
}
])
`
},

{
  title: 'PROJECT WITH ALIAS',

  description:
    'Rename fields in the output.',

  sql: `
SELECT name AS employeeName, salary AS employeeSalary
FROM employees;
`,

  mongodb: `
db.employees.aggregate([
{
  $project:{
    _id:0,
    employeeName:'$name',
    employeeSalary:'$salary'
  }
}
])
`
},

{
  title: 'PROJECT CALCULATED FIELD',

  description:
    'Create new fields during query execution.',

  sql: `
SELECT name, salary, salary + 5000 AS bonusSalary
FROM employees;
`,

  mongodb: `
db.employees.aggregate([
{
  $project:{
    name:1,
    salary:1,
    bonusSalary:{$add:['$salary',5000]}
  }
}
])
`
},

{
  title: 'UNWIND ARRAY',

  sql: `
-- Similar to splitting rows
-- No direct SQL equivalent like partition of sql
`,

  mongodb: `
db.employees.aggregate([
{
  $unwind:'$skills'
}
])
`
},

{
  title: 'MATCH + PROJECT',

  sql: `SELECT name, salary
FROM employees
WHERE salary > 50000;
`,

  mongodb: `
db.employees.aggregate([
{
  $match:{salary:{ $gt:50000 }}
},
{
  $project:{
    _id:0,
    name:1,
    salary:1
  }
}
])
`
},

{
  title: 'COUNT USING AGGREGATION',

  sql: `SELECT COUNT(*) FROM employees;`,

  mongodb: `
db.employees.aggregate([
{
  $count:'totalEmployees'
}
])
`
},

{
  title: 'GROUP BY + AVG',

  description:
    'Average salary department wise.',

  sql: `
SELECT department, AVG(salary)
FROM employees
GROUP BY department;
`,

  mongodb: `
db.employees.aggregate([
{
  $group:{
    _id: '$department',
    averageSalary: {$avg:'$salary'}
  }
}
])
`
},

{
  title: 'GROUP BY + MAX',


  sql: `
SELECT department,  MAX(salary)
FROM employees
GROUP BY department;
`,

  mongodb: `
db.employees.aggregate([
{
  $group:{
    _id:'$department',
    maxSalary:{$max:'$salary'}
  }
}
])
`
},

{
  title: 'GROUP BY + MIN',

  description:
    'Lowest salary department wise.',

  sql: `
SELECT department, MIN(salary)
FROM employees
GROUP BY department;
`,

  mongodb: `
db.employees.aggregate([
{
  $group:{
    _id:'$department',
    minSalary:{$min:'$salary'}
  }
}
])
`
},

{
  title: 'MULTIPLE SORTING',

  sql: `SELECT * FROM employees
ORDER BY department ASC, salary DESC;
`,

  mongodb: `
db.employees.find().sort({
  department:1,
  salary:-1
})
`
},

{
  title: 'EXISTS',


  sql: `
SELECT * FROM employees
WHERE email IS NOT NULL;
`,

  mongodb: `
db.employees.find({
  email:{$exists:true}
})
`
},

{
  title: 'NULL CHECK',

  description:
    'Find null values.',

  sql: `
SELECT * FROM employees
WHERE email IS NULL;
`,

  mongodb: `
db.employees.find({
  email:null
})
`
},

{
  title: 'BETWEEN',

  description:
    'Salary between two values.',

  sql: `
SELECT * FROM employees
WHERE salary BETWEEN 40000 AND 70000;
`,

  mongodb: `
db.employees.find({
  salary:{$gte:40000, $lte:70000}
})
`
},

{
  title: 'NOT EQUAL',

  sql: `
SELECT * FROM employees
WHERE department <> 'IT';
`,

  mongodb: `
db.employees.find({
  department:{$ne:'IT'}
})
`
},

{
  title: 'TEXT SEARCH',

  sql: `
SELECT * FROM employees
WHERE description LIKE '%react%';
`,

  mongodb: `
db.employees.find({
  $text:{ $search:'react' }
})
`
},

{
  title: 'TEXT SEARCH MULTIPLE WORDS',

  description:
    'Search multiple keywords.',

  sql: `
SELECT * FROM employees
WHERE description LIKE '%react%' 
OR description LIKE '%node%';
`,

  mongodb: `
db.employees.find({
  $text:{$search:'react node'}
})
`
},

{
  title: 'REGEX CASE INSENSITIVE',

  sql: `
SELECT * FROM employees
WHERE LOWER(name) LIKE 'john%';
`,

  mongodb: `
db.employees.find({
  name:{ $regex:'^john', $options:'i'}
})
`
},

{
  title: 'ADD NEW FIELD',

  sql: `SELECT *, salary * 12 AS yearlySalary FROM employees;`,

  mongodb: `
db.employees.aggregate([
{
  $addFields:{
    yearlySalary:{ $multiply:['$salary', 12]}
  }
}
])
`
},

{
  title: 'REMOVE FIELD',

  sql: `SELECT name, salary FROM employees;`,

  mongodb: `
db.employees.aggregate([
{
  $unset:['age', 'city']
}
])
`
},

{
  title: 'CASE WHEN / CONDITIONAL',

  sql: `
SELECT name, CASE WHEN salary > 60000
THEN 'Senior' ELSE 'Junior' END AS level
FROM employees;
`,

  mongodb: `
db.employees.aggregate([
{
  $project:{
    name:1,
    level:{
      $cond:{
        if:{$gt:['$salary', 60000]},
        then:'Senior',
        else:'Junior'
      }
    }
  }
}
])
`
}
];
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