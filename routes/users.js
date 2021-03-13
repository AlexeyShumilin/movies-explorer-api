const router = require('express').Router();

const { login, getMe, updateMe } = require('../controllers/users');
const { checkUser } = require('../middlewares/validator');

router.get('/', login);
router.get('/me', getMe);
router.patch('/me', checkUser, updateMe);

module.exports = router;
