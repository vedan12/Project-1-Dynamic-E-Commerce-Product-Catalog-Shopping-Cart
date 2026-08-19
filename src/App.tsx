import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductPage } from './pages/Product';
import { CartPage } from './pages/Cart';
import { PaymentPage } from './pages/Payment';
import { About } from './pages/About';
import { Brands } from './pages/Brands';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Account } from './pages/Account';
import { Admin } from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useCart } from './useCart';

function App() {
  const cart = useCart();
  const [search, setSearch] = useState('');

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <Header totalItems={cart.totalItems} search={search} onSearch={setSearch} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop cart={cart} search={search} setSearch={setSearch} />} />
          <Route path="/product/:id" element={<ProductPage cart={cart} />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage cart={cart} />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
