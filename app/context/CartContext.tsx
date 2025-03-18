"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { useNotification } from './NotificationContext';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getItemQuantity: (productId: number) => number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'marketech_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [lastAction, setLastAction] = useState<{ type: string; productId?: number } | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    if (lastAction) {
      switch (lastAction.type) {
        case 'add':
          showNotification('success', 'Producto agregado al carrito');
          break;
        case 'update':
          showNotification('success', 'Cantidad actualizada en el carrito');
          break;
        case 'remove':
          showNotification('success', 'Producto eliminado del carrito');
          break;
      }
      setLastAction(null);
    }
  }, [lastAction, showNotification]);

  const addToCart = (product: Product, quantity: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        setLastAction({ type: 'update', productId: product.id });
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      setLastAction({ type: 'add', productId: product.id });
      return [...currentItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(currentItems => {
      setLastAction({ type: 'remove', productId });
      return currentItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems(currentItems => {
      if (quantity <= 0) {
        setLastAction({ type: 'remove', productId });
        return currentItems.filter(item => item.product.id !== productId);
      }

      setLastAction({ type: 'update', productId });
      return currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const getItemQuantity = (productId: number) => {
    return items.find(item => item.product.id === productId)?.quantity || 0;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getItemQuantity,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}