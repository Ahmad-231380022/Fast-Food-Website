const router = require('express').Router();
const { authenticate, authorize, ROLES } = require('../middleware/auth');
const controller = require('../controllers/products.controller');

router.get('/', controller.list);
router.get('/:id', controller.get);
router.get('/admin/low-stock', authenticate, authorize(ROLES.MANAGER, ROLES.ADMIN), controller.lowStock);

router.post('/', authenticate, authorize(ROLES.MANAGER, ROLES.ADMIN), controller.create);
router.put('/:id', authenticate, authorize(ROLES.MANAGER, ROLES.ADMIN), controller.update);
router.delete('/:id', authenticate, authorize(ROLES.MANAGER, ROLES.ADMIN), controller.remove);

module.exports = router;

