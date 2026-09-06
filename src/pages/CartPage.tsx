import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
    totalItems,
    freeShippingThreshold,
  } = useCart();
  const navigate = useNavigate();

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">Your Shopping Cart is Empty</h1>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our curated catalog of electronics, fashion, and home goods!
          </p>
        </div>
        <Link
          id="cart-start-shopping-btn"
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">Shopping Cart</h1>
          <p className="text-sm text-stone-500 mt-1">
            You have <strong className="text-stone-900">{totalItems}</strong> item
            {totalItems > 1 ? 's' : ''} in your cart
          </p>
        </div>

        <button
          id="cart-clear-all-btn"
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-stone-500 hover:text-red-600 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear entire cart</span>
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-stone-800">
            <Truck className="w-4 h-4 text-amber-500" />
            {amountNeededForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-stone-900">${amountNeededForFreeShipping.toFixed(2)}</strong> more to get{' '}
                <span className="text-emerald-700 font-bold">FREE Shipping</span>!
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                🎉 Congratulations! You have unlocked FREE Shipping!
              </span>
            )}
          </div>
          <span className="text-stone-500">{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 transition-all duration-300 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="border border-stone-200 rounded-xl divide-y divide-stone-200 bg-white overflow-hidden shadow-sm">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                id={`cart-item-${product.id}`}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-stone-50/50"
              >
                {/* Product Image & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <Link
                    to={`/product/${product.id}`}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="min-w-0 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {product.category}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="block font-semibold text-stone-900 text-sm hover:text-stone-700 transition-colors truncate"
                      title={product.name}
                    >
                      {product.name}
                    </Link>
                    <div className="text-xs text-stone-500">
                      ${product.price.toFixed(2)} each
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-lg bg-white shadow-xs">
                    <button
                      id={`cart-qty-decrease-${product.id}`}
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span
                      id={`cart-qty-val-${product.id}`}
                      className="w-10 text-center text-xs font-bold text-stone-900"
                    >
                      {quantity}
                    </span>
                    <button
                      id={`cart-qty-increase-${product.id}`}
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal for Item */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-sm font-bold text-stone-900 block">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    id={`cart-remove-btn-${product.id}`}
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label={`Remove ${product.name} from cart`}
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/products"
              className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-4">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm sticky top-24">
            <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span id="cart-subtotal-display" className="font-semibold text-stone-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Shipping Fee</span>
                <span id="cart-shipping-display" className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span className="text-stone-900">${shipping.toFixed(2)}</span>
                  )}
                </span>
              </div>

              <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline">
                <span className="text-base font-bold text-stone-900">Total</span>
                <span id="cart-total-display" className="text-2xl font-black text-stone-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              id="cart-proceed-checkout-btn"
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick badges */}
            <div className="pt-2 border-t border-stone-200 space-y-2 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted & secure order placement</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-stone-600 shrink-0" />
                <span>30-Day worry-free returns guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
