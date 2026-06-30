const express      = require('express');
const asyncHandler = require('express-async-handler');
const Order        = require('../models/Order');
const Product      = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/orders — create order
router.post('/', protect, asyncHandler(async (req, res) => {
  const { items, shippingAddress, totalAmount } = req.body;
  if (!items || items.length === 0)
    return res.status(400).json({ message: 'No items in order' });

  // Reduce stock
  for (const item of items) {
    if (item.product) {
      await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.qty } });
    }
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    totalAmount,
  });

  res.status(201).json({ message: 'Order placed successfully', order });
}));

// GET /api/orders/myorders — user's own orders
router.get('/myorders', protect, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
}));

// GET /api/orders/:id
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin)
    return res.status(403).json({ message: 'Not authorized' });
  res.json({ order });
}));

// GET /api/orders — admin: all orders
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
  res.json({ orders });
}));

// PATCH /api/orders/:id/status — admin: update status
router.patch('/:id/status', protect, admin, asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status, ...(status === 'delivered' ? { deliveredAt: Date.now() } : {}) },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ order });
}));

module.exports = router;
