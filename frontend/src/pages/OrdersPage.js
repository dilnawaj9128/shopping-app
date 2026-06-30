import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const STATUS_STYLE = {
  pending:   { bg: '#fff8e1', color: '#f59e0b', label: 'Pending' },
  confirmed: { bg: '#e3f2fd', color: '#1d4ed8', label: 'Confirmed' },
  shipped:   { bg: '#e8f5e9', color: '#15803d', label: 'Shipped' },
  delivered: { bg: '#f3e5f5', color: '#7c3aed', label: 'Delivered' },
  cancelled: { bg: '#fdecea', color: '#cc0c39', label: 'Cancelled' },
};

export default function OrdersPage() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const { user }              = useAuth();
  const navigate              = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/api/orders/myorders')
      .then(res => setOrders(res.data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return <div style={{ textAlign: 'center', padding: 80, fontSize: 18 }}>Loading orders…</div>;

  return (
    <div style={{ maxWidth: 1000, margin: '24px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Your Orders</h1>

      {orders.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 8, padding: 60, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>No orders yet</div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 6 }}>Start shopping to see your orders here</div>
          <button onClick={() => navigate('/')} style={{ marginTop: 20, background: '#FFD814', border: '1px solid #FCD200', borderRadius: 20, padding: '10px 28px', fontWeight: 600, cursor: 'pointer' }}>
            Start Shopping
          </button>
        </div>
      ) : orders.map(order => {
        const s = STATUS_STYLE[order.status] || STATUS_STYLE.pending;
        return (
          <div key={order._id} style={{ background: '#fff', borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: '#f7f7f7', padding: '12px 20px', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', borderBottom: '1px solid #ddd' }}>
              <div>
                <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Placed</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>₹{order.totalAmount?.toLocaleString()}</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  {s.label}
                </span>
                <span style={{ fontSize: 12, color: '#888' }}>#{order._id.slice(-8).toUpperCase()}</span>
              </div>
            </div>

            {/* Items */}
            <div style={{ padding: '16px 20px' }}>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '8px 0', borderBottom: idx < order.items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <img src={item.image} alt={item.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 4, background: '#f7f7f7' }}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'; }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: '#888' }}>Qty: {item.qty} × ₹{item.price?.toLocaleString()}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>₹{(item.price * item.qty)?.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
