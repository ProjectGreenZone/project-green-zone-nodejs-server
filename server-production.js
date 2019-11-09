const https = require('https');
const fs = require('fs');
const express = require('express');
const socket_io = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const config = require('./config/database');
const app = express();

// Parameters
const port = process.env.PORT || 9080;

// Database connection
mongoose.connect(config.database_production, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database_production);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

// Body Parser Middleware
app.use(bodyParser.json());
app.use(cors())

// Https server
console.log("Configureing Https server")
const options = {
  key: fs.readFileSync('/home/ubuntu/privkey.pem'),
  cert: fs.readFileSync('/home/ubuntu/fullchain.pem')
};
const server = https.createServer(options, app)
const io = socket_io(server);

// ########## Done server constants ##########


const users = require('./routes/users');
const trackers = require('./routes/trackers');
const login = require('./routes/login');

const webapp_io = io.of('/webapp_io');


app.use('/login', login);
app.use('/users', users);

app.use('/trackers', trackers(webapp_io))




// When client connects to websocket
webapp_io.on('connection', function (socket) {

  // Join a room or create one
  // const username = socket.handshake.query.username
  const username = "main"
  const room = username
  socket.join(room);
  socket.emit('message', { message: 'Connected to room ' + username });
  console.log(username + ' joined room ' + room)

  // When client update settings 
  // socket.on('settings update', function (data) {
  //   console.log(data);
  //   socket.emit('message', { msg: 'settings updated' });
  // });
});


server.listen(port, () => {
    console.log('Server started on port '+port);
  });