const router = require('express').Router();
const routerUsers = require('./users.js');
const routerMovies = require('./movies.js');
const NotFoundError = require('../errors/notfounderr.js');

router.use(routerUsers);
router.use(routerMovies);
router.use('*', () => {
  throw new NotFoundError('Not found');
});

module.exports = router;
