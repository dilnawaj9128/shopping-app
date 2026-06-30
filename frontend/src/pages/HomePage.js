import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';

const BANNERS = [
  { title: 'Great Indian Festival', sub: 'Up to 80% off on Electronics', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&h=300&fit=crop' },
  { title: 'Fashion Week Sale', sub: 'Flat 50% off on Top Brands', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&h=300&fit=crop' },
  { title: 'Kitchen Essentials', sub: 'Best deals on home & kitchen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=300&fit=crop' },
];

export default function HomePage({ search, category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [bannerIdx, setBanner]  = useState(0);
  const navigate                = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setBanner(i => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category && category !== 'All') params.category = category;
    if (search) params.keyword = search;
    api.get('/api/products', { params })
      .then(res => setProducts(res.data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, search]);

  const showBanner = !search && (!category || category === 'All');

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 12px 40px' }}>

      {/* Banner */}
      {showBanner && (
        <div style={{ position: 'relative', margin: '12px 0', borderRadius: 8, overflow: 'hidden', height: 220, cursor: 'pointer' }}
          onClick={() => setBanner(i => (i + 1) % BANNERS.length)}>
          <img src={BANNERS[bannerIdx].img} alt="sale"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(0,0,0,0.75) 0%,transparent 60%)', display: 'flex', alignItems: 'center', padding: '0 40px' }}>
            <div>
              <div style={{ color: '#FF9900', fontSize: 32, fontWeight: 900 }}>{BANNERS[bannerIdx].title}</div>
              <div style={{ color: '#fff', fontSize: 16, marginTop: 6 }}>{BANNERS[bannerIdx].sub}</div>
              <button style={{ marginTop: 16, background: '#FF9900', border: 'none', padding: '10px 24px', borderRadius: 4, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Shop Now</button>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 6 }}>
            {BANNERS.map((_, i) => (
              <div key={i} onClick={e => { e.stopPropagation(); setBanner(i); }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: i === bannerIdx ? '#FF9900' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
            ))}
          </div>
        </div>
      )}

      {/* Result info */}
      {(search || (category && category !== 'All')) && (
        <div style={{ padding: '12px 0', fontSize: 14, color: '#555' }}>
          {loading ? 'Searching…' : `${products.length} results${search ? ` for "${search}"` : ''}${category && category !== 'All' ? ` in ${category}` : ''}`}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 8, height: 320, animation: 'pulse 1.5s infinite' }}>
              <div style={{ background: '#f0f0f0', height: 200 }} />
              <div style={{ padding: 12 }}>
                <div style={{ background: '#f0f0f0', height: 12, borderRadius: 4, marginBottom: 8 }} />
                <div style={{ background: '#f0f0f0', height: 12, width: '60%', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>No products found</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>Try a different search or category</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
          {products.map(p => (
            <ProductCard key={p._id} product={p} onClick={() => navigate(`/product/${p._id}`)} />
          ))}
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}
