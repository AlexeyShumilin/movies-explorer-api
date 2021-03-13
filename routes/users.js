const router = require('express').Router();

const { getUsers, getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { checkUser } = require('../middlewares/validator');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', checkUser, updateCurrentUser);

module.exports = router;
