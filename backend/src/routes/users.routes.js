const router = require('express').Router();
const { authenticate, authorize, ROLES } = require('../middleware/auth');
const controller = require('../controllers/users.controller');

router.use(authenticate, authorize(ROLES.ADMIN));

router.get('/', controller.listAll);
router.get('/staff', controller.listStaff);
router.patch('/:id/role', controller.updateRole);
router.patch('/:id/active', controller.toggleActive);
router.delete('/:id', controller.remove);

module.exports = router;

