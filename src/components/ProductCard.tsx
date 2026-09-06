import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart } = useCart();
  const cartItem = cart.find((item) => item.product.id === product.id);
  const isInCart = Boolean(cartItem);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-stone-300"
    >
      {/* Product Image Link */}
      <Link
        id={`product-image-link-${product.id}`}
        to={`/product/${product.id}`}
        className="relative block aspect-square bg-stone-100 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-md bg-stone-900/80 backdrop-blur text-white">
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-amber-400 text-stone-900">
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-stone-800">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-stone-400">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <Link
            id={`product-title-link-${product.id}`}
            to={`/product/${product.id}`}
            className="block font-semibold text-stone-900 text-base line-clamp-1 group-hover:text-stone-700 transition-colors mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Short description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Footer with Price and Add to Cart */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-stone-400 block leading-none mb-1">Price</span>
            <span className="text-lg font-bold text-stone-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            type="button"
            onClick={() => addToCart(product, 1)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isInCart
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added ({cartItem?.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
