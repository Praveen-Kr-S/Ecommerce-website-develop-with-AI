import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">
          The item you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const cartItem = cart.find((item) => item.product.id === product.id);
  const currentInCart = cartItem?.quantity || 0;

  // Related items from same category (excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between gap-4 text-xs text-stone-500">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 font-medium text-stone-700 hover:text-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2">
          <Link to="/" className="hover:text-stone-900">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-stone-900">
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-stone-900"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Large Product Image Showcase */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group">
            <img
              id="product-details-image"
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-md bg-stone-900/85 backdrop-blur text-white">
                {product.category}
              </span>
              {product.isFeatured && (
                <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-md bg-amber-400 text-stone-900">
                  Featured Choice
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product Details & Purchase Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-900">
                {product.rating.toFixed(1)} / 5.0
              </span>
              <span className="text-xs text-stone-400">
                ({product.reviewCount} verified reviews)
              </span>
            </div>

            <h1
              id="product-details-title"
              className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight"
            >
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-1">
              <span id="product-details-price" className="text-3xl font-black text-stone-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                In Stock & Ready to Ship
              </span>
            </div>
          </div>

          <p id="product-details-description" className="text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Key Features List */}
          {product.features && product.features.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2.5">
                Key Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                {product.features.map((feat, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity selector & Add to Cart */}
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Select Quantity:
              </span>
              <div className="flex items-center border border-stone-300 bg-white rounded-lg shadow-sm">
                <button
                  id="qty-decrease-btn"
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="p-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span id="product-quantity-display" className="w-12 text-center text-sm font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  id="qty-increase-btn"
                  type="button"
                  onClick={handleIncrement}
                  className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                id="details-add-to-cart-btn"
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span>Add {quantity} to Cart • ${(product.price * quantity).toFixed(2)}</span>
              </button>

              {currentInCart > 0 && (
                <Link
                  id="details-view-cart-btn"
                  to="/cart"
                  className="py-3.5 px-5 rounded-xl bg-amber-400 text-stone-950 font-bold text-sm hover:bg-amber-300 text-center transition-all shadow-sm"
                >
                  Go to Cart ({currentInCart})
                </Link>
              )}
            </div>

            {currentInCart > 0 && (
              <p className="text-xs text-stone-500 text-center sm:text-left">
                You already have <strong className="text-stone-900">{currentInCart}</strong> of this item in your shopping cart.
              </p>
            )}
          </div>

          {/* Delivery & Security Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-stone-600">
            <div className="p-3 bg-white border border-stone-200 rounded-lg text-center space-y-1">
              <Truck className="w-4 h-4 mx-auto text-amber-600" />
              <p className="text-[11px] font-bold text-stone-900">Fast Shipping</p>
              <p className="text-[10px] text-stone-500">Free over $50</p>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-lg text-center space-y-1">
              <RotateCcw className="w-4 h-4 mx-auto text-amber-600" />
              <p className="text-[11px] font-bold text-stone-900">30-Day Return</p>
              <p className="text-[10px] text-stone-500">100% Refundable</p>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-lg text-center space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-amber-600" />
              <p className="text-[11px] font-bold text-stone-900">Authentic</p>
              <p className="text-[10px] text-stone-500">100% Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900">Similar in {product.category}</h2>
            <Link
              to={`/products?category=${product.category}`}
              className="text-xs font-semibold text-stone-700 hover:text-stone-900 underline underline-offset-4"
            >
              View all {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
