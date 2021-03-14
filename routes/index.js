const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const { auth } = require('../middlewares/auth');
const { checkSignup, checkSignIn } = require('../middlewares/validator');
const NotFoundError = require('../errors/notfounderr');

router.post('/signup', checkSignup, createUser);
router.post('/signin', checkSignIn, loginUser);

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);
router.use('*', () => {
  throw new NotFoundError('Not found');
});

module.exports = router;
