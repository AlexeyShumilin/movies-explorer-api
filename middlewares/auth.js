const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError('Authorization required ');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Authorization required ');
  }

  req.user = payload;

  return next();
};
