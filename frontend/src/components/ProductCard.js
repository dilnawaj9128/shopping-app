import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Stars({ rating }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#FF9900' : '#ddd'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span style={{ color: '#007185', fontSize: 12, marginLeft: 3 }}>{rating}</span>
    </span>
  );
}

export default function ProductCard({ product, onClick }) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const disc = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div onClick={onClick}
      style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'relative', transition: 'box-shadow 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.16)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}>

      {/* Badge */}
      {product.badge && (
        <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 2, background: product.badge === 'Deal of the Day' ? '#c0392b' : product.badge === "Amazon's Choice" ? '#232F3E' : '#FF9900', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 3 }}>
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button onClick={e => { e.stopPropagation(); setWishlisted(w => !w); }}
        style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
        {wishlisted ? '❤️' : '🤍'}
      </button>

      {/* Image */}
      <div style={{ height: 200, background: '#f7f7f7', overflow: 'hidden' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'; }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 13, lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.name}
        </div>

        <Stars rating={product.rating} />
        <div style={{ fontSize: 11, color: '#565959', marginBottom: 6 }}>
          {product.numReviews?.toLocaleString()} ratings
        </div>

        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>₹{product.price?.toLocaleString()}</span>
          <div style={{ fontSize: 12, color: '#565959' }}>
            M.R.P.: <s>₹{product.mrp?.toLocaleString()}</s>
            <span style={{ color: '#cc0c39', fontWeight: 600, marginLeft: 6 }}>({disc}% off)</span>
          </div>
        </div>

        {product.prime && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
            <span style={{ background: '#00A8E0', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 6px', borderRadius: 2 }}>prime</span>
            <span style={{ fontSize: 11, color: '#007600' }}>FREE Delivery Tomorrow</span>
          </div>
        )}

        {product.countInStock < 10 && product.countInStock > 0 && (
          <div style={{ fontSize: 11, color: '#cc0c39', marginBottom: 6 }}>Only {product.countInStock} left!</div>
        )}
        {product.countInStock === 0 && (
          <div style={{ fontSize: 11, color: '#cc0c39', marginBottom: 6 }}>Out of Stock</div>
        )}

        <button onClick={handleAdd} disabled={product.countInStock === 0}
          style={{ width: '100%', background: added ? '#c8e6c9' : '#FFD814', border: '1px solid #FCD200', borderRadius: 20, padding: 8, fontSize: 13, fontWeight: 600, cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer', transition: 'background 0.2s', opacity: product.countInStock === 0 ? 0.6 : 1 }}>
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
