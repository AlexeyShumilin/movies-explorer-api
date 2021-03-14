const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/notfounderr');

const { auth } = require('../middlewares/auth');
const { checkSignup, checkSignIn } = require('../middlewares/validator');

router.post('/signup', checkSignup, createUser);
router.post('/signin', checkSignIn, login);

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);
router.use('*', () => {
  throw new NotFoundError('Not found');
});

module.exports = router;
