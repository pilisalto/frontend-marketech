import { Product } from '../types';
import { products as mockProducts } from '../data/products';

const DELAY = 1500;

const ERROR_RATE = 0.1;

export async function getProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, DELAY));

  if (Math.random() < ERROR_RATE) {
    throw new Error('Error al cargar los productos. Por favor, intenta nuevamente.');
  }

  return mockProducts;
}

export async function getProductById(id: number): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, DELAY));

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  if (Math.random() < ERROR_RATE) {
    throw new Error('Error al cargar el producto. Por favor, intenta nuevamente.');
  }

  return product;
}

export async function getRelatedProducts(categoryId: string, excludeId: number): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, DELAY));

  if (Math.random() < ERROR_RATE) {
    throw new Error('Error al cargar productos relacionados. Por favor, intenta nuevamente.');
  }

  return mockProducts
    .filter(p => p.categoria === categoryId && p.id !== excludeId)
    .slice(0, 4);
}