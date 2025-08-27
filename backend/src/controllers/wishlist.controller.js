const User = require('../models/User');
const Product = require('../models/Product');
const { asyncHandler } = require('../utils/asyncHandler');

exports.getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist');
  res.json({ wishlist: user.wishlist });
});

exports.addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const user = await User.findById(req.user.id);
  const exists = user.wishlist.find((id) => id.toString() === productId);
  if (!exists) {
    user.wishlist.push(productId);
    await user.save();
  }
  const populated = await user.populate('wishlist');
  res.json({ wishlist: populated.wishlist });
});

exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user.id);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();
  const populated = await user.populate('wishlist');
  res.json({ wishlist: populated.wishlist });
});

