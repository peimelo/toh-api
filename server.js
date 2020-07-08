const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const heroes = require('./heroes');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to Tour of Heroes API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /heroes
      USAGE:
        Get all of the heroes

    GET /heroes?name=term
      USAGE:
        Get all heroes with name like a term
      PARAMS:
        term - String

    GET /heroes/:id
      USAGE:
        Get the details of a single hero

    POST /heroes
      USAGE:
        Add a new hero
      PARAMS:
        name - String

    PUT /heroes/:id
      USAGE:
        Edit the details of an existing hero
      PARAMS:
        name - String

    DELETE /heroes/:id
      USAGE:
        Remove the hero
 </pre>
  `;

  res.send(help);
});

app.use((req, res, next) => {
  const token = req.get('Authorization');

  if (token) {
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error:
        'Please provide an Authorization header to identify yourself (can be whatever you want)',
    });
  }
});

app.get('/heroes', (req, res) => {
  const { name } = req.query;
  console.log(req);
  console.log(req.token);
  console.log(req.query);
  console.log(name);

  heroes.getAll(req.token, name).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.',
      });
    }
  );
});

app.post('/heroes', bodyParser.json(), (req, res) => {
  heroes.add(req.token, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.',
      });
    }
  );
});

app.get('/heroes/:id', (req, res) => {
  heroes.get(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.',
      });
    }
  );
});

app.delete('/heroes/:id', (req, res) => {
  heroes.remove(req.token, req.params.id).then(
    () => res.status(204).send(),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.',
      });
    }
  );
});

app.put('/heroes/:id', bodyParser.json(), (req, res) => {
  heroes.edit(req.token, req.params.id, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.',
      });
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port %s', port);
});
