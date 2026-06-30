import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axios';

function Stars({ rating, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#FF9900' : '#ddd'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

export default function ProductPage() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty]         = useState(1);
  const [added, setAdded]     = useState(false);

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then(res => setProduct(res.data.product))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div style={{ textAlign: 'center', padding: 80, fontSize: 18 }}>Loading…</div>;
  if (!product) return null;

  const disc = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 16px', background: '#fff', borderRadius: 8, display: 'flex', flexWrap: 'wrap', gap: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      {/* Image */}
      <div style={{ flex: '0 0 400px', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7', borderRadius: '8px 0 0 8px', minHeight: 400 }}>
        <img src={product.image} alt={product.name}
          style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'; }} />
      </div>

      {/* Details */}
      <div style={{ flex: 1, padding: '24px 0', minWidth: 280 }}>
        <div style={{ fontSize: 11, color: '#007185', marginBottom: 4 }}>{product.category}</div>
        <h1 style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.4, marginBottom: 8 }}>{product.name}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #ddd' }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 14, color: '#007185' }}>{product.rating} ({product.numReviews?.toLocaleString()} ratings)</span>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#565959' }}>M.R.P.: <s>₹{product.mrp?.toLocaleString()}</s></div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>₹{product.price?.toLocaleString()}</div>
          <div style={{ color: '#cc0c39', fontWeight: 600, fontSize: 14 }}>
            You save ₹{(product.mrp - product.price)?.toLocaleString()} ({disc}% off)
          </div>
        </div>

        {product.prime && (
          <div style={{ background: '#f0f9ff', border: '1px solid #b3e0f2', borderRadius: 4, padding: '8px 12px', marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ background: '#00A8E0', color: '#fff', fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 2 }}>prime</span>
            <span style={{ fontSize: 13, color: '#007600' }}>FREE Delivery Tomorrow</span>
          </div>
        )}

        <div style={{ marginBottom: 16, fontSize: 14, color: product.countInStock > 0 ? '#007600' : '#cc0c39', fontWeight: 600 }}>
          {product.countInStock > 0 ? (product.countInStock < 10 ? `Only ${product.countInStock} left in stock!` : 'In Stock') : 'Out of Stock'}
        </div>

        {/* Qty selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Qty:</label>
          <select value={qty} onChange={e => setQty(Number(e.target.value))}
            style={{ padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14 }}>
            {[...Array(Math.min(product.countInStock, 10))].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320 }}>
          <button onClick={handleAdd} disabled={product.countInStock === 0}
            style={{ background: added ? '#c8e6c9' : '#FFD814', border: '1px solid #FCD200', borderRadius: 20, padding: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
          <button onClick={() => { handleAdd(); navigate('/'); }}
            style={{ background: '#FF9900', border: '1px solid #e68a00', borderRadius: 20, padding: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#fff' }}>
            Buy Now
          </button>
        </div>

        {product.description && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #ddd' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>About this item</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: '#333' }}>{product.description}</div>
          </div>
        )}

        <div style={{ marginTop: 16, fontSize: 13, color: '#555', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div>✅ Secure transaction</div>
          <div>🔄 Free returns within 30 days</div>
          <div>🛡️ 1 Year Manufacturer Warranty</div>
        </div>
      </div>
    </div>
  );
}
