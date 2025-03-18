"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types";
import styles from "./ProductList.module.css";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";

interface ProductListProps {
  products: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  onCategorySelect: (category: string | null) => void;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onClearFilters: () => void;
}

export default function ProductList({ 
  products, 
  selectedCategory, 
  searchQuery, 
  onCategorySelect,
  isLoading,
  error,
  onRetry,
  onClearFilters
}: ProductListProps) {
  const categories = Array.from(new Set(products.map(product => product.categoria)));

  return (
    <div className={styles.container}>
      <div className={styles.categoryFilters}>
        <button
          className={`${styles.categoryButton} ${selectedCategory === null ? styles.active : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          Todos
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className={styles.grid}>
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <Search size={48} className={styles.errorIcon} />
            <h2 className={styles.errorTitle}>¡Ups! Algo salió mal</h2>
            <p className={styles.errorMessage}>{error}</p>
            <button 
              onClick={onRetry} 
              className={styles.retryButton}
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <Search size={48} className={styles.noResultsIcon} />
          <h2 className={styles.noResultsTitle}>
            No encontramos resultado para &quot;{searchQuery}&quot;
          </h2>
          <p className={styles.noResultsSubtitle}>
            Puedes revisar si está bien escrito o intentar alguna de estas soluciones
          </p>
          <ul className={styles.noResultsSuggestions}>
            <li>Si tipeaste la URL, asegurate que la ortografía sea la correcta.</li>
            <li>Si clickeaste en un link y nos ves información, es porque se trasladó el contenido.</li>
            <li>Probá usando nuestro buscador para encontrar lo que necesitás.</li>
            <li>Si no estás seguro de cómo llegaste hasta acá, volvé a la página anterior o a la de inicio.</li>
          </ul>
      <button
        onClick={onClearFilters}
        className={styles.noResultsButton}
      >
        VOLVER AL LISTADO DE PRODUCTOS
      </button>
        </div>
      )}
    </div>
  );
}