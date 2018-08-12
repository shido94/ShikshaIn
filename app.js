const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axois = require('axios');
const userApi = require('./server/routes/user');
const adminApi = require('./server/routes/admin');

const app = express();

const port = 3000;

// app.use(express.limit('50MB'));
app.use(bodyParser.json({limit: '50MB'}));
app.use(bodyParser.urlencoded({limit: '50MB', extended: false}));
app.use(express.static(__dirname + '/dist/newApp'));

app.use('/user', userApi);
app.use('/admin', adminApi);
//
// app.get('*', (req,res)=>{
//   res.sendFile(path.join(__dirname, ''));
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/newApp/index.html'));
});


// Server connection API

const server = http.createServer(app);
mongoose.connect('mongodb://localhost:27017/myDb',{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  server.listen(port, () =>{
    console.log('Server running at port ', port);
  });
});


