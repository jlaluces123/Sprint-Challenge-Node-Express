const express = require('express'); // pull in express
const cors = require('cors');
const server = express(); // instantiate server
const logger = require('morgan');
const project = require('./data/helpers/projectModel');
const action = require('./data/helpers/actionModel');
const mapper = require('./data/helpers/mappers');
const port = 5202;

server.use(cors()); // connects react
server.use(express.json()); 
server.use(logger('tiny'));

// LOGGERS




// PROJECTS
server.listen(port, () => {
  console.log(`================Running on port ${port}==============`);
});

server.get('/', (req, res) => {
  res.send('<h3>Welcome to, well idk what to call it yet</h3>');
});



server.get('/api/projects', (req, res) => {
  project.get()
    .then(response => {
      console.log(' I am response ====: ', response);
      res.json(response);
    })
    .catch(err => res.send(err))
});




