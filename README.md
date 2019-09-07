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
