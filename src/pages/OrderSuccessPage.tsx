import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle,
  Package,
  MapPin,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Calendar,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder, orders } = useCart();

  // Retrieve current order or fallback to the latest saved order
  const order = (orderId ? getOrder(orderId) : undefined) || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Order Information Unavailable</h2>
        <p className="text-sm text-stone-500">
          We could not find the details for this order. It may have expired or was placed in a different browser session.
        </p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800"
        >
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Success Banner */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-10 h-10 stroke-[2.2]" />
        </div>
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Confirmed & Placed
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-stone-500 max-w-md mx-auto mt-2">
            Your order has been received and saved locally. We are preparing your items for swift delivery.
          </p>
        </div>

        {/* Order ID Badge */}
        <div className="inline-flex items-center gap-2 p-3 bg-stone-100 rounded-xl border border-stone-200">
          <span className="text-xs text-stone-500">Order ID:</span>
          <span id="order-id-display" className="text-xs sm:text-sm font-mono font-bold text-stone-900">
            {order.id}
          </span>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-stone-100 text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Delivery Address</span>
            </div>
            <p className="font-semibold text-stone-800">{order.shippingDetails.fullName}</p>
            <p className="text-stone-600">{order.shippingDetails.address}</p>
            <p className="text-stone-600">
              {order.shippingDetails.city} - {order.shippingDetails.pincode}
            </p>
            <p className="text-stone-500 pt-1">
              {order.shippingDetails.phone} • {order.shippingDetails.email}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
              <CreditCard className="w-3.5 h-3.5 text-amber-500" />
              <span>Payment & Time</span>
            </div>
            <p className="font-semibold text-stone-800">{order.shippingDetails.paymentMethod}</p>
            <div className="flex items-center gap-1 text-stone-500 pt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{order.date}</span>
            </div>
            <p className="text-emerald-700 font-medium pt-1">Status: Processing</p>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-500" />
            <span>Ordered Items ({order.items.length})</span>
          </h2>

          <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
            {order.items.map(({ product, quantity }) => (
              <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-stone-900 truncate">{product.name}</p>
                    <p className="text-[11px] text-stone-500">
                      Qty: {quantity} × ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-stone-900 shrink-0">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-2 text-xs text-stone-600 bg-stone-50 p-4 rounded-xl">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-stone-900">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold">
              {order.shipping === 0 ? (
                <span className="text-emerald-700 font-bold">FREE</span>
              ) : (
                <span className="text-stone-900">${order.shipping.toFixed(2)}</span>
              )}
            </span>
          </div>
          <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline">
            <span className="text-sm font-bold text-stone-900">Total Paid / Due</span>
            <span id="order-success-total" className="text-xl font-black text-stone-900">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          id="continue-shopping-btn"
          to="/products"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-semibold text-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};
