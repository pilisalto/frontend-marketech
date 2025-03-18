"use client";

import { Heart, ShoppingCart, Star, Truck, CreditCard, ImageOff } from "lucide-react";
import Link from "next/link";
import { Product } from "../../types";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import styles from "./ProductCard.module.css";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const originalPrice = product.precio * (1 + product.descuento/100);
  const cuotas = 18;
  const precioCuota = product.precio / cuotas;
  const [imageError, setImageError] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link href={`/producto/${product.id}`} className={styles.card}>
      {product.descuento > 0 && (
        <div className={styles.discountBadge}>
          {product.descuento}% OFF
        </div>
      )}
      <div className={styles.imageContainer}>
      {imageError ? (
          <div className={styles.fallbackImage}>
            <ImageOff size={48} />
            <p>Imagen no disponible</p>
          </div>
        ) : (
        <img src={product.imagen} alt={product.titulo} className={styles.image} onError={handleImageError}  />
      )}
        <div className={styles.actions}>
          <button 
            className={`${styles.wishlistButton} ${isInWishlist(product.id) ? styles.active : ''}`}
            onClick={handleWishlistClick}
            aria-label="Agregar a favoritos"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.category}>{product.categoria}</div>
        <span className={styles.name}>
          {product.titulo}
        </span>
        <p className={styles.description}>{product.descripcion}</p>
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={`${styles.star} ${index < product.rating ? '' : styles.starEmpty}`}
              fill={index < product.rating ? "currentColor" : "none"}
            />
          ))}
          <span className={styles.ratingCount}>(121)</span>
        </div>
        <div className={styles.pricingInfo}>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${product.precio.toLocaleString()}</span>
            {product.descuento > 0 && (
              <span className={styles.originalPrice}>${originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className={styles.financingInfo}>
            <div className={styles.installments}>
              <CreditCard size={16} />
              <span>{cuotas}x ${Math.round(precioCuota).toLocaleString()}</span>
            </div>
            {product.precio >= 200 && (
              <div className={styles.shipping}>
                <Truck size={16} />
                <span>Envío gratis</span>
              </div>
            )}
          </div>
        </div>
        <button 
          className={styles.addToCart}
          onClick={handleCartClick}
        >
          <ShoppingCart size={18} />
          Agregar al carrito
        </button>
      </div>
    </Link>
  );
}