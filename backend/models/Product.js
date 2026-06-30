const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:    { type: String, required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  description:  { type: String, required: true },
  image:        { type: String, required: true },
  category:     { type: String, required: true, enum: ['Electronics','Mobiles','Fashion','Kitchen','Books','Bags','Furniture'] },
  price:        { type: Number, required: true, min: 0 },
  mrp:          { type: Number, required: true, min: 0 },
  countInStock: { type: Number, required: true, default: 0, min: 0 },
  rating:       { type: Number, default: 0 },
  numReviews:   { type: Number, default: 0 },
  prime:        { type: Boolean, default: true },
  badge:        { type: String, enum: ['Best Seller', "Amazon's Choice", 'Deal of the Day', null], default: null },
  reviews:      [reviewSchema],
}, { timestamps: true });

// Auto-update rating on review change
productSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) { this.rating = 0; this.numReviews = 0; return; }
  this.numReviews = this.reviews.length;
  this.rating     = this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.numReviews;
};

module.exports = mongoose.model('Product', productSchema);
