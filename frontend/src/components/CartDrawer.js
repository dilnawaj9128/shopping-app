import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function CartDrawer({ open, onClose }) {
  const { items, total, count, updateQty, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) { navigate('/login'); onClose(); return; }
    try {
      const orderItems = items.map(i => ({
        product: i._id,
        name: i.name,
        image: i.image,
        price: i.price,
        qty: i.qty,
      }));
      await api.post('/api/orders', {
        items: orderItems,
        totalAmount: total,
        shippingAddress: { street: '123 MG Road', city: 'Delhi', state: 'DL', zip: '110001' },
      });
      clearCart();
      onClose();
      navigate('/orders');
    } catch (err) {
      alert('Order failed: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300 }} />
      <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 400, maxWidth: '100vw', background: '#fff', zIndex: 301, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 20px rgba(0,0,0,0.2)' }}>
        <div style={{ background: '#232F3E', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>🛒 Cart ({count})</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#ccc', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
              <div style={{ fontSize: 60, marginBottom: 12 }}>🛒</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>Your cart is empty</div>
              <button onClick={onClose} style={{ marginTop: 16, background: '#FFD814', border: '1px solid #FCD200', borderRadius: 20, padding: '8px 24px', fontWeight: 600, cursor: 'pointer' }}>
                Continue Shopping
              </button>
            </div>
          ) : items.map(item => (
            <div key={item._id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
              <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, background: '#f7f7f7' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, lineHeight: 1.3, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>₹{(item.price * item.qty).toLocaleString()}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => updateQty(item._id, item.qty - 1)} style={{ width: 26, height: 26, border: '1px solid #ccc', borderRadius: 4, background: '#f7f7f7', cursor: 'pointer', fontWeight: 700 }}>−</button>
                  <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ width: 26, height: 26, border: '1px solid #ccc', borderRadius: 4, background: '#f7f7f7', cursor: 'pointer', fontWeight: 700 }}>+</button>
                  <button onClick={() => removeItem(item._id)} style={{ marginLeft: 4, background: 'none', border: 'none', color: '#cc0c39', fontSize: 12, cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '2px solid #f0f0f0', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#555', marginBottom: 6 }}>
              <span>Subtotal ({count} items)</span><span>₹{total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#007600', marginBottom: 12 }}>
              <span>Delivery</span><span>FREE (Prime)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>
              <span>Order Total</span><span>₹{total.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout}
              style={{ width: '100%', background: '#FFD814', border: '1px solid #FCD200', borderRadius: 20, padding: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Proceed to Buy
            </button>
          </div>
        )}
      </div>
    </>
  );
}
