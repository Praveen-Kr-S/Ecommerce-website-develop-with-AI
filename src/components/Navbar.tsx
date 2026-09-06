import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            id="nav-logo-link"
            to="/"
            className="flex items-center gap-2.5 text-stone-900 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-900 block leading-tight">
                Ecommerce Shop
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-stone-500 block leading-none">
                MiniShop Store
              </span>
            </div>
          </Link>

          {/* Search bar (Desktop & Tablet) */}
          <form
            onSubmit={handleQuickSearch}
            className="hidden md:flex flex-1 max-w-md mx-4 items-center relative"
          >
            <input
              id="nav-search-input"
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>

          {/* Navigation links & Cart */}
          <nav className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-1 sm:gap-2">
              <NavLink
                id="nav-link-home"
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-stone-900 bg-stone-100 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                id="nav-link-products"
                to="/products"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-stone-900 bg-stone-100 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`
                }
              >
                All Products
              </NavLink>
            </div>

            {/* Cart Button */}
            <Link
              id="nav-cart-btn"
              to="/cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold hidden xs:inline">Cart</span>
              <span
                id="nav-cart-badge"
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-stone-900 bg-amber-400 rounded-full"
              >
                {totalItems}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="nav-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        {/* Mobile Search & Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-stone-200 flex flex-col gap-3">
            <form onSubmit={handleQuickSearch} className="relative">
              <input
                id="mobile-nav-search-input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>
            <div className="flex flex-col gap-1 pt-2">
              <Link
                id="mobile-nav-home"
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                Home
              </Link>
              <Link
                id="mobile-nav-products"
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                All Products
              </Link>
              <Link
                id="mobile-nav-cart"
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100 flex items-center justify-between"
              >
                <span>Shopping Cart</span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-stone-200 text-stone-800">
                  {totalItems}
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
