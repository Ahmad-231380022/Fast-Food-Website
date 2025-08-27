const router = require('express').Router();
const { authenticate, authorize, ROLES } = require('../middleware/auth');
const controller = require('../controllers/support.controller');

router.use(authenticate);
router.post('/', controller.create);
router.get('/mine', controller.mine);
router.get('/', authorize(ROLES.MANAGER, ROLES.ADMIN), controller.listAll);
router.patch('/:id', authorize(ROLES.MANAGER, ROLES.ADMIN), controller.updateStatus);

module.exports = router;

