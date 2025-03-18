"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      className={styles.backButton}
      aria-label="Volver atrás"
    >
      <ArrowLeft size={20} />
      <span>Volver</span>
    </button>
  );
}