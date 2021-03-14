const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized');

const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErr('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedErr('Authorization required');
  }

  req.user = payload;
  next();
};

module.exports = { auth };
