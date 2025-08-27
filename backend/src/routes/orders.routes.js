const router = require('express').Router();
const { authenticate, authorize, ROLES } = require('../middleware/auth');
const controller = require('../controllers/orders.controller');

router.use(authenticate);

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.create);

router.patch('/:id/status', authorize(ROLES.CASHIER, ROLES.MANAGER, ROLES.ADMIN), controller.updateStatus);
router.patch('/:id/paid', authorize(ROLES.CASHIER, ROLES.MANAGER, ROLES.ADMIN), controller.markPaid);
router.patch('/:id/approve', authorize(ROLES.MANAGER, ROLES.ADMIN), controller.approve);
router.patch('/:id/reject', authorize(ROLES.MANAGER, ROLES.ADMIN), controller.reject);
router.get('/:id/receipt.pdf', authorize(ROLES.CASHIER, ROLES.MANAGER, ROLES.ADMIN), controller.receiptPdf);

module.exports = router;

