const authorization = (req, res, next) => {
  const token = req.get('Authorization');

  if (token && token.length >= 10) {
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error:
        'Provide an Authorization header to identify yourself (anyone with at least 10 characters).',
    });
  }
};

module.exports = authorization;
