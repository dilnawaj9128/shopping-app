const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/products — list with filter/search/pagination
router.get('/', asyncHandler(async (req, res) => {
  const { keyword, category, page = 1, limit = 20 } = req.query;

  const query = {};
  if (keyword)  query.name     = { $regex: keyword, $options: 'i' };
  if (category && category !== 'All') query.category = category;

  const skip     = (Number(page) - 1) * Number(limit);
  const total    = await Product.countDocuments(query);
  const products = await Product.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });

  res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
}));

// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
}));

// POST /api/products — admin only
router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
}));

// PUT /api/products/:id — admin only
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
}));

// DELETE /api/products/:id — admin only
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
}));

// POST /api/products/:id/reviews — add review
router.post('/:id/reviews', protect, asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });

  product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
  product.updateRating();
  await product.save();
  res.status(201).json({ message: 'Review added' });
}));

module.exports = router;
