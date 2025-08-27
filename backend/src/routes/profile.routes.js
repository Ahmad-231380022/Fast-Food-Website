const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const controller = require('../controllers/profile.controller');

router.use(authenticate);
router.get('/', controller.getMe);
router.put('/', controller.updateMe);
router.put('/password', controller.changePassword);

module.exports = router;

