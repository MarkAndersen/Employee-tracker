# Employee-tracker

## Description:
- The purpose of this app is to create a command line application from scratch that can view, add and update employees using node and mySQL. A user is presented with menu options to view/add employees, departments, and roles, and update roles for each employee. This app pulls in information from an employees_db database, pushes up to and edits it as well. Inside this directory is a base schema, and a seed file useful for generating and population the database for testing purposes

## Technologies Utilized:
- Javascript
- Node
- NPM Package
- mySQL
- mySQL workbench
- cTable

## Installation & Use:
In the command line:
- npm i
- npm i inquirer
- npm i mysql
- npm install console.table --save
- ***Ensure that the host, port and password matches your local setup***

To start the server:
- node query.js

## Example:

![Example](./example.png)

## Challenges & Thoughts:
I iceboxed some features to delete employees and update salaries per employee, using multiple joins and CASCADE for deletion. nesting queries seemed key and I had challenges passing inquirer information into the queries to push up and update. I could have created classes and separated functions to make this cleaner, also this app may not be very DRY however it is functional. 

## Questions:
 https://github.com/MarkAndersen

[Email me:](mailto:Mark.Andersen75@gmail.com)