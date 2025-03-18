"use client";

import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/logo.png" 
              alt="Marketech" 
              width={120} 
              height={25} 
              priority
            />
          </Link>
          <p>0800-12345-123</p>
          <p>Lun-Dom 08:00 a 19:00</p>
          <p>marketech@contacto.com</p>
        </div>

        <div className={styles.section}>
          <h3>Cobranza de créditos</h3>
          <p>cobranza@marketech.com</p>
        </div>

        <div className={styles.section}>
          <h3>Venta telefónica</h3>
          <p>0800-12345-123</p>
          <p>Lun-Dom 08:00 a 19:00</p>
        </div>

        <div className={styles.section}>
          <h3>Servicios a empresas</h3>
          <p>Ventas corporativas</p>
        </div>
      </div>

      <div className={styles.links}>
        <div className={styles.group}>
          <h4>Comprar en Marketech</h4>
          <ul>
            <li><Link href="/">Servicio técnico</Link></li>
            <li><Link href="/">Información legal</Link></li>
            <li><Link href="/">Protección de usuarios financieros</Link></li>
          </ul>
        </div>

        <div className={styles.group}>
          <h4>Ayuda</h4>
          <ul>
            <li><Link href="/">Centro de ayuda</Link></li>
            <li><Link href="/">Sucursales</Link></li>
            <li><Link href="/">Preguntas Frecuentes</Link></li>
            <li><Link href="/">Medios de pago</Link></li>
            <li><Link href="/">Métodos de envío</Link></li>
            <li><Link href="/">Trabajá con nosotros</Link></li>
          </ul>
        </div>

        <div className={styles.group}>
          <h4>Políticas</h4>
          <ul>
            <li><Link href="/">Políticas de privacidad y seguridad</Link></li>
            <li><Link href="/">Políticas de cambio y devolución</Link></li>
            <li><button className={styles.btnLink}>BOTÓN DE ARREPENTIMIENTO</button></li>
          </ul>
        </div>

        <div className={styles.group}>
          <h4>Nuestros partners</h4>
          <ul>
            <li><Link href="/">Disfrutá de beneficios exclusivos</Link></li>
          </ul>
        </div>

        <div className={`${styles.group} ${styles.newsletterGroup}`}>
          <h4>Recibí ofertas y promociones</h4>
          <form className={styles.newsletter} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Ingresá tu email" />
            <button type="submit">SUSCRIBIRME</button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.socialLinks}>
          <Link href="/" aria-label="Facebook"><Facebook size={20} /></Link>
          <Link href="/" aria-label="Instagram"><Instagram size={20} /></Link>
          <Link href="/" aria-label="YouTube"><Youtube size={20} /></Link>
          <Link href="/" aria-label="Twitter"><Twitter size={20} /></Link>
        </div>
      </div>
    </footer>
  );
}