import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShippingDetails } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shipping, total, placeOrder } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect or prompt user
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Your Cart is Empty</h2>
        <p className="text-sm text-stone-500">
          You need to add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingDetails, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Postal/Pincode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate swift instant local processing
    setTimeout(() => {
      const newOrder = placeOrder(formData);
      setIsSubmitting(false);
      navigate(`/order-success/${newOrder.id}`);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Cart</span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">Secure Checkout</h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Local client-side simulated checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Shipping & Payment Details Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Customer & Delivery Information */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Truck className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-stone-900">1. Shipping & Customer Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-fullName"
                  className="block text-xs font-semibold text-stone-700 mb-1.5"
                >
                  Customer Full Name *
                </label>
                <input
                  id="checkout-fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                    errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                  } focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-xs font-semibold text-stone-700 mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="checkout-email"
                  name="email"
                  type="email"
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                    errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                  } focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all`}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-semibold text-stone-700 mb-1.5"
                >
                  Phone Number *
                </label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-1234"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                    errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                  } focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all`}
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold text-stone-700 mb-1.5"
                >
                  Street Address / Apt / Suite *
                </label>
                <input
                  id="checkout-address"
                  name="address"
                  type="text"
                  placeholder="124 Market Street, Apt 4B"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                    errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                  } focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all`}
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="checkout-city"
                  className="block text-xs font-semibold text-stone-700 mb-1.5"
                >
                  City *
                </label>
                <input
                  id="checkout-city"
                  name="city"
                  type="text"
                  placeholder="San Francisco"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                    errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                  } focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all`}
                />
                {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
              </div>

              {/* Pincode */}
              <div>
                <label
                  htmlFor="checkout-pincode"
                  className="block text-xs font-semibold text-stone-700 mb-1.5"
                >
                  Pincode / Postal Code *
                </label>
                <input
                  id="checkout-pincode"
                  name="pincode"
                  type="text"
                  placeholder="94103"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white border ${
                    errors.pincode ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                  } focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all`}
                />
                {errors.pincode && (
                  <p className="text-xs text-red-600 mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <CreditCard className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-stone-900">2. Payment Method</h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'pay-cod',
                  value: 'Cash on Delivery',
                  label: 'Cash on Delivery (COD)',
                  desc: 'Pay safely with cash or card upon product arrival.',
                },
                {
                  id: 'pay-card',
                  value: 'Card on Delivery',
                  label: 'Card POS on Delivery',
                  desc: 'Delivery agent carries contactless terminal.',
                },
                {
                  id: 'pay-demo-pay',
                  value: 'Direct Demo Pay',
                  label: 'Instant Test Checkout',
                  desc: 'Simulate instant confirmation with zero charges.',
                },
              ].map((option) => (
                <label
                  key={option.id}
                  htmlFor={option.id}
                  className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === option.value
                      ? 'border-stone-900 bg-stone-50/70 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    id={option.id}
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={formData.paymentMethod === option.value}
                    onChange={handleChange}
                    className="mt-1 text-stone-900 focus:ring-stone-900"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-tight">
                      {option.label}
                    </span>
                    <span className="text-xs text-stone-500 block mt-0.5">{option.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Review & Place Order Button */}
        <div className="lg:col-span-5">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-6 shadow-sm sticky top-24">
            <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-3">
              Order Review ({cart.length} item{cart.length > 1 ? 's' : ''})
            </h2>

            {/* Item Previews */}
            <div className="max-h-64 overflow-y-auto divide-y divide-stone-200 pr-1 space-y-3">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-stone-900 truncate">{product.name}</p>
                    <p className="text-[11px] text-stone-500">
                      Qty: {quantity} × ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-900 shrink-0">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-stone-200 pt-4 space-y-2.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    <span className="text-stone-900">${shipping.toFixed(2)}</span>
                  )}
                </span>
              </div>
              <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-stone-900">Total Due</span>
                <span id="checkout-total-amount" className="text-2xl font-black text-stone-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              id="place-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-amber-400 text-stone-950 font-bold text-sm hover:bg-amber-300 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
            >
              {isSubmitting ? (
                <span>Securing Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-stone-950" />
                  <span>Place Order • ${total.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              <span>Saves order to localStorage and clears cart</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
