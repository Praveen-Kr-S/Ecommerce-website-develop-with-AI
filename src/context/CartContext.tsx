import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ShippingDetails } from '../types';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  orders: Order[];
  placeOrder: (shippingDetails: ShippingDetails) => Order;
  getOrder: (orderId: string) => Order | undefined;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const CART_STORAGE_KEY = 'ecommerce_shop_cart_v1';
const ORDERS_STORAGE_KEY = 'ecommerce_shop_orders_v1';
const FREE_SHIPPING_THRESHOLD = 50;
const FLAT_SHIPPING_FEE = 4.99;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  // Initialize orders from localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage:', e);
    }
    return [];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  }, [orders]);

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });

    addToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart!`);
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (item) {
      addToast(`Removed "${item.product.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + Number((item.product.price * item.quantity).toFixed(2)),
    0
  );

  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const total = Number((subtotal + shipping).toFixed(2));

  const placeOrder = (shippingDetails: ShippingDetails): Order => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal,
      shipping,
      total,
      shippingDetails,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrder = (orderId: string): Order | undefined => {
    return orders.find((o) => o.id === orderId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        orders,
        placeOrder,
        getOrder,
        toasts,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
