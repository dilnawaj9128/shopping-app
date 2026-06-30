/**
 * Database Seeder
 * Usage: node config/seed.js
 *
 * Reads credentials from environment / .env file.
 * Set SEED_ADMIN_EMAIL, SEED_ADMIN_PASS, SEED_USER_EMAIL, SEED_USER_PASS
 * via environment or it will prompt you to set them.
 */
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
require('dotenv').config();

const Product = require('../models/Product');
const User    = require('../models/User');

// ── Validate env ────────────────────────────────────────
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not set. Create a .env file first.');
  process.exit(1);
}

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASS  = process.env.SEED_ADMIN_PASS;
const USER_EMAIL  = process.env.SEED_USER_EMAIL;
const USER_PASS   = process.env.SEED_USER_PASS;

if (!ADMIN_EMAIL || !ADMIN_PASS || !USER_EMAIL || !USER_PASS) {
  console.error(`
❌ Missing seed credentials in environment.
   Add these to your .env file:
   SEED_ADMIN_EMAIL=admin@yourapp.com
   SEED_ADMIN_PASS=YourStrongPassword123!
   SEED_USER_EMAIL=user@yourapp.com
   SEED_USER_PASS=UserPassword123!
  `);
  process.exit(1);
}

// ── Products ────────────────────────────────────────────
const products = [
  {
    name: 'boAt Rockerz 450 Bluetooth Headphones',
    description: 'Enjoy quality sound with up to 15 hours playback, 40mm drivers, and comfortable padded ear cushions.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics', price: 1299, mrp: 3990,
    countInStock: 50, rating: 4.2, numReviews: 87432, prime: true, badge: 'Best Seller',
  },
  {
    name: 'Samsung 65" 4K Smart LED TV',
    description: 'Crystal 4K processor, HDR, 3 HDMI ports. Built-in Wi-Fi with SmartThings app.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=500&h=500&fit=crop',
    category: 'Electronics', price: 54990, mrp: 89990,
    countInStock: 10, rating: 4.5, numReviews: 23891, prime: true, badge: 'Deal of the Day',
  },
  {
    name: 'Apple iPhone 15 (128GB)',
    description: 'A16 Bionic chip, 48MP camera, Dynamic Island, USB-C. Ceramic Shield front.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
    category: 'Mobiles', price: 69999, mrp: 79900,
    countInStock: 8, rating: 4.6, numReviews: 54219, prime: true, badge: "Amazon's Choice",
  },
  {
    name: 'Nike Air Max 270 Running Shoes',
    description: 'Engineered mesh upper, Max Air unit in the heel for exceptional cushioning.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Fashion', price: 6995, mrp: 12995,
    countInStock: 40, rating: 4.3, numReviews: 14320, prime: true, badge: 'Best Seller',
  },
  {
    name: 'Instant Pot Duo 7-in-1 Pressure Cooker 5.7L',
    description: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté pan — all in one.',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop',
    category: 'Kitchen', price: 7499, mrp: 11999,
    countInStock: 35, rating: 4.7, numReviews: 32100, prime: true, badge: "Amazon's Choice",
  },
  {
    name: 'Kindle Paperwhite (16GB) Signature Edition',
    description: '6.8" display, adjustable warm light, 10 weeks battery, waterproof, wireless charging.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop',
    category: 'Electronics', price: 14999, mrp: 18999,
    countInStock: 25, rating: 4.8, numReviews: 9870, prime: true, badge: null,
  },
  {
    name: 'Wildcraft Trailblazer 45L Backpack',
    description: 'Heavy-duty zippers, padded back panel, laptop compartment 17", rain cover included.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Bags', price: 1699, mrp: 3499,
    countInStock: 60, rating: 4.1, numReviews: 7654, prime: false, badge: null,
  },
  {
    name: 'Nikon D3500 DSLR Camera with 18-55mm Lens',
    description: '24.2MP DX-format sensor, Full HD 1080p video, 5fps continuous shooting.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
    category: 'Electronics', price: 34995, mrp: 46950,
    countInStock: 12, rating: 4.5, numReviews: 11230, prime: true, badge: 'Best Seller',
  },
  {
    name: 'Milton Thermosteel Flip Lid Bottle 1000ml',
    description: 'Double wall insulated — hot 24hr, cold 24hr. Food grade stainless steel 304.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    category: 'Kitchen', price: 599, mrp: 1295,
    countInStock: 100, rating: 4.4, numReviews: 45670, prime: true, badge: "Amazon's Choice",
  },
  {
    name: "Levi's Men's 511 Slim Fit Jeans",
    description: 'Slim through hip and thigh. Stretch denim for extra comfort and movement.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    category: 'Fashion', price: 1919, mrp: 3999,
    countInStock: 75, rating: 4.3, numReviews: 28940, prime: true, badge: null,
  },
  {
    name: 'Logitech MX Master 3S Wireless Mouse',
    description: '8K DPI sensor, MagSpeed scroll wheel, 70-day battery, USB-C charging.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Electronics', price: 7495, mrp: 9995,
    countInStock: 30, rating: 4.7, numReviews: 18760, prime: true, badge: "Amazon's Choice",
  },
  {
    name: 'Prestige Iris 750W Mixer Grinder',
    description: '3 stainless steel jars, 3 speed control, motor protection overload.',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop',
    category: 'Kitchen', price: 2295, mrp: 4500,
    countInStock: 45, rating: 4.2, numReviews: 21340, prime: true, badge: 'Best Seller',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Admin user
    const adminHash = await bcrypt.hash(ADMIN_PASS, 12);
    await User.create({ name: 'Admin', email: ADMIN_EMAIL, password: adminHash, isAdmin: true });

    // Demo user
    const userHash = await bcrypt.hash(USER_PASS, 12);
    await User.create({ name: 'Demo User', email: USER_EMAIL, password: userHash });

    await Product.insertMany(products);

    console.log(`✅ Seeded ${products.length} products`);
    console.log(`👤 Admin: ${ADMIN_EMAIL}`);
    console.log(`👤 User:  ${USER_EMAIL}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
