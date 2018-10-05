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
server.use(logger('combined'));

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

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;

  project.get(id)
    .then(eachProject => {
      if (!eachProject) {
        res.status(404).json({ missingError: 'Could not find project by the id given'})
      }
      res.status(200).json(eachProject);
    })
    .catch(err => console.log(err));
});

server.get('/api/projects/:id/actions', (req, res) => {
  const { id } = req.params;

  project.getProjectActions(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => console.log(err));
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



server.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;  

  project.update(id, { name, description })
    .then(response => {
      if (!req.body.name || !req.body.description) {
        res.status(400).json({ fillError: 'Please fill a name and description, if you want to delete a project, use a delete function' });
      } else if (id === undefined) {
        res.status(404).json({ missingError: 'Id not found in database' });
      }
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ networkError: 'There was an error in the server'});
    });
});










// ACTIONS

server.get('/api/actions', (req, res) => {
  action.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json({ networkError: 'The actions could not be fetched' }));
});




server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;

  action.get(id)
    .then(eachAction => {
      res.status(200).json(eachAction);
    })
    .catch(err => console.log(err));
});




// adds an action to a project id
server.post('/api/actions', (req, res) => {
  const { project_id, description, notes } = req.body;  

  action.insert({ project_id, description, notes })
    .then(response => {

      if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ fillError: 'Please make sure to add a project_id, a description, and notes' });
      } else if (typeof req.body.project_id !== 'number') {
        res.status(400).json({ typeError: 'invalid type, please enter a number (hint: remove quotation marks around number)' });
      } else if (req.body.description.length > 128) {
        res.status(400).json({ exceedError: 'Exceeded character limit (128 char.)' });
      }

      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ networkError: ' There was an error posting an action' });
    });
});







server.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;

  action.remove(id)
    .then(response => {

      if (response === 0) {
        res.status(404).json({ missingError: 'err... the id provided does not exist' });
      } else if (response === 1) {
        res.status(200).json(response);
      }

    })
    .catch(err => res.status(500).json({ networkError: 'There was an error removing the action' }));
});





server.put('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body; 

  action.update(id, { project_id, description, notes })
    .then(response => {

      if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ fillError: 'Please make sure to add a project_id, a description, and notes' });
      } else if (typeof req.body.project_id !== 'number') {
        res.status(400).json({ typeError: 'invalid type, please enter a number (hint: remove quotation marks around number)' });
      } else if (req.body.description.length > 128) {
        res.status(400).json({ exceedError: 'Exceeded character limit (128 char.)' });
      }
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ networkError: 'There was an error editing' });
    });
});