const express = require('express');
const bodyParser = require('body-parser');
const heroes = require('./heroes');

const heroesRouter = express.Router();

heroesRouter.get('/heroes', (req, res) => {
  const { name } = req.query;

  heroes.getAll(req.token, name).then(
    (data) => {
      setTimeout(() => {
        return res.send(data);
      }, 400);
    },
    (error) => errorHandling(error, res)
  );
});

heroesRouter.get('/heroes/:id', (req, res) => {
  heroes.get(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => errorHandling(error, res)
  );
});

heroesRouter.post('/heroes', bodyParser.json(), (req, res) => {
  heroes.add(req.token, req.body).then(
    (data) => res.send(data),
    (error) => errorHandling(error, res)
  );
});

heroesRouter.put('/heroes/:id', bodyParser.json(), (req, res) => {
  heroes.edit(req.token, req.params.id, req.body).then(
    (data) => res.send(data),
    (error) => errorHandling(error, res)
  );
});

heroesRouter.delete('/heroes/:id', (req, res) => {
  heroes.remove(req.token, req.params.id).then(
    () => res.status(204).send(),
    (error) => errorHandling(error, res)
  );
});

function errorHandling(error, res) {
  console.error(error);

  if (error.message.includes('blank')) {
    return res.status(422).send({
      error: error.message,
    });
  }

  if (error.message.includes('not found')) {
    return res.status(404).send({
      error: error.message,
    });
  }

  res.status(500).send({
    error: error.message || 'There was an error.',
  });
}

module.exports = heroesRouter;
