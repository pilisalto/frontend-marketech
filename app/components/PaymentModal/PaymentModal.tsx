"use client";

import { X, CreditCard, Wallet, Building2, QrCode } from "lucide-react";
import styles from "./PaymentModal.module.css";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  if (!isOpen) return null;

  const paymentMethods = [
    {
      title: "Tarjetas de crédito",
      icon: <CreditCard size={24} />,
      options: [
        "Hasta 18 cuotas sin interés con Visa, Mastercard y American Express",
        "12 cuotas sin interés con todas las tarjetas",
        "3 y 6 cuotas sin interés en todos los productos",
        "Visa | Mastercard | American Express | Naranja"
      ]
    },
    {
      title: "Tarjetas de débito",
      icon: <Building2 size={24} />,
      options: [
        "Visa Débito",
        "Mastercard Débito",
        "Cabal Débito",
        "Maestro"
      ]
    },
    {
      title: "Efectivo",
      icon: <Wallet size={24} />,
      options: [
        "Pago Fácil",
        "Rapipago",
        "Efectivo en puntos de pago",
        "Depósito o transferencia bancaria"
      ]
    },
    {
      title: "Billeteras digitales",
      icon: <QrCode size={24} />,
      options: [
        "Mercado Pago",
        "Todo Pago",
        "Ualá",
        "MODO"
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
          <h2>Medios de pago</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.paymentMethodsGrid}>
            {paymentMethods.map((method, index) => (
              <div key={index} className={styles.paymentMethod}>
                <div className={styles.paymentMethodHeader}>
                  <div className={styles.paymentMethodIcon}>
                    {method.icon}
                  </div>
                  <h3>{method.title}</h3>
                </div>
                <ul className={styles.paymentOptions}>
                  {method.options.map((option, i) => (
                    <li key={i}>{option}</li>
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