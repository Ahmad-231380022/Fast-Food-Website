const router = require('express').Router();
const { authenticate, authorize, ROLES } = require('../middleware/auth');
const controller = require('../controllers/users.controller');

router.use(authenticate, authorize(ROLES.MANAGER, ROLES.ADMIN));

router.get('/', controller.listStaff);
router.post('/', controller.createCashier);
router.patch('/:id/active', controller.toggleActive);

module.exports = router;

