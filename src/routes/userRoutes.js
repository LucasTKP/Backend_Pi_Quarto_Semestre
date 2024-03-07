const controller = require('../controllers/userController');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/loginUser', controller.loginUser);
router.post('/createUser', controller.createUser);
router.post('/resetPassword', authMiddleware, controller.resetPassword);

module.exports = router;
