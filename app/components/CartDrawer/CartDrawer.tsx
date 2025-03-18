"use client";

import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import styles from "./CartDrawer.module.css";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart } = useCart();
  const FREE_SHIPPING_THRESHOLD = 200;

  const subtotal = items.reduce((sum, item) => 
    sum + (item.product.precio * item.quantity), 0
  );
  
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 30;
  const total = subtotal + shippingCost;
  
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.active : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>MI CARRITO</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.shippingProgress}>
          {remainingForFreeShipping > 0 ? (
            <p>¡TE FALTAN ${remainingForFreeShipping.toLocaleString()} PARA EL ENVÍO GRATIS!</p>
          ) : (
            <p>¡FELICITACIONES! TENÉS ENVÍO GRATIS</p>
          )}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.product.id} className={styles.item}>
                  <img 
                    src={item.product.imagen} 
                    alt={item.product.titulo}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3>{item.product.titulo}</h3>
                    <p className={styles.itemPrice}>${item.product.precio.toLocaleString()}</p>
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className={styles.quantityButton}
                        >
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className={styles.quantityButton}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
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
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Costo de envío</span>
                <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString()}`}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>TOTAL</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <button className={styles.checkoutButton}>
                FINALIZAR COMPRA
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyCart}>
            <ShoppingCart size={64} />
            <h3>TU CARRITO ESTÁ VACÍO</h3>
            <p>Aún no hay productos en tu carrito. ¿Quieres agregar uno?</p>
            <Link href="/" className={styles.browseButton} onClick={onClose}>
              VER OFERTAS
            </Link>
          </div>
        )}
      </div>
    </>
  );
}