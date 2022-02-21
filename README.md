## Project Green Zone Server

## Requirments
 - [Nodejs v10.16.0](https://nodejs.org/en/)
 - [MongoDB 4.2 Community Edition](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)

## Getting started
 - Run `npm install` to install dependancies
 - Install nodemon globaly `npm install -g nodemon`
 - Add your mongodb endpont to `config/database.js` file
   - ```
        module.exports = {
          database: 'mongodb://localhost:PORT/DATABASE_NAME'
        }
     ```
 - Run the server using nodemon `nodemon server.js` or `npm start`

## Technologies used 
- express
- mongoDB, mongoose
- socket.io

## Routes
- login : simple authentication stategy : username and password (stored with random salt), passes jwt
- users : 
 - POST users/register : register with username password
 - GET users/trackers/:username :  trackers registered for user with :username
- trackers
 - POST trackers/tack : updated tracker information
 - GET trackers/ : emit tracker details to users channel from /webapp_io end-point  

- webapp_io : socket.io endpoint to get tacker details in realtime. tracker details are emited when new update arrives from tracker or front end client request for details.