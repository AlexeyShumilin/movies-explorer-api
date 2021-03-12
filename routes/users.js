const router = require('express').Router();

//контроллеры юзер
const {checkBodyUser} = require('../middlewares/validator');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', checkBodyUser, updateCurrentUser);

module.exports = router;
