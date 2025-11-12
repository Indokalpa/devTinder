# SDLC (classical Waterfall Model)

Requirements Gathering (Product Manager)
    Design (Senior Engineer + Engineering Manager)
        Development (SDE 1, SDE 2)
            Testing (SDET - SDE in Testing)
                Deployment (DevOps Engineer)
                    Maintainance

# Monolith vs Microservice Architecture
- One Big Single Project, that contains all of BackEnd, FrontEnd, Authetication, Email Service, DB Connnection, Analytics.

- Multiple microsevices/project are there that work in sync with one another, like FrontEnd microservice, BackEnd microservice, Authentication microservice, Analytics microservice, Email microservice.

# Features
- Create an account
- Login
- update your profile
- Feed page explore
- send connection request
- see our matches
- see requests we've sent or received

# Low level Design

## DB Design (Single Responsibility approach)
- user collection (firstName, lastName, emailId, Ph No, password, age, gender)

- Connection Requests (From UserId, To UserId, Status)
  - status : pending, accepted, rejected, ignored

# API Design
- REST API (Representational State Transfer API) is a set of rules and conventions for building and interacting with web services.
- A RESTful API is one that adheres to REST principles, using HTTP methods to perform CRUD operations on resources.

- Client-Server : Client and server are independent; the client requests data, the server provides it.
- Stateless : Each request is independent — no session stored on the server.The server does not store session info.
- Cacheable : Responses can be cached to improve performance.
- Uniform Interface : Same method/way of communication between all clients and servers (standard URLs, HTTP methods).
- Layered System : API can have multiple layers (security, cache, load balancer) hidden from the client.

# HTTP Methods 
- GET : Retrieve data.  GET /users
- POST : Create new data.  POST /users 
- PUT : Replaces the entire resource.  PUT /users/5
- PATCH	: Updates only part of the resource.  PATCH /users/5
- DELETE : Removes data.  DELETE /users/5

- Express.js is a web framework built on top of Node.js’s core 'http' module.

# package.json & package.lock.json
- ^/caret : Major version is fixed. Minor updates and small patches will update authomatically.
- ~/tilde : Minor version is fixed. Only bug fixes or small patches will update automatically
- no symbol : Compatible with exact version only.

- 5.1.0 : major version(breaking changes) . minor version(new feature) . patch(bug fix)
- unless breaking changes, it is always backward compatible.

- package.lock.json defines the exact version information that is used.

- once the upstream (tracking) is set, git push and git pull work seamlessly without extra arguments.

# Routing and Request Handlers

- order of defining the routes matters, as it starts checking top-down.
- '/hello' and '/hello/123' will give same result, but not /hello123
- URL bar always sends a GET api call.
- .use() will match all the HTTP methods unlike specific .get(), .post(), .put(),....

- /ab?c will work for both /abc, /ac
- /ab+c will work for both /abc, /abbbbc, /abbbc, but not /abcc, /abbccc
- /ab*cd means we can have anything in place of *, like /abxutcd, /ab899cd

- query parameter: added after a ? in the URL and can have multiple key–value pairs. GET /users?role=admin&active=true. Accessed via ( req.query )

- path parameter: part of the URL path itself. GET /users/:id. Retrieved via ( req.params )

- There could be multiple route handlers for a route, defined in 2nd, 3rd, 4th,... argument. 
- if we're not doing res.send(), it will wait till timeout happens, then exits. It will not go to next handler automatically. 
- use next() to call the next handler. ONLY FIRST ONE IS CALLED if no next() is called.

- app.use("/user", (req, res, next) => {
    // Route handler
    next();
    res.send("route Handler 1");
}, 
(req, res) => {
    res.send("route Handler 2");
}
),
will give error as TCP connection is closed after response is sent.

 - if next() is called at last route handler, then error as no handler to call(it don't exist).

 - app.get("/user", rh1, rh2, [rh3, rh4], rh5) or multiple app.get()s

# Middleware vs Route handlers
- Middleware : Used to process requests before they reach the final route handler. It can modify the request/response objects, perform checks, or run logic.

- Handles a specific route (URL + method) and sends the final response to the client.

# Error Handling

- use try-catch block for error handling
- try {.....} catch (err) {.......}

- app.use("/", (err, req, res, next) => {.....}), keep is towards the end for handling any errors if found.

# Database, Schema & Model
- First make the DB connection, then do app.listen()
- model is like a class, we create instances of this model.
- An instance of a model is called a document.

# Javascript Object vs JSON(Javascript Object Notation)

- A real object (data structure) in JavaScript                   - A string format used to store or transmit data.
- Used inside JavaScript programs to hold data and logic.          - Used for data exchange between systems (e.g., API responses).
- Keys can be quoted/unquoted, and values can include functions, undefined, etc.     - Keys must be in double quotes, and only basic data types are allowed.
- Directly accessible via obj.key or obj["key"].                     - Must be parsed first using JSON.parse() to become an object.
- Convert to JSON with JSON.stringify(obj)                           - Convert to JS object with JSON.parse(jsonString).
- trailing comma allowed                                                  - trailing comma not allowed


# Data Sanitization and Schema Validation(DB lvl and API lvl)

- Never TRUST req.body()
- validation is applied when you insert new data or explicitly call .save() on a document, for update operations they don't run automatically.
- The "required" validator in Mongoose only runs on document creation or .save(), 
not during update operations like findByIdAndUpdate(), updateOne(), etc. — even if you set { runValidators: true }.
- additionally, use api level validation.

# Encrypting Password
- use 'bcrypt' lib to encrypt our password into a hash, and then store this hash. Also use it to verify.
- use "Invalid credential" instead of "User not found"/"Incorrect Password".

# Authentication, JWT & Cookies
- After Login validation, the server sends back a JWT token inside a cookie with exipiration date. Browser will store this cookie.

- This cookie is sent along with the request by the client in every API request for validation.
- need "cookie parser" middleware to read cookies.

- cookie.expire : Client-side. How long browser stores the cookie before deleting it. 

- jwt.expire : Server-side. How long token is valid for authentication at the server.
- Don't use arrow fn with schema-methods, as 'this' keyword only works with normal fn, not arrow fn.

# Diving into APIs and Express Router
- Group similar routes under respective rotuers
- use router = express.Router() instead of app = express()

# Logical DB Query & Compound Indexes
- '$or', '$ans' query && 'pre' middleware in mongoose
- 'pre' middleware will be called everytime the specified event happens.

- use indexes to optimize the queries in DB.
- MongoDB automatically creates a index for unique: true.

# Ref, Populate & Thought process of writing APIs
- use 'ref' to create reference or relation betwn a field and a collection.
- Then use 'populate' to fetch required info from referenced collection for that field.

# Building Feed API and Pagination

- Query opertators like $nin, $ne in mongoDB.

- /feed?pages=1&limit=10 : first 10 users 1-10 => .skip(0) & .limit(10)
- /feed?pages=2&limit=10 : first 10 users 11-20 => .skip(10) & .limit(10)
- use .skip() && .limit()
