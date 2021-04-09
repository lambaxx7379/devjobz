console.log("Hello!");

const express = require('express');
const server = express();

server.use(express.static('public'));

server.get('/hello', (req, res) => {
  res.send(`
  <html>
  <head></head>
  <body>
    <h3>Hello!</h3>
  </body>
  </html>
  `)
});


const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post('/job-search', (req, res) => {
  res.send({
    searchData: req.body,
    status: "PENDING",
  })
});

server.listen(2000, () => {
  console.log('I am listening...');
});