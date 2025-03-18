"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { useNotification } from './NotificationContext';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'marketech_wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });
  const [lastAction, setLastAction] = useState<{ type: string; productId: number } | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    if (lastAction) {
      showNotification(
        'success',
        lastAction.type === 'add' 
          ? 'Producto agregado a favoritos'
          : 'Producto eliminado de favoritos'
      );
      setLastAction(null);
    }
  }, [lastAction, showNotification]);

  const addToWishlist = (product: Product) => {
    setItems(currentItems => {
      const exists = currentItems.some(item => item.id === product.id);
      if (exists) {
        setLastAction({ type: 'remove', productId: product.id });
        return currentItems.filter(item => item.id !== product.id);
      }
      setLastAction({ type: 'add', productId: product.id });
      return [...currentItems, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems(currentItems => {
      setLastAction({ type: 'remove', productId });
      return currentItems.filter(item => item.id !== productId);
    });
  };

  const isInWishlist = (productId: number) => {
    return items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      totalItems: items.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}