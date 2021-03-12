const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');

router.use(routerUsers);
router.use(routerMovies);
router.use('*', () => {
  throw new NotFoundError('Not found');
});

module.exports = router;
