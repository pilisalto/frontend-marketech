"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "../../data/products";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProductDetailSkeleton from "../../components/ProductDetailSkeleton/ProductDetailSkeleton";
import { Product } from "../../types/index";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    setIsLoading(true);

    const productId = Number(params.id);
    if (isNaN(productId)) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const foundProduct = products.find((p) => p.id === productId);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }, 1000);
  }, [params]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const relatedProducts = products.filter(
    (p) => p.categoria === product.categoria && p.id !== product.id
  );

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
