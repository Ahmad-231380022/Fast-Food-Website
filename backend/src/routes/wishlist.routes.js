const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const controller = require('../controllers/wishlist.controller');

router.use(authenticate);
router.get('/', controller.getWishlist);
router.post('/:productId', controller.addToWishlist);
router.delete('/:productId', controller.removeFromWishlist);

module.exports = router;

