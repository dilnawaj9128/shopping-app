import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';

const CATEGORIES = ['All','Electronics','Mobiles','Fashion','Kitchen','Books','Bags','Furniture'];

export default function Navbar({ onSearch, onCategory, category }) {
  const [search, setSearch]     = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const { count }               = useCart();
  const { user, logout }        = useAuth();
  const navigate                = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <>
      <header style={{ background: '#232F3E', position: 'sticky', top: 0, zIndex: 100 }}>
        {/* Main row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', maxWidth: 1400, margin: '0 auto' }}>
          {/* Logo */}
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#FF9900', fontWeight: 900, fontSize: 22, letterSpacing: -1, whiteSpace: 'nowrap', marginRight: 8, border: '2px solid transparent' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
            shop<span style={{ color: '#fff' }}>flow</span>
            <span style={{ color: '#FF9900', fontSize: 10, verticalAlign: 'super' }}>.in</span>
          </div>

          {/* Delivery */}
          <div style={{ color: '#ccc', fontSize: 11, lineHeight: 1.3, whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 10 }}>Deliver to</span>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>📍 Delhi 110001</span>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', borderRadius: 4, overflow: 'hidden', maxWidth: 700 }}>
            <select value={category} onChange={e => onCategory(e.target.value)}
              style={{ background: '#f3f3f3', border: 'none', padding: '0 8px', fontSize: 12, cursor: 'pointer', outline: 'none', color: '#333' }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search ShopFlow.in"
              style={{ flex: 1, border: 'none', padding: '10px 12px', fontSize: 14, outline: 'none' }} />
            <button type="submit" style={{ background: '#FF9900', border: 'none', padding: '0 16px', cursor: 'pointer', fontSize: 18 }}>🔍</button>
          </form>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {user ? (
              <div style={{ color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}
                onClick={logout}>
                <div style={{ fontSize: 11, color: '#ccc' }}>Hello, {user.name.split(' ')[0]}</div>
                <div style={{ fontWeight: 700 }}>Sign Out</div>
              </div>
            ) : (
              <div onClick={() => navigate('/login')} style={{ color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <div style={{ fontSize: 11, color: '#ccc' }}>Hello, sign in</div>
                <div style={{ fontWeight: 700 }}>Account & Lists ▾</div>
              </div>
            )}
            <div onClick={() => navigate('/orders')} style={{ color: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 11, color: '#ccc' }}>Returns</div>
              <div style={{ fontWeight: 700 }}>&amp; Orders</div>
            </div>
            <div onClick={() => setCartOpen(true)} style={{ color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              <div style={{ position: 'relative' }}>
                <span style={{ fontSize: 28 }}>🛒</span>
                {count > 0 && (
                  <span style={{ position: 'absolute', top: -4, right: -4, background: '#FF9900', color: '#111', fontSize: 11, fontWeight: 800, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {count}
                  </span>
                )}
              </div>
              <span style={{ fontWeight: 700, fontSize: 13 }}>Cart</span>
            </div>
          </div>
        </div>

        {/* Category strip */}
        <div style={{ background: '#37475A', padding: '6px 16px', display: 'flex', gap: 4, overflowX: 'auto', maxWidth: 1400, margin: '0 auto' }}>
          {['All', "Today's Deals", 'Electronics', 'Mobiles', 'Fashion', 'Kitchen', 'Prime', 'New Arrivals'].map(c => (
            <button key={c} onClick={() => onCategory(c === "Today's Deals" || c === 'Prime' || c === 'New Arrivals' ? 'All' : c)}
              style={{ background: 'none', border: category === c ? '1px solid white' : '1px solid transparent', color: '#fff', padding: '4px 10px', borderRadius: 2, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {c === 'Prime' ? '⚡ Prime' : c}
            </button>
          ))}
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
