const router = require('express').Router();

const { getUsers, getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { checkBodyUser } = require('../middlewares/validator');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', checkBodyUser, updateCurrentUser);

module.exports = router;
