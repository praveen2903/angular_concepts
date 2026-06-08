import { Component } from '@angular/core';

@Component({
  selector: 'app-node-js',
  standalone: false,
  templateUrl: './node-js.html',
  styleUrl: './node-js.css',
})
export class NodeJs {
  nodeExpressInterview = [
{
title:'NodeJS Introduction',
code:`
What Is NodeJS?
---------------
JavaScript Runtime Built On Chrome V8 Engine.

Purpose
---------------
Run JavaScript Outside Browser.

Used For
---------------
REST APIs
WebSockets
Microservices
Streaming
Real-Time Apps

Flow
---------------
Request
   ↓
Node Runtime
   ↓
Event Loop
   ↓
Response

Interview Trap
---------------
NodeJS Is NOT Framework.
NodeJS Is Runtime.
`
},

{
title:'ExpressJS Introduction',
code:`
What Is ExpressJS?
------------------
Backend Framework Built On NodeJS.

Purpose
------------------
Simplifies API Development.

Used For
------------------
Routing
Middleware
Authentication
REST APIs

Flow
------------------
Request
   ↓
Middleware
   ↓
Route
   ↓
Response

Interview Trap
------------------
Express Cannot Run Without NodeJS.
`
},

{
title:'NodeJS vs ExpressJS',
code:`
NodeJS
---------------
Runtime

ExpressJS
---------------
Framework

NodeJS
---------------
Handles Execution

ExpressJS
---------------
Handles Routing

NodeJS
---------------
Can Work Alone

ExpressJS
---------------
Needs NodeJS

Interview Answer
---------------
NodeJS Runs JavaScript.
Express Builds APIs.
`
},
{
title:'Call Stack',
code:`
Purpose
---------------
Stores Function Calls.

Example
---------------
main()
 ↓
login()
 ↓
validate()

Interview Trap
---------------
Stack Executes Synchronously.
`
},

{
title:'Callback Queue',
code:`
Purpose
---------------
Stores Completed Async Tasks.

Examples
---------------
setTimeout
setInterval
HTTP Requests

Flow
---------------
Async Task
   ↓
Queue
   ↓
Event Loop
   ↓
Execution
`
},
{
title:'Middleware',
code:`
========================================================
MIDDLEWARE
========================================================

Definition
--------------------------------------------------------
Runs Between Request And Route Handler.

Flow
--------------------------------------------------------

Request
   ↓
Middleware
   ↓
next()
   ↓
Controller
   ↓
Response

Why Used?
--------------------------------------------------------

✓ Authentication

✓ Logging

✓ Validation

✓ Error Handling

✓ Rate Limiting

Snippet
--------------------------------------------------------

app.use((req,res,next)=>{

 console.log(req.url);

 next();

});

========================================================

JWT Middleware
--------------------------------------------------------

const verifyToken = (
 req,
 res,
 next
)=>{

 const token =
 req.cookies.token;

 jwt.verify(
   token,
   SECRET
 );

 next();
}

========================================================

Interview Trap
--------------------------------------------------------

Without next()

Request Hangs Forever.

========================================================

Interview Question
--------------------------------------------------------

Q. What Is Middleware?

A.
Code Executed Between
Request And Response.
`
},

{
title:'Event Loop',
code:`
========================================================
EVENT LOOP
========================================================

Definition
--------------------------------------------------------

Mechanism That Handles
Async Operations.

========================================================

Flow
--------------------------------------------------------

Request
   ↓
Call Stack
   ↓
Async API
   ↓
Callback Queue
   ↓
Event Loop
   ↓
Execution

========================================================

Example
--------------------------------------------------------

console.log("A");

setTimeout(()=>{
 console.log("B");
},0);

console.log("C");

Output
--------------------------------------------------------

A
C
B

========================================================

Promise Example
--------------------------------------------------------

console.log("A");

setTimeout(()=>{
 console.log("B");
},0);

Promise.resolve()
.then(()=>{
 console.log("C");
});

Output
--------------------------------------------------------

A
C
B

Reason
--------------------------------------------------------

Microtask Queue Executes
Before Callback Queue.

========================================================

Interview Trap
--------------------------------------------------------

NodeJS Is Single Threaded
But Async Operations Use
Background Threads.
`
},

{
title:'Express Routing',
code:`
========================================================
ROUTING
========================================================

Definition
--------------------------------------------------------

Maps URL To Function.

========================================================

GET Route
--------------------------------------------------------

app.get(
 "/users",
 (req,res)=>{

  res.json(users);

 });

========================================================

POST Route
--------------------------------------------------------

app.post(
 "/users",
 (req,res)=>{

  users.push(
   req.body
  );

  res.json({
   success:true
  });

 });

========================================================

PUT Route
--------------------------------------------------------

app.put(
 "/users/:id",
 (req,res)=>{

 });

========================================================

DELETE Route
--------------------------------------------------------

app.delete(
 "/users/:id",
 (req,res)=>{

 });

========================================================

Interview Trap
--------------------------------------------------------

Route Order Matters.

Wrong
--------------------------------------------------------

app.get("/:id")

app.get("/users")

Users Route Never Executes.
`
},

{
title:'JWT Authentication',
code:`
========================================================
JWT AUTHENTICATION
========================================================

Login Flow
--------------------------------------------------------

User Login
     ↓
Generate JWT
     ↓
Send Cookie
     ↓
Browser Stores Cookie
     ↓
Future Requests

========================================================

Generate Token
--------------------------------------------------------

const token =
jwt.sign(
 {id:user.id},
 SECRET,
 {expiresIn:"15m"}
);

========================================================

Store Cookie
--------------------------------------------------------

res.cookie(
 "token",
 token,
 {
  httpOnly:true,
  secure:true,
  sameSite:"strict"
 }
);

========================================================

Verify Token
--------------------------------------------------------

const decoded =
jwt.verify(
 token,
 SECRET
);

========================================================

Interview Trap
--------------------------------------------------------

JWT Is Signed

NOT Encrypted

Anyone Can Decode Payload.

Only Signature Prevents
Modification.
`
}
];
}
