import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';

const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans antialiased selection:bg-amber-200 selection:text-stone-900">
          {/* Main Top Navigation */}
          <Navbar />

          {/* Core Page View Outlet */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Site Footer */}
          <Footer />

          {/* Floating Toast Feedback Notifications */}
          <ToastContainer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
