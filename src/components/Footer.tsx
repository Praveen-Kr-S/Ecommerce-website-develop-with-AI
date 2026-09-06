import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800">
      {/* Value propositions banner */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Free Fast Delivery</h4>
                <p className="text-xs text-stone-400">On all orders over $50.00</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">30-Day Easy Returns</h4>
                <p className="text-xs text-stone-400">Hassle-free return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Secure Checkout</h4>
                <p className="text-xs text-stone-400">Protected order verification</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Customer Support</h4>
                <p className="text-xs text-stone-400">Always here to assist you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-950 font-black">
                <ShoppingBag className="w-4 h-4 text-stone-900" />
              </div>
              <span className="text-lg font-bold tracking-tight">Ecommerce Shop</span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed mb-4">
              Your trusted destination for premium electronics, effortless fashion, everyday essentials, and modern home decor. Built for simplicity and speed.
            </p>
            <div className="text-xs text-stone-400">
              <span className="inline-block px-2.5 py-1 bg-stone-800 rounded-md border border-stone-700">
                Data saved in browser localStorage
              </span>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Shop Categories
            </h5>
            <ul className="space-y-2 text-sm text-stone-400">
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${cat}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h5>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-amber-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-amber-400 transition-colors">
                  View Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Ecommerce Shop (MiniShop). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
