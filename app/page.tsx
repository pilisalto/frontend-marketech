"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import { products } from "./data/products";

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const fetchProductsMock = (query: string, category: string | null): Promise<typeof products> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = products;

      if (query) {
        const searchTerms = removeAccents(query.toLowerCase()).split(" ");
        filtered = filtered.filter((product) =>
          searchTerms.every(
            (term) =>
              removeAccents(product.titulo.toLowerCase()).includes(term) ||
              removeAccents(product.descripcion.toLowerCase()).includes(term) ||
              removeAccents(product.categoria.toLowerCase()).includes(term)
          )
        );
      }

      if (category) {
        filtered = filtered.filter((product) => product.categoria === category);
      }

      resolve(filtered);
    }, 1000);
  });
};

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = (query: string, category: string | null) => {
    setIsLoading(true);
    setError(null);
    fetchProductsMock(query, category)
      .then(setFilteredProducts)
      .catch(() => setError("Error al cargar productos. Intenta nuevamente."))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProducts("", null);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadProducts(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    loadProducts(searchQuery, category);
  };

  const handleRetry = () => {
    loadProducts(searchQuery, selectedCategory);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    loadProducts("", null);
  };

  return (
    <main>
      <Header onSearch={handleSearch} />
      <ProductList
        products={filteredProducts}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategorySelect={handleCategoryFilter}
        isLoading={isLoading}
        error={error}
        onRetry={handleRetry}
        onClearFilters={handleClearFilters} 
      />
    </main>
  );
}
