import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Query parameter syncing
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(searchParam);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Keep state in sync if URL params change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Handle category change
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  // Handle search input
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val.trim()) {
      newParams.delete('search');
    } else {
      newParams.set('search', val);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search match (name, description, category)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">
            Products Catalog
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Browse our entire collection of {PRODUCTS.length} curated products
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label htmlFor="sort-by-select" className="text-xs font-semibold text-stone-500 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </label>
          <select
            id="sort-by-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs font-medium bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 shadow-sm"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <input
            id="products-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by product name, keywords, or department..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 shadow-sm transition-all"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              id="clear-search-btn"
              type="button"
              onClick={() => handleSearchChange('')}
              className="p-1 text-stone-400 hover:text-stone-700 absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            Categories:
          </span>
          {CATEGORIES.map((category) => {
            const isSelected =
              selectedCategory.toLowerCase() === category.toLowerCase() ||
              (category === 'All' && (!selectedCategory || selectedCategory === 'All'));

            return (
              <button
                key={category}
                id={`category-filter-${category.toLowerCase()}`}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Metrics & Active Filters Bar */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
        <span id="products-count-indicator">
          Showing <strong className="text-stone-900">{filteredProducts.length}</strong> of{' '}
          {PRODUCTS.length} products
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(selectedCategory !== 'All' || searchQuery) && (
          <button
            id="reset-all-filters-btn"
            type="button"
            onClick={handleClearFilters}
            className="text-stone-700 hover:text-red-600 font-semibold underline underline-offset-2 flex items-center gap-1"
          >
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div
          id="products-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          id="no-products-found"
          className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-stone-200 flex items-center justify-center text-stone-500 mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-1">No products found</h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
            We couldn't find anything matching your search criteria. Try checking for typos or clear your filters.
          </p>
          <button
            id="empty-state-reset-btn"
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Reset Filters & View All
          </button>
        </div>
      )}
    </div>
  );
};
