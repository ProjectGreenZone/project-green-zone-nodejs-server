const log = require('bunyan').createLogger({name: 'Give My Space'});
const express = require('express');
var http = require('http');
var socket_io = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const config = require('./config/database');

const app = express();

const port = process.env.PORT || 9080;

// const students = require('./routes/students');
const users = require('./routes/users');
// const subjects = require('./routes/subjects');
const trackers = require('./routes/trackers');
const login = require('./routes/login');

// log.info('test info');
// log.warn('test warn');
// log.error('test error');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});


// Body Parser Middleware
app.use(bodyParser.json());
app.use(cors())


const server = http.Server(app);
const io = socket_io(server);

const webapp_io = io.of('/webapp_io');


app.use('/login', login);
// app.use('/students', students);
// app.use('/subjects', subjects);
// app.use('/exams', exams);
app.use('/users', users);

app.use('/test', trackers(webapp_io))





webapp_io.on('connection', function (socket) {

  const username = socket.handshake.query.username
  socket.join(username);
  socket.emit('message', { message: 'Connected to room ' + username });

  console.log(username + ' connected !')
  var settings  = 1
  socket.on('settings update', function (data) {
    console.log(data);
    settings = data;
    socket.emit('message', { msg: 'reading updaetes' });
  });

  socket.on('tracker update', function (data) {
    socket.emit('message', { msg: 'tracker updated ',
    settings: settings });
  });
});





// app.get('/test', (req, res, next) =>{
//   trackers_io.to('u2').emit('message', { msg: 'reading updaetes from room' });
//   res.json('a');

// });

server.listen(port, () => {
    console.log('Server started on port '+port);
  });