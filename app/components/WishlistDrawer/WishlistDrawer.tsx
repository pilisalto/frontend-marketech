"use client";

import { X, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import styles from "./WishlistDrawer.module.css";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.active : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>MIS FAVORITOS</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        {items.length > 0 ? (
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <img 
                  src={item.imagen} 
                  alt={item.titulo}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.titulo}</h3>
                  <p className={styles.itemPrice}>${item.precio.toLocaleString()}</p>
                  <div className={styles.itemActions}>
                    <button 
                      onClick={() => {
                        addToCart(item, 1);
                        onClose();
                      }}
                      className={styles.addToCartButton}
                    >
                      <ShoppingCart size={16} />
                      Agregar al carrito
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className={styles.removeButton}
                    >
                      <X size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyWishlist}>
            <Heart size={64} />
            <h3>TU LISTA DE FAVORITOS ESTÁ VACÍA</h3>
            <p>¡Agrega productos a tu lista para comprarlos más tarde!</p>
            <Link href="/" className={styles.browseButton} onClick={onClose}>
              VER OFERTAS
            </Link>
          </div>
        )}
      </div>
    </>
  );
}