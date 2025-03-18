"use client";

import { Search, ShoppingCart, User, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import CartDrawer from "../CartDrawer/CartDrawer";
import WishlistDrawer from "../WishlistDrawer/WishlistDrawer";
import Image from "next/image";
import styles from "./Header.module.css";

const bannerMessages = [
  "Hasta 18 cuotas sin interés",
  "Envío gratis en compras mayores a $200",
  "10% de descuento en tu primera compra",
  "Cyber Monday: Hasta 50% OFF",
];

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedSearch = useCallback(
    (value: string) => {
      const timer = setTimeout(() => {
        onSearch(value);
      }, 300);
      return () => clearTimeout(timer);
    },
    [onSearch]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % bannerMessages.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBanner}>
          <span className={`${styles.bannerMessage} ${isVisible ? styles.visible : ''}`}>
            {bannerMessages[currentMessageIndex]}
          </span>
        </div>
        <div className={styles.mainHeader}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/logo.png" 
              alt="Marketech" 
              width={180} 
              height={40} 
              priority
            />
          </Link>
          <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="¡Hola! ¿Qué estás buscando?"
              value={searchQuery}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            <button type="submit" aria-label="Buscar" className={styles.searchButton}>
              <Search size={20} />
            </button>
          </form>
          <div className={styles.userActions}>
            <button 
              aria-label="Favoritos"
              onClick={() => setIsWishlistOpen(true)}
              className={styles.actionButton}
            >
              <Heart size={24} />
              {mounted && wishlistItems > 0 && (
                <span className={styles.badge}>{wishlistItems}</span>
              )}
            </button>
            <button aria-label="Mi cuenta" className={styles.actionButton}>
              <User size={24} />
            </button>
            <button 
              className={styles.actionButton}
              aria-label="Carrito"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={24} />
              {mounted && cartItems > 0 && (
                <span className={styles.badge}>{cartItems}</span>
              )}
            </button>
          </div>
        </div>
      </header>
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
}