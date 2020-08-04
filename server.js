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

    POST /sessions: returns a 'token' in the body and also in the header. You can use this 'token' in the following endpoints.

    All requests, except POST /sessions, should use an 'Authorization' header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    POST /sessions
      USAGE:
        Authenticates the user.
      PARAMS:
        email - String
        password - String

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

app.post('/sessions', bodyParser.json(), (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(500).send({
      error: "Missing 'email' parameter.",
    });
    return;
  }

  if (!password) {
    res.status(500).send({
      error: "Missing 'password' parameter.",
    });
    return;
  }

  let name = email.split('@')[0];
  name = name.charAt(0).toUpperCase() + name.slice(1);

  const token = Math.random().toString(36).substr(-10);

  const user = {
    email,
    name,
    token,
  };

  res.set('token', token);
  res.send(user);
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

  heroes.getAll(req.token, name).then(
    (data) => {
      return res.send(data);
    },
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
