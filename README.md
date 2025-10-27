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
  - statuses : pending, accepted, rejected, ignored

# API Design
- REST API (Representational State Transfer API) is a set of rules and conventions for building and interacting with web services.
- A RESTful API is one that adheres to REST principles, using HTTP methods to perform CRUD operations on resources.

- Client-Server : Client and server are independent; the client requests data, the server provides it.
- Stateless : Each request is independent — no session stored on the server.the server does not store session info.
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
- /hello and /hello/123 will give same result, but not /hello123
- URL bar always sends a GET api call.
- .use() will match all the HTTP methods unlike specific .get(), .post(), .put(),....

- /ab?c will work for both /abc, /ac
- /ab+c will work for both /abc, /abbbbc, /abbbc, but not /abcc, /abbccc
- /ab*cd means we can have anything in place of *, like /abxutcd, /ab899cd

- query parameter: added after a ? in the URL and can have multiple key–value pairs. GET /users?role=admin&active=true. Accessed via ( req.query )

- path parameter: part of the URL path itself. GET /users/:id. Retrieved via ( req.params )

- There could be multiple route handlers for a route, defined in 2nd, 3rd, 4th,... argument. 
- if we're not doing res.send(), it will wait till timeout happens, then exits. It will not go to next handler automatically. use next() to call the next handler. Only first one is called if no next() is called.

- app.use("/user", (req, res, next) => {
    // Route handler
    res.send("route Handler 1");
    next();
}, 
(req, res) => {
    res.send("route Handler 2");
}
),
 will give error as TCP connection is closed after response is sent.

 - if next() is called at last route handler, then error as no handler to call(it don't exist).

 - app.get("/user", rh1, rh2, [rh3, rh4], rh5);

# Middleware & error handlers
