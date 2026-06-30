import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [mode, setMode]       = useState('login');
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPass]   = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register }   = useAuth();
  const navigate              = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (mode === 'login') await login(email, password);
      else await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 32, width: '100%', maxWidth: 380, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', border: '1px solid #ddd' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ color: '#FF9900', fontWeight: 900, fontSize: 28 }}>shop<span style={{ color: '#232F3E' }}>flow</span><span style={{ fontSize: 12, verticalAlign: 'super', color: '#FF9900' }}>.in</span></div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>{mode === 'login' ? 'Sign in' : 'Create account'}</div>
        </div>

        <form onSubmit={handle}>
          {mode === 'register' && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Your name</label>
              <input value={name} onChange={e => setName(e.target.value)} required placeholder="First and last name"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14, outline: 'none' }} />
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14, outline: 'none' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Password</label>
            <input type="password" value={password} onChange={e => setPass(e.target.value)} required minLength={6}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14, outline: 'none' }} />
          </div>

          {error && <div style={{ color: '#cc0c39', fontSize: 13, marginBottom: 12, background: '#fff5f5', border: '1px solid #fcd0d0', borderRadius: 4, padding: '8px 12px' }}>{error}</div>}

          <button type="submit" disabled={loading}
            style={{ width: '100%', background: '#FFD814', border: '1px solid #FCD200', borderRadius: 4, padding: 11, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13 }}>
          {mode === 'login' ? (
            <span>New to ShopFlow? <button onClick={() => setMode('register')} style={{ background: 'none', border: 'none', color: '#007185', cursor: 'pointer', fontWeight: 600 }}>Create account</button></span>
          ) : (
            <span>Already have an account? <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: '#007185', cursor: 'pointer', fontWeight: 600 }}>Sign in</button></span>
          )}
        </div>
      </div>
    </div>
  );
}
