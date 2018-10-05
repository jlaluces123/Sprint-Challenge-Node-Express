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


server.post('/api/projects', (req, res) => {
  const { name, description } = req.body;

  project.insert({ name, description })
    .then(response => {
      if (!req.body.name || !req.body.description) { // required check
        res.status(400).json({ fillError: 'Please provide text, and/or userId' })
      } else if (req.body.name.length > 128) { // 128 cap exceeded check
        res.status(400).json({ lengthError: 'Please shorten name, max length exceeded (128 char.)' });
      } else {
        res.status(200).json(response);
      }      
    })
    .catch(err => res.status(500).json({ networkError: 'There was an error in the server' }));
});



server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;

  project.remove(id)
    .then(response => {
      if (response === 0) {
        res.status(404).json({ missingError: 'err..... the id provided does not exist sowwy!' });
      } else if (response === 1) {
        res.status(200).json(response)
      }
    })
    .catch(err => console.log(err));  
});
