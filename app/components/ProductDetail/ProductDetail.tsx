"use client";

import { useState } from "react";
import { ChevronDown, Minus, Plus, CreditCard, Truck, ShoppingCart, Heart, ImageOff } from "lucide-react";
import { Product } from "../../types";
import ProductCard from "../ProductCard/ProductCard";
import Header from "../Header/Header";
import BackButton from "../BackButton/BackButton";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import PaymentModal from "../PaymentModal/PaymentModal";
import ShippingModal from "../ShippingModal/ShippingModal";
import styles from "./ProductDetail.module.css";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const cuotas = 18;
  const precioCuota = product.precio / cuotas;
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const originalPrice = product.precio * (1 + product.descuento/100);
  const [imageError, setImageError] = useState(false);

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <main>
      <Header onSearch={() => {}} />
      <div className={styles.container}>
        <BackButton />
        <div className={styles.main}>
          <div className={styles.gallery}>
            <div className={styles.imageContainer}>
            {imageError ? (
          <div className={styles.fallbackImage}>
            <ImageOff size={100} />
            <p>Imagen no disponible</p>
          </div>
        ) : (
          <img src={product.imagen} alt={product.titulo} className={styles.mainImage} onError={handleImageError}/>
        )}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.breadcrumb}>
              INICIO / {product.categoria.toUpperCase()}
            </div>
            <h1 className={styles.title}>{product.titulo}</h1>
            <div className={styles.priceDetail}>
              <div className={styles.discountTag}>{product.descuento}% OFF</div>
              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>${product.precio.toLocaleString()}</span>
                <span className={styles.originalPrice}>${originalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className={styles.paymentOptions}>
              <div className={styles.installmentsInfo}>
                <CreditCard size={20} />
                <div>
                  <div className={styles.installmentTitle}>
                    {cuotas}x ${Math.round(precioCuota).toLocaleString()} sin interés
                  </div>
                  <button 
                    className={styles.seeOptions}
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    Ver medios de pago
                  </button>
                </div>
              </div>
              <div className={styles.shippingInfo}>
                <Truck size={20} />
                <div>
                  <div className={styles.shippingTitle}>
                    {product.precio >= 200 ? 'Envío gratis' : 'Envío gratis en compras mayores a $200'}
                  </div>
                  <button 
                    className={styles.seeOptions}
                    onClick={() => setIsShippingModalOpen(true)}
                  >
                    Ver opciones de envío
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.purchaseActions}>
              <div className={styles.quantitySelector}>
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className={styles.quantityButton}
                >
                  <Minus size={20} />
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className={styles.quantityButton}
                >
                  <Plus size={20} />
                </button>
              </div>
              <button className={styles.addToCartButton} onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Agregar al carrito
              </button>
            </div>

            <button 
              className={`${styles.wishlistButtonFull} ${isInWishlist(product.id) ? styles.active : ''}`}
              onClick={() => addToWishlist(product)}
            >
              <Heart size={20} />
              {isInWishlist(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>

            <div className={styles.details}>
              <div className={styles.detailSection}>
                <button 
                  className={styles.detailHeader}
                  onClick={() => toggleTab('description')}
                >
                  <span>Descripción</span>
                  <ChevronDown 
                    size={20} 
                    className={`${styles.icon} ${activeTab === 'description' ? styles.rotated : ''}`}
                  />
                </button>
                {activeTab === 'description' && (
                  <div className={styles.detailContent}>
                    {product.descripcion}
                  </div>
                )}
              </div>

              <div className={styles.detailSection}>
                <button 
                  className={styles.detailHeader}
                  onClick={() => toggleTab('characteristics')}
                >
                  <span>Características</span>
                  <ChevronDown 
                    size={20} 
                    className={`${styles.icon} ${activeTab === 'characteristics' ? styles.rotated : ''}`}
                  />
                </button>
                {activeTab === 'characteristics' && (
                  <div className={styles.detailContent}>
                    <div className={styles.characteristicItem}>
                      <span className={styles.characteristicLabel}>Categoría:</span>
                      <span className={styles.characteristicValue}>{product.categoria}</span>
                    </div>
                    <div className={styles.characteristicItem}>
                      <span className={styles.characteristicLabel}>Rating:</span>
                      <span className={styles.characteristicValue}>{product.rating} estrellas</span>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.detailSection}>
                <button 
                  className={styles.detailHeader}
                  onClick={() => toggleTab('shipping')}
                >
                  <span>Envío</span>
                  <ChevronDown 
                    size={20} 
                    className={`${styles.icon} ${activeTab === 'shipping' ? styles.rotated : ''}`}
                  />
                </button>
                {activeTab === 'shipping' && (
                  <div className={styles.detailContent}>
                    <p>Envío gratis en compras mayores a $200</p>
                    <p>Tiempo estimado de entrega: 3-5 días hábiles</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.relatedProducts}>
          <h2 className={styles.sectionTitle}>También te puede interesar</h2>
          <div className={styles.productsGrid}>
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
      
      <ShippingModal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
      />
    </main>
  );
}