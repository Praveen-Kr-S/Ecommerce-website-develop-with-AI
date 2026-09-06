import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-stone-900 text-white mt-4 mx-4 sm:mx-6 lg:mx-8">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Quality Goods • 2026 Collection</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Curated Essentials for{' '}
              <span className="text-amber-400 underline decoration-stone-700 decoration-wavy underline-offset-8">
                Modern Living
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed">
              Discover handpicked electronics, premium apparel, handcrafted footwear, and refined home goods designed for effortless everyday performance.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                id="hero-shop-now-btn"
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-amber-400 text-stone-950 font-bold text-sm sm:text-base hover:bg-amber-300 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                id="hero-explore-categories-btn"
                to="/products?category=Electronics"
                className="px-6 py-3.5 rounded-xl bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-sm sm:text-base hover:bg-stone-700 hover:text-white transition-all"
              >
                Explore Electronics
              </Link>
            </div>

            {/* Quick Micro-stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800 text-xs sm:text-sm">
              <div>
                <span className="block text-xl sm:text-2xl font-black text-white">15+</span>
                <span className="text-stone-400">Curated Items</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-amber-400">4.8★</span>
                <span className="text-stone-400">Average Rating</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-white">$0</span>
                <span className="text-stone-400">Free Shipping $50+</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                alt="Featured Product Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-stone-900/90 backdrop-blur border border-stone-700 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">
                    Top Trending
                  </span>
                  <span className="text-sm font-bold text-white">Noise-Canceling Headphones</span>
                </div>
                <span className="text-lg font-black text-white">$189.99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">Explore by Category</h2>
            <p className="text-sm text-stone-500">Quickly jump to your favorite department</p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-stone-900 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.filter((c) => c !== 'All').map((category) => (
            <Link
              key={category}
              id={`home-category-${category.toLowerCase()}`}
              to={`/products?category=${category}`}
              className="group p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-900 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-amber-100 group-hover:text-amber-700 text-stone-700 flex items-center justify-center transition-colors">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-stone-900 group-hover:text-stone-950">
                {category}
              </span>
              <span className="text-[11px] text-stone-400">
                {PRODUCTS.filter((p) => p.category === category).length} products
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900">Featured Products</h2>
              <p className="text-sm text-stone-500">Top-rated picks recommended by our customers</p>
            </div>
          </div>

          <Link
            id="featured-see-all-btn"
            to="/products"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-4 h-4" />
              Guaranteed Satisfaction
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Ready to upgrade your everyday setup?
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              Order today and enjoy complimentary fast shipping on all orders over $50. Plus, test your items risk-free with our 30-day money-back guarantee.
            </p>
          </div>

          <Link
            id="banner-shop-now-btn"
            to="/products"
            className="px-6 py-3.5 rounded-xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 active:scale-95 transition-all shrink-0 shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};
