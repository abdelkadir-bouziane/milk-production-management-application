# Milk Production Management Application

This is a project I created as a test to get a job as a fullstack developer in the software development agency **OMRAN SOFTWARE**.

## Presentation

The project consists in creating an internal website (in arabic) to manage the daily operations of a milk production company. These operations are:
- Registration of cows (cow number, date of entry, breed: Holstein, Montbliard).
- Registration of the medical examination of cows (day of examination, illness).
- Recording of births (mother cow number, date of birth).
- Recording of the total daily milk production (day, amount of milk in liters).

## Technologies used

This project was created using the following technologies:

### Client

- React JS
- Redux for managing and centralizing application state
- React-router-dom to handle routing
- Css for styling

### Server

- Express (Node JS)
- JSON files for data storage

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your code editor
- Open two different terminals (to run the server on one terminal and the client on the other terminal)

<span style="color:red;">
Make sure you run the server side before the client side
</span>
<br/>
<br/>

**In the first terminal**

- run these commands :

```bash
$ cd server
$ npm install     # to install server-side dependencies
$ npm run dev     # to start the server
```
The server side will run on : **http://localhost:4000/**

**In the second terminal**

- run these commands :

```bash
$ cd client
$ npm install     # to install client-side dependencies
$ npm start       # to start the client
```
The client side will run on : **http://localhost:3000/**