const express      = require('express');
const asyncHandler = require('express-async-handler');
const jwt          = require('jsonwebtoken');
const User         = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// JWT_SECRET guaranteed present from server.js startup check
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/users/register
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user  = await User.create({ name, email, password });
  const token = generateToken(user._id);
  res.status(201).json({ token, user });
}));

// POST /api/users/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid email or password' });

  const token = generateToken(user._id);
  res.json({ token, user });
}));

// GET /api/users/me
router.get('/me', protect, asyncHandler(async (req, res) => {
  res.json({ user: req.user });
}));

// PUT /api/users/me
router.put('/me', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.name    = req.body.name    || user.name;
  user.email   = req.body.email   || user.email;
  user.address = req.body.address || user.address;
  if (req.body.password) user.password = req.body.password;
  const updated = await user.save();
  res.json({ user: updated });
}));

// GET /api/users  (admin)
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json({ users });
}));

// DELETE /api/users/:id  (admin)
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
}));

module.exports = router;
