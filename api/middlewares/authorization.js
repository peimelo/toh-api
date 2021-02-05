const authorization = (req, res, next) => {
  const token = req.get('Authorization');

  if (token) {
    req.token = token;
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
};

module.exports = authorization;
