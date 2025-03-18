import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../app/components/ProductCard/ProductCard';
import { CartProvider } from '../../app/context/CartContext';
import { WishlistProvider } from '../../app/context/WishlistContext';
import { NotificationProvider } from '../../app/context/NotificationContext';

const mockProduct = {
  id: 1,
  titulo: "Test Product",
  descripcion: "Test Description",
  precio: 100,
  imagen: "https://example.com/image.jpg",
  rating: 4,
  categoria: "Test Category",
  descuento: 15
};

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <NotificationProvider>
      <WishlistProvider>
        <CartProvider>
          {component}
        </CartProvider>
      </WishlistProvider>
    </NotificationProvider>
  );
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.titulo)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.descripcion)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.precio.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.descuento}% OFF`)).toBeInTheDocument();
  });

  it('shows discount badge when product has discount', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText(`${mockProduct.descuento}% OFF`)).toBeInTheDocument();
  });

  it('shows correct original price when discounted', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const originalPrice = mockProduct.precio * (1 + mockProduct.descuento/100);
    expect(screen.getByText(`$${originalPrice.toLocaleString()}`)).toBeInTheDocument();
  });

  it('shows free shipping badge when price is above threshold', () => {
    const expensiveProduct = { ...mockProduct, precio: 250 };
    renderWithProviders(<ProductCard product={expensiveProduct} />);
    expect(screen.getByText('Envío gratis')).toBeInTheDocument();
  });

  it('does not show free shipping badge when price is below threshold', () => {
    const cheapProduct = { ...mockProduct, precio: 150 };
    renderWithProviders(<ProductCard product={cheapProduct} />);
    expect(screen.queryByText('Envío gratis')).not.toBeInTheDocument();
  });

  it('handles add to cart click', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const addToCartButton = screen.getByText('Agregar al carrito');
    fireEvent.click(addToCartButton);
    expect(screen.getByText('Producto agregado al carrito')).toBeInTheDocument();
  });

  it('handles add to wishlist click', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const wishlistButton = screen.getByLabelText('Agregar a favoritos');
    fireEvent.click(wishlistButton);
    expect(screen.getByText('Producto agregado a favoritos')).toBeInTheDocument();
  });
});