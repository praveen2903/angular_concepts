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
title: 'NodeJS Introduction',
code: `
What Is NodeJS?
  JavaScript Runtime Built On Chrome V8 Engine.

Purpose
  Run JavaScript Outside Browser.

Used For
  REST APIs
  WebSockets
  Microservices
  Streaming
  Real-Time Apps

Flow
  Request
    ↓
  Node Runtime
    ↓
  Event Loop
    ↓
  Response

Interview Trap
  NodeJS Is NOT a Framework.
  NodeJS Is a Runtime.
`
},

{
title: 'ExpressJS Introduction',
code: `
What Is ExpressJS?
  Backend Framework Built On NodeJS.

Purpose
  Simplifies API Development.

Used For
  Routing
  Middleware
  Authentication
  REST APIs

Flow
  Request
    ↓
  Middleware
    ↓
  Route
    ↓
  Response

Interview Trap
  Express Cannot Run Without NodeJS.
`
},

{
title: 'NodeJS vs ExpressJS',
code: `
NodeJS
  Type    : Runtime
  Role    : Handles Execution
  Standalone : Yes

ExpressJS
  Type    : Framework
  Role    : Handles Routing
  Standalone : Needs NodeJS

Interview Answer
  NodeJS Runs JavaScript.
  Express Builds APIs.
`
},

{
title: 'Call Stack',
code: `
Purpose
  Stores Function Calls.

Example
  main()
    ↓
  login()
    ↓
  validate()

Interview Trap
  Stack Executes Synchronously.
`
},

{
title: 'Callback Queue',
code: `
Purpose
  Stores Completed Async Tasks.

Examples
  setTimeout
  setInterval
  HTTP Requests

Flow
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
title: 'Middleware',
code: `
Definition
  Runs Between Request And Route Handler.

Flow
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
  ✓ Authentication
  ✓ Logging
  ✓ Validation
  ✓ Error Handling
  ✓ Rate Limiting

Snippet
  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });

JWT Middleware
  const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, SECRET);
    next();
  }

Interview Trap
  Without next()
  Request Hangs Forever.

Interview Question
  Q. What Is Middleware?
  A. Code Executed Between Request And Response.
`
},

{
title: 'Event Loop',
code: `
Definition
  Mechanism That Handles Async Operations.

Flow
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

Example
  console.log("A");
  setTimeout(() => { console.log("B"); }, 0);
  console.log("C");

Output
  A
  C
  B

Promise Example
  console.log("A");
  setTimeout(() => { console.log("B"); }, 0);
  Promise.resolve().then(() => { console.log("C"); });

Output
  A
  C
  B

Reason
  Microtask Queue Executes Before Callback Queue.

Interview Trap
  NodeJS Is Single Threaded
  But Async Operations Use Background Threads.
`
},

{
title: 'Express Routing',
code: `
Definition
  Maps URL To Function.

GET Route
  app.get("/users", (req, res) => {
    res.json(users);
  });

POST Route
  app.post("/users", (req, res) => {
    users.push(req.body);
    res.json({ success: true });
  });

PUT Route
  app.put("/users/:id", (req, res) => { });

DELETE Route
  app.delete("/users/:id", (req, res) => { });

Interview Trap
  Route Order Matters.

  Wrong Order:
    app.get("/:id")
    app.get("/users")   ← Never Executes
`
},

{
title: 'JWT Authentication',
code: `
Login Flow
  User Login
    ↓
  Generate JWT
    ↓
  Send Cookie
    ↓
  Browser Stores Cookie
    ↓
  Future Requests

Generate Token
  const token = jwt.sign(
    { id: user.id },
    SECRET,
    { expiresIn: "15m" }
  );

Store Cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

Verify Token
  const decoded = jwt.verify(token, SECRET);

Interview Trap
  JWT Is Signed, NOT Encrypted.
  Anyone Can Decode Payload.
  Only Signature Prevents Modification.
`
},

{
title: 'req.params vs req.query vs req.body',
code: `
req.params  →  URL Path Variables
  Route  : GET /users/10
  Setup  : app.get("/users/:id")
  Access : req.params.id
  Output : 10

req.query  →  URL Filter/Search Values
  Route  : GET /users?page=1
  Access : req.query.page
  Output : 1

req.body  →  Request Payload (POST/PUT)
  Route  : POST /users
  Data   : { name: "John" }
  Access : req.body.name
  Output : John

Interview Trap
  params → URL path
  query  → Filters / Search
  body   → Data Payload
`
},

{
title: 'express.json()',
code: `
Without Middleware
  req.body → undefined

Fix
  app.use(express.json());

Why
  Parses JSON Request Body
  Makes req.body Available

Interview Trap
  If You Forget This Middleware,
  req.body Will Always Be Undefined.
`
},

{
title: 'next() vs res.send()',
code: `
next()
  Passes Control To Next Middleware.
  Does NOT end the request.

res.send()
  Sends Response And Ends Request.
  Nothing should run after this.

Wrong
  res.send("Done");
  next();   ← Error: Cannot continue after response sent

Correct
  Use Either next() OR res.send() — not both.

Interview Trap
  Calling next() after res.send() causes errors.
`
},

{
title: 'Headers Already Sent Error',
code: `
Wrong
  res.send("Success");
  res.send("Again");   ← Error

Error Message
  Cannot Set Headers After They Are Sent.

Why
  One Request = One Response Only.

Fix
  Always return after sending response.

  if (!user) {
    return res.send("Not Found");
  }

Interview Trap
  Most Common Bug In Express Controllers.
`
},

{
title: 'return res.send()',
code: `
Wrong
  if (!user) {
    res.send("Not Found");
  }
  console.log("Still Runs");   ← Bug

Correct
  if (!user) {
    return res.send("Not Found");
  }

Why
  return Stops Function Execution Immediately.

Interview Trap
  Missing return Is The Most Common Bug In Controllers.
`
},

{
title: 'Route Order Matters',
code: `
Wrong Order
  app.get("/:id")    ← Catches everything
  app.get("/users")  ← Never reached

Request : /users
Matched : /:id   ← Wrong!

Correct Order
  app.get("/users")  ← Specific first
  app.get("/:id")    ← Dynamic second

Interview Trap
  Express Checks Routes Top To Bottom.
  Always put specific routes before dynamic ones.
`
},

{
title: 'Async Error Handling',
code: `
Wrong
  app.get("/", async (req, res) => {
    throw new Error();   ← Not caught by Express
  });

Correct
  app.get("/", async (req, res, next) => {
    try {
      // code
    } catch (err) {
      next(err);   ← Pass to error middleware
    }
  });

Why
  Express Does NOT Catch Async Errors Automatically.

Interview Trap
  Unhandled Promise Rejection crashes the server.
`
},

{
title: 'Middleware Execution Order',
code: `
Registration
  app.use(auth);
  app.use(logger);

Flow
  Request
    ↓
  auth
    ↓
  logger
    ↓
  route handler

Interview Trap
  Middleware Runs In The Order It Is Registered.
  Put auth before your routes, not after.
`
},

{
title: 'app.use() vs app.get()',
code: `
app.use()
  Matches : All HTTP Methods (GET, POST, PUT, DELETE)
  Use For : Global middleware like auth, logging

app.get()
  Matches : GET requests only
  Use For : Specific route handlers

Example
  app.use(authMiddleware);   ← Runs for all routes
  app.get("/users", handler);   ← GET only

Interview Trap
  Authentication usually uses app.use()
  so it applies to every route.
`
},

{
title: 'Bearer Token',
code: `
Definition
  Authentication token sent in request headers.

Request Header
  Authorization: Bearer eyJhbGc...

Access In Code
  const auth = req.headers.authorization;

Extract Token
  const token = auth.split(" ")[1];

Before Extraction : Bearer abc123
After Extraction  : abc123

Interview Trap
  "Bearer" Is NOT The Token — It Is The Prefix.
  The Actual Token Comes After The Space.
`
},

{
title: '401 vs 403',
code: `
401 Unauthorized
  Not Logged In.
  Token Is Missing Or Invalid.

403 Forbidden
  Logged In, But No Permission To Access.

Examples
  401 → User not authenticated (no token)
  403 → User cannot access admin page (no role)

Interview Trap
  401 = Identity Missing
  403 = Permission Missing
`
},

{
title: '400 Bad Request',
code: `
Meaning
  Client Sent Invalid Or Incomplete Data.

Example
  POST /users
  { email: "" }   ← Empty email

Response
  res.status(400).json({ error: "Email Required" })

Interview Trap
  Validation Errors Should Always Return 400.
`
},

{
title: '404 Not Found',
code: `
Meaning
  The Requested Resource Does Not Exist.

Example
  GET /users/999   ← User 999 doesn't exist

Response
  res.status(404).json({ error: "User Not Found" })

Interview Trap
  Can Mean Route Missing OR Data Missing.
`
},

{
title: '409 Conflict',
code: `
Meaning
  Resource Already Exists — Conflict Detected.

Example
  Register with an email that's already taken.

Response
  res.status(409).json({ error: "Email Exists" })

Interview Trap
  Use 409 For Duplicate Record Errors.
`
},

{
title: '500 Internal Server Error',
code: `
Meaning
  Server Failed Unexpectedly.

Examples
  Database Down
  Code Crash
  Unexpected Exception

Response
  res.status(500).json({ error: "Something Went Wrong" })

Interview Trap
  Never Expose Actual Error Stack To The Client.
  Log It Internally, Return Generic Message.
`
},

{
title: 'Authentication vs Authorization',
code: `
Authentication
  Who Are You?
  Verified by: Login / Token

Authorization
  What Can You Do?
  Verified by: Roles / Permissions

Example Flow
  Login → Authentication (Who Are You?)
    ↓
  Access Admin → Authorization (Are You Allowed?)

Interview Trap
  Authentication Happens First.
  Authorization Comes After.
`
},

{
title: 'Refresh Token Flow',
code: `
On Login, Server Sends:
  Access Token  → Valid for 15 minutes
  Refresh Token → Valid for 7 days

When Access Token Expires:
  Client Sends Refresh Token
    ↓
  Server Verifies Refresh Token
    ↓
  Server Issues New Access Token

Why Two Tokens?
  Short-lived access token = less security risk
  Long-lived refresh token = better user experience

Interview Trap
  Refresh Token Lives Much Longer Than Access Token.
`
},

{
title: 'HTTP Status Categories',
code: `
1xx  →  Informational

2xx  →  Success
  200  OK
  201  Created
  204  No Content

3xx  →  Redirect
  301  Moved Permanently
  302  Found (Temporary)

4xx  →  Client Errors
  400  Bad Request
  401  Unauthorized
  403  Forbidden
  404  Not Found
  409  Conflict
  422  Unprocessable Entity

5xx  →  Server Errors
  500  Internal Server Error
  502  Bad Gateway
  503  Service Unavailable

Interview Trap
  4xx = Client Made a Mistake
  5xx = Server Made a Mistake
`
},

{
title: 'Most Common API Status Codes',
code: `
200  →  Success           (GET)
201  →  Created           (POST)
204  →  Deleted / No Content
400  →  Validation Error
401  →  Not Logged In
403  →  Permission Denied
404  →  Resource Not Found
409  →  Duplicate Record
500  →  Server Error

Interview Answer
  These Are The Status Codes Used In Most APIs Daily.
`
},

{
title: 'API Versioning',
code: `
Why Version?
  Old API Keeps Working.
  New API Can Be Released.
  No Breaking Changes For Existing Clients.

Method 1 — URL Versioning  (Most Common)
  /api/v1/users
  /api/v2/users

Method 2 — Header Versioning
  Accept: application/vnd.yourapp.v1+json

Method 3 — Query Parameter
  /api/users?version=2

Interview Trap
  URL Versioning Is The Most Widely Used Method.
`
},
  ];
}
