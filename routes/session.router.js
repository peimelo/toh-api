const express = require('express');
const bodyParser = require('body-parser');

const sessionRouter = express.Router();

sessionRouter.post('/', bodyParser.json(), (req, res) => {
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

sessionRouter.use('/session', sessionRouter);
module.exports = sessionRouter;