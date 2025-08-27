const router = require('express').Router();
const { authenticate, authorize, ROLES } = require('../middleware/auth');
const controller = require('../controllers/reports.controller');

router.use(authenticate, authorize(ROLES.MANAGER, ROLES.ADMIN));

router.get('/sales', controller.salesJson);
router.get('/sales.pdf', controller.salesPdf);
router.get('/sales.xlsx', controller.salesXlsx);
router.get('/inventory', controller.inventoryJson);

module.exports = router;

