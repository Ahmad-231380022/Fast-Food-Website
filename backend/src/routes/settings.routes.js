const router = require('express').Router();
const { authenticate, authorize, ROLES } = require('../middleware/auth');
const controller = require('../controllers/settings.controller');

router.get('/', authenticate, authorize(ROLES.ADMIN), controller.get);
router.put('/', authenticate, authorize(ROLES.ADMIN), controller.update);

module.exports = router;

