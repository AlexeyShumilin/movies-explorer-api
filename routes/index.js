const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/notfounderr');

router.use(routerUsers);
router.use(routerMovies);
router.use('*', () => {
  throw new NotFoundError('Not found');
});

module.exports = router;
