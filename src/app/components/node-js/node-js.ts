import { Component, output } from '@angular/core';

@Component({
  selector: 'app-node-js',
  standalone: false,
  templateUrl: './node-js.html',
  styleUrl: './node-js.css',
})
export class NodeJs {
  requestType = {
title: 'Express.js Request Object (req)',
code: `
The req object contains everything about
the incoming HTTP request.

Client
  ↓
HTTP Request
  ↓
Express
  ↓
req Object

----------------------------------------
Commonly Used Properties
----------------------------------------

req.params

Route Parameters

Route:

GET /users/:id

Request:

GET /users/101

Code:

app.get('/users/:id', (req, res) => {

    console.log(req.params);

});

Output:

{
   id: '101'
}

----------------------------------------

req.query

Query Parameters

Request:

GET /users?page=2&limit=10

Code:

console.log(req.query);

Output:

{
   page: '2',
   limit: '10'
}

----------------------------------------

req.body

Request Body

POST /users

Body:

{
   "name":"John",
   "age":25
}

Code:

console.log(req.body);

Output:

{
   name:'John',
   age:25
}

Requires:

app.use(express.json())

----------------------------------------

req.headers

Request Headers

Request:

Authorization: Bearer abc123

Content-Type: application/json

Code:

console.log(req.headers);

Output:

{
   authorization:'Bearer abc123',
   content-type:'application/json'
}

----------------------------------------

req.cookies

Cookies Sent By Browser

Cookie:

token=abc123

Code:

console.log(req.cookies);

Output:

{
   token:'abc123'
}

Requires:

cookie-parser middleware

----------------------------------------

req.ip

Client IP Address

Code:

console.log(req.ip);

Output:

::1

or

192.168.1.10

Used In:

Rate Limiting
Logging
Security

----------------------------------------

req.method

HTTP Method

Code:

console.log(req.method);

Output:

GET

POST

PUT

DELETE

PATCH

----------------------------------------

req.url

Complete URL

Request:

GET /users?page=1

Code:

console.log(req.url);

Output:

/users?page=1

----------------------------------------

req.path

Only Route Path

Request:

GET /users?page=1

Code:

console.log(req.path);

Output:

/users

----------------------------------------

req.protocol

Protocol Used

Code:

console.log(req.protocol);

Output:

http

or

https

----------------------------------------

req.hostname

Host Name

Request:

https://api.myapp.com/users

Code:

console.log(req.hostname);

Output:

api.myapp.com

----------------------------------------

req.originalUrl

Original Requested URL

Request:

/api/users?page=1

Output:

/api/users?page=1

Used In:

Logging

Analytics

----------------------------------------

req.user

Custom Property Added By Middleware

JWT Middleware

req.user = {
   id:101,
   role:'ADMIN'
};

Output:

{
   id:101,
   role:'ADMIN'
}

Used In:

Authentication
Authorization

----------------------------------------

req.params vs req.query vs req.body

req.params

/users/101

Output:

{
   id:'101'
}

----------------------------------------

req.query

/users?page=2

Output:

{
   page:'2'
}

----------------------------------------

req.body

POST /users

{
   "name":"John"
}

Output:

{
   name:'John'
}

----------------------------------------

Full Example

app.post('/users/:id', (req,res)=>{

   console.log(req.params);

   console.log(req.query);

   console.log(req.body);

   console.log(req.headers);

});

Request:

POST /users/101?page=2

Headers:
Authorization: Bearer xyz

Body:

{
   "name":"John"
}

Outputs:

req.params

{
   id:'101'
}

req.query

{
   page:'2'
}

req.body

{
   name:'John'
}

req.headers

{
   authorization:'Bearer xyz'
}

----------------------------------------

Most Asked Interview Properties

req.params
req.query
req.body
req.headers
req.cookies
req.ip
req.method
req.path
req.url
req.protocol
req.hostname
req.user

These are the ones used daily in
real-world Node.js/Express projects.
`
}
  requestObject = `
| Property       | Purpose          | Example         |
| -------------- | ---------------- | --------------- |
| \`req.params\`   | Route params     | \`/users/101\`    |
| \`req.query\`    | Query params     | \`?page=1\`       |
| \`req.body\`     | Request body     | POST data       |
| \`req.headers\`  | HTTP headers     | Authorization   |
| \`req.cookies\`  | Browser cookies  | token           |
| \`req.ip\`       | Client IP        | Rate limiting   |
| \`req.method\`   | HTTP method      | GET, POST       |
| \`req.path\`     | Route path only  | \`/users\`        |
| \`req.url\`      | Full URL         | \`/users?page=1\` |
| \`req.protocol\` | http/https       | https           |
| \`req.hostname\` | Domain name      | api.example.com |
| \`req.user\`     | Custom auth data | \`{id, role}\`    |
`;

responseObject=`
| Method                    | Purpose                 | Example                                  |
| ------------------------- | ----------------------- | ---------------------------------------- |
| \`res.send()\`              | Send text/object/html   | \`res.send('Success')\`                    |
| \`res.json()\`              | Send JSON response      | \`res.json({name:'John'})\`                |
| \`res.status()\`            | Set HTTP status code    | \`res.status(200)\`                        |
| \`res.status().json()\`     | Status + JSON response  | \`res.status(404).json({...})\`            |
| \`res.redirect()\`          | Redirect client         | \`res.redirect('/login')\`                 |
| \`res.download()\`          | Download file           | \`res.download('report.pdf')\`             |
| \`res.sendFile()\`          | Send file               | \`res.sendFile(filePath)\`                 |
| \`res.cookie()\`            | Set cookie              | \`res.cookie('token','abc123')\`           |
| \`res.clearCookie()\`       | Remove cookie           | \`res.clearCookie('token')\`               |
| \`res.set()\`               | Set response header     | \`res.set('X-App','NodeJS')\`              |
| \`res.get()\`               | Read response header    | \`res.get('Content-Type')\`                |
| \`res.type()\`              | Set Content-Type        | \`res.type('application/json')\`           |
| \`res.location()\`          | Set Location header     | \`res.location('/users/101')\`             |
| \`res.links()\`             | Set Link headers        | \`res.links({...})\`                       |
| \`res.append()\`            | Append header value     | \`res.append('Warning','Deprecated')\`     |
| \`res.end()\`               | End response            | \`res.end()\`                              |
| \`res.locals\`              | Store request data      | \`res.locals.user = user\`                 |
| \`res.headersSent\`         | Check response sent     | \`res.headersSent\`                        |
`

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
},];

rateLimiterSections = [
{
title: '1. API Rate Limiting -- Fixed Window (Basic In-Memory)',
code: `
const express = require('express');
const app = express();

const requests = {};

function rateLimiter(req, res, next) {
    const ip = req.ip;
    const currentTime = Date.now();
    const WINDOW_SIZE = 60 * 1000;
    const MAX_REQUESTS = 5;

    if (!requests[ip]) {
        requests[ip] = {
            count: 1,
            startTime: currentTime
        };
        return next();
    }

    const user = requests[ip];
    const timePassed = currentTime - user.startTime;

    if (timePassed < WINDOW_SIZE) {
        user.count++;
        if (user.count > MAX_REQUESTS) {
            return res.status(429).json({message: 'Too many requests'});
        }
    } else {
        user.count = 1;
        user.startTime = currentTime;
    }
    next();
}

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.send('Success');
});

app.listen(3000);`,
output: `
requests = {

  "192.168.1.10": {
      count: 3,
      startTime: 1719258000000
  },

  "192.168.1.11": {
      count: 2,
      startTime: 1719258005000
  }

}
`,
problem: `
Limit = 5 requests/minute
User sends:
Time          Requests
12:00:58      5 requests
12:01:01      5 requests

Total: 10 requests in 3 seconds (Burst Problem)
Still allowed.

Reason: Window gets reset.
This is called: Fixed Window Burst Problem
`,
otherApproach: `
Fixed Window stores only: count & startTime

But it does not know exactly WHEN requests came. Need to store actual timestamps.

Solution:  Sliding Window`
},

// ---------------------------------------------------

{
title: '2. API Rate Limiting -- Sliding Window',
code: `
const express = require('express');
const app = express();
const requests = {};

function rateLimiter(req, res, next) {
    const ip = req.ip;
    const WINDOW_SIZE = 60 * 1000;
    const MAX_REQUESTS = 5;

    const now = Date.now();

    if (!requests[ip]) {
        requests[ip] = [];
    }

    requests[ip] = requests[ip].filter(timestamp => now - timestamp < WINDOW_SIZE);
    if (requests[ip].length >= MAX_REQUESTS ) {
        return res.status(429).json({message: 'Too many requests'});
    }
    requests[ip].push(now);
    next();
}

app.use(rateLimiter);
app.get('/', (req, res) => {
    res.send('Success');
});
app.listen(3000);
`,
output: `
requests = {
  "192.168.1.10": [
      1719258000000,
      1719258005000,
      1719258010000
  ]
}

Limit = 5 requests/minute
Request Times
12:00:58
12:00:58
12:00:59
12:00:59
12:01:00

Next Request
12:01:01       ------->Blocked

Reason: Checks last 60 seconds only.
No burst problem.`,
problem: `
Need to store every request timestamp.
Example: 10000 requests

Need:10000 timestamps

Memory Usage: High

Every request performs: filter()
Time Complexity: O(n)
`,
otherApproach: `
Instead of storing every timestamp

Store only: tokens & lastRefillTime

Memory becomes smaller.

Solution: Token Bucket
`
},

// ---------------------------------------------------

{
title: '3. API Rate Limiting -- Token Bucket',
code: `
const express = require('express');
const app = express();
const buckets = {};

function rateLimiter(req, res, next) {
    const ip = req.ip;
    const MAX_TOKENS = 5;
    const REFILL_RATE = 1;
    const now = Date.now();

    if (!buckets[ip]) {
        buckets[ip] = {
            tokens: MAX_TOKENS,
            lastRefill: now
        };
    }
    const bucket = buckets[ip];
    const elapsedSeconds = (now - bucket.lastRefill) / 1000;
    const refillTokens = Math.floor(elapsedSeconds * REFILL_RATE);

    bucket.tokens = Math.min(
        MAX_TOKENS,
        bucket.tokens + refillTokens
    );

    bucket.lastRefill = now;
    if (bucket.tokens <= 0) {
        return res.status(429).json({message: 'Too many requests'});
    }

    bucket.tokens--;
    next();
}

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.send('Success');
});

app.listen(3000);`,
output:`
buckets = {
  "192.168.1.10": {
      tokens: 3,
      lastRefill: 1719258000000
  }
}

No need to store

10000 timestamps

Stores only: tokens & lastRefill  (not all timestamps Fixed+ sliding window)

Memory Usage: Very Low
`,
problem: `
Traffic can still arrive instantly.
Example: Bucket Size = 100

User sends: 100 requests

All requests are processed immediately.
Server gets sudden spike.
`,
otherApproach: `
Need smoother traffic.

Requests should leave at a fixed speed.

Solution: Leaky Bucket
`
},

// ---------------------------------------------------

{
title: '4. API Rate Limiting -- Leaky Bucket',
code: `
const express = require('express');
const app = express();
const queue = [];

const MAX_QUEUE_SIZE = 5;
function rateLimiter(req, res, next) {
    if ( queue.length >= MAX_QUEUE_SIZE) {
        return res.status(429).json({message: 'Bucket Full'});
    }
    queue.push({req, res, next});
}

setInterval(() => {
    if (queue.length > 0) {
        const item = queue.shift();
        item.next();
    }
}, 1000);
app.use(rateLimiter);

app.get('/', (req, res) => {
    res.send('Success');
});

app.listen(3000);
`,
output: `
queue = [req1, req2, req3, req4]

  100 Requests
      ↓
     Queue
      ↓
1 Request/Second

Traffic becomes smooth.
No sudden spikes.
`,
problem: `
Works only in one server.
Example:
Node-1
Node-2
Node-3

Each server has its own queue.
Limits are inconsistent.
`,
otherApproach: `
Need shared storage.

All servers should share request counts.

Solution: Redis Distributed Limiter
`
},

// ---------------------------------------------------

{
title: '5. API Rate Limiting -- Redis Distributed (Primarily use Redis when multiple servers are running like muliple nodes or clusters in load balancing)',
code: `
const express = require('express');
const app = express();

async function rateLimiter(req, res, next) {
    const userId = req.user.id;
    const key = 'rate_limit:' + userId;

    const count = await redis.incr(key);
    if (count === 1) { 
        await redis.expire(key, 60);
    }
    if (count > 100) {
        return res.status(429).json({ message: 'Too many requests'});
    }
    next();
}

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.send('Success');
});

app.listen(3000);
`,
output: `
Redis
rate_limit:101 = 20
rate_limit:102 = 50
rate_limit:103 = 90


Still follows Fixed Window Logic.

User can send:
59th second -> 100 requests
60th second -> 100 requests

Total: 200 requests
Still allowed.
`,
otherApproach: ` ->Production Solution:- why Redis it is best since same cache is used for all the load balancing nodes/clusters so when devops use redis for the rate limiting.

->If locally running or single application deployed then just token bucket is useful. If Horizontal scaling/ vertical scaling by which many server instances running best to use the redis with token bucket or sliding window.

Redis + Sliding Window + Token Bucket
OR
Redis + Token Bucket Used in Production Systems`
}

];

nodeJsMiddlewares = [
  {
title: '1. Pagination (Limit & Offset)',
code: `
app.get('/users', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const query = \`SELECT * FROM users LIMIT $1 OFFSET $2\`;

    const result = await pool.query(query,[limit, offset]);
    res.json(result.rows);
});
`, explanation: `
Page = 3

Limit = 10
Skip
(3 - 1) * 10
20
Database skips first 20 records and returns next 10 records.
`,output: `
GET

/users?page=2&limit=5

Returns

User6
User7
User8
User9
User10
`
},
{
title: '2. Redis Caching (Cache Aside Pattern)',
code: `
const express = require('express');
const redis = require('./redisClient');

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const cachedUser = await redis.get(userId);
    if (cachedUser) {
        return res.json({
            source: 'CACHE',
            data: JSON.parse(cachedUser)
        });
    }
    const user = await User.findById(userId);

    await redis.set(userId, JSON.stringify(user), 'EX',60);

    res.json({
        source: 'DATABASE',
        data: user
    });

});
`,explanation: `
Request
   ↓
Redis

Found?
 ↓

Yes
 ↓
Return Cache

No
 ↓
Database
 ↓
Store In Cache
 ↓
Return Response
`,output: `
First Request
{
 source: "DATABASE"
}

Second Request
{
 source: "CACHE"
}
`
},
{
title: '3. Cursor Pagination (Large Data)',
code: `
app.get('/users', async (req, res) => {

    const cursor = req.query.cursor;
    const limit = 5;
    const query = cursor ? { _id: { $gt: cursor } } : {};

    const users = await User.find(query).limit(limit);
    res.json(users);
});
`,explanation: `
Offset Pagination

skip(100000)

Very Slow

Cursor Pagination

Uses Last Record ID

Very Fast
`,output: `
GET

/users?cursor=665a12

Returns next 5 records
after that id.
`
},
{
title: '4. Role Based Authentication Middleware  -- the user role is saved along with the JWT token so no need to fire a query to databse any more to fetch user role or user profile data ', 
code: `
function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message:'Forbidden'});
        }
        next();
    };
}

app.get('/admin', authorize('ADMIN'), adminController);
`,explanation: `
User Role
USER

Trying

/admin
Not Present In Roles
Blocked
Status 403
`,
output: `
{
  "message":"Forbidden"
}
`
},
{
title: '6. API Gateway-- helps to group multiple node server api into single entry point called gateway ',
code: `
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

app.use('/users', proxy('http://localhost:3001'));
app.use('/orders', proxy('http://localhost:3002'));
app.listen(5000);
`, explanation: `
              Client
                 ↓
            API Gateway
                 ↓
/users                        /orders
  ↓                            ↓
User Service                Order Service


`,output: `
GET

/users/101

Forwarded To

localhost:3001/users/101
`
},
{
title: '7. Round Robin Load Balancer',
code: `
const servers = [
 'http://server1',
 'http://server2',
 'http://server3'
];

let index = 0;
function getServer() {
    const server = servers[index];

    index = (index + 1) % servers.length;
    return server;
}
`,explanation: `
Request1
 ↓
Server1

Request2
 ↓
Server2

Request3
 ↓
Server3

Request4
 ↓
Server1
`,output: `
server1
server2
server3
server1
server2
`
},
{
title: '8. RabbitMQ Producer',
code: `
const amqp = require('amqplib');

async function sendMessage() {
   const connection = await amqp.connect('amqp://localhost');
   const channel = await connection.createChannel();

   await channel.assertQueue('emails');
   channel.sendToQueue('emails', Buffer.from('Send Welcome Email'));

}
`,explanation: `
Producer
 ↓
RabbitMQ Queue
 ↓
Consumer
`,output: `
Message Added

Send Welcome Email
`
},
{
title: '9. RabbitMQ Consumer',
code: `
const amqp = require('amqplib');

async function consume() {
 const connection = await amqp.connect('amqp://localhost');
 const channel = await connection.createChannel();
 await channel.assertQueue('emails');
 channel.consume('emails', message => {
   console.log(message.content.toString());
  }
 );
}
`,explanation: `
Queue
 ↓
Consumer Reads
 ↓
Process Job
`,
output: `
Send Welcome Email
`
},
{
title: '10. Notification System Using Queue',
code: `
app.post('/register', async (req, res) => {

   const user = await User.create(req.body);
   channel.sendToQueue('emails',
      Buffer.from(JSON.stringify({ email: user.email }))
   );

   res.json(user);

 });
`,
explanation:`
Register User
      ↓
Save User
      ↓
Push To Queue
      ↓
Worker Sends Email
`,
output:`
User Created
Welcome Email Sent
`
},
{
title: '11. Notification Worker',
code: `
channel.consume('emails', async message => {
   const data = JSON.parse(message.content.toString());
   await sendEmail(data.email);
   console.log('Email Sent');
 }
);
`,
explanation: `
Queue
 ↓
Worker
 ↓
Email Service
 ↓
Send Mail
`,
output: `
Email Sent
`
},

]

  ngOnInit(): void {
    this.nodeExpressInterview = this.nodeExpressInterview.map(topic => ({
      ...topic,
      id: topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));
  }

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
