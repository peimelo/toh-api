const express = require('express');
const cors = require('cors');
const auth = require('./middlewares/authorization');
const sessionRouters = require('./routes/session.router');
const heroesRouters = require('./routes/heroes.router');

const port = process.env.PORT || 3001;
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

app.use('/api', sessionRouters);
app.use('/api', auth, heroesRouters);

app.listen(port, () => {
  console.log('Server listening on port %s', port);
});

module.exports = app;
