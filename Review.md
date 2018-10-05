# Review Questions

## What is Node.js?
- It is a runtime environment (a program that runs other programs). It is used to execute JS apps outside the browser which opens up a lot of possibilities for JS devs.

## What is Express?
- Express is a Node.js module. It abstracts the logic from Node in order to make a web server in a very easy way.

## Mention two parts of Express that you learned about this week.
1. We can access express in our server via: const express = require('express');
2. Express can handle routing and middleware as well

## What is Middleware?
- Middlewares are essentially functions that can access our request object, and our response object. With it, it can interact between the database and the application.

## What is a Resource?
- A resource can be anything that lives on our server.

## What can the API return to help clients know if a request was successful?
- An API, depending on whether the request was successful, can inform the user on how to fix the error, or in the other case, show a success message to inform the user that the request was successful. In addition, an API can send a HTTP Status code which can also inform the user on the error met for the request.

## How can we partition our application into sub-applications?
- We can partition our app into sub-apps by using express routers.

## What is express.json() and why do we need it?
- Express.json() is built-in middleware, that when executed/invoked, enables us to work with the json data (which by default, it cant).
