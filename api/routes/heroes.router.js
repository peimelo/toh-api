const express = require('express');
const bodyParser = require('body-parser');
const heroes = require('./heroes');

const heroesRouter = express.Router();

heroesRouter.get('/heroes', (req, res) => {
  const { term } = req.query;

  heroes.getAll(req.token, term).then(
    (data) => {
      setTimeout(() => {
        return res.send(data);
      }, 400);
    },
    (error) => {
      console.error(error);
      res.status(500).send({
        error: 'There was an error.',
      });
    }
  );
});

heroesRouter.get('/heroes/:id', (req, res) => {
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

heroesRouter.post('/heroes', bodyParser.json(), (req, res) => {
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

heroesRouter.put('/heroes/:id', bodyParser.json(), (req, res) => {
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

heroesRouter.delete('/heroes/:id', (req, res) => {
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

module.exports = heroesRouter;