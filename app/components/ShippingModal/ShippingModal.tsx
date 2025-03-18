"use client";

import { X, Truck, Clock, MapPin, Package, Info } from "lucide-react";
import styles from "./ShippingModal.module.css";

interface ShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShippingModal({ isOpen, onClose }: ShippingModalProps) {
  if (!isOpen) return null;

  const shippingOptions = [
    {
      title: "Envío estándar a domicilio",
      icon: <Truck size={24} />,
      time: "3-5 días hábiles",
      cost: "Gratis en compras mayores a $200",
      details: [
        "Envío a todo el país",
        "Seguimiento en tiempo real",
        "Entrega en la puerta de tu casa",
        "Notificaciones por email y SMS"
      ]
    },
    {
      title: "Envío express",
      icon: <Clock size={24} />,
      time: "24-48 horas",
      cost: "$50",
      details: [
        "Disponible solo para CABA y GBA",
        "Entrega garantizada en 48hs",
        "Prioridad en el despacho",
        "Seguimiento en tiempo real"
      ]
    },
    {
      title: "Retiro en punto de entrega",
      icon: <Package size={24} />,
      time: "3-5 días hábiles",
      cost: "Gratis",
      details: [
        "Más de 1000 puntos de retiro",
        "Horarios extendidos",
        "Sin costo adicional",
        "15 días para retirar"
      ]
    },
    {
      title: "Retiro en sucursal",
      icon: <MapPin size={24} />,
      time: "24 horas",
      cost: "Gratis",
      details: [
        "Stock inmediato",
        "Retiro en el momento",
        "Verificación del producto en el lugar",
        "Asesoramiento personalizado"
      ]
    }
  ];

  return (
    <>
      <div 
        className={`${styles.modalOverlay} ${isOpen ? styles.active : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.modal} ${isOpen ? styles.active : ''}`}>
        <div className={styles.modalHeader}>
          <h2>Opciones de envío</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.shippingInfoBanner}>
            <Info size={20} />
            <p>Los tiempos de entrega pueden variar según la localidad y disponibilidad del producto</p>
          </div>
          
          <div className={styles.shippingOptionsGrid}>
            {shippingOptions.map((option, index) => (
              <div key={index} className={styles.shippingOption}>
                <div className={styles.shippingOptionHeader}>
                  <div className={styles.shippingOptionIcon}>
                    {option.icon}
                  </div>
                  <div className={styles.shippingOptionInfo}>
                    <h3>{option.title}</h3>
                    <p className={styles.deliveryTime}>{option.time}</p>
                  </div>
                  <span className={styles.shippingCost}>{option.cost}</span>
                </div>
                <ul className={styles.shippingDetails}>
                  {option.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}