import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';

function AppContent() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');

  const handleSearch = (q) => { setSearch(q); setCategory('All'); };
  const handleCategory = (c) => { setCategory(c); setSearch(''); };

  return (
    <>
      <Navbar onSearch={handleSearch} onCategory={handleCategory} category={category} />
      <Routes>
        <Route path="/" element={<HomePage search={search} category={category} />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
      <footer style={{ background: '#232F3E', color: '#ccc', textAlign: 'center', padding: '20px', fontSize: 12, marginTop: 20 }}>
        <div style={{ color: '#FF9900', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>ShopFlow.in</div>
        <div>© 2024 ShopFlow — E-Commerce Microservices Platform by Md Dilnawaj</div>
        <div style={{ marginTop: 4, color: '#888' }}>Powered by Docker · Kubernetes (EKS) · Jenkins · ArgoCD · Terraform</div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
