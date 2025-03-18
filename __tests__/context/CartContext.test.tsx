import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../app/context/CartContext';
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

const TestComponent = () => {
  const { items, addToCart, removeFromCart, updateQuantity } = useCart();
  
  return (
    <div>
      <button onClick={() => addToCart(mockProduct, 1)}>Add to Cart</button>
      <button onClick={() => removeFromCart(mockProduct.id)}>Remove from Cart</button>
      <button onClick={() => updateQuantity(mockProduct.id, 2)}>Update Quantity</button>
      <span>Items: {items.length}</span>
      {items.map(item => (
        <div key={item.product.id}>
          <span>Quantity: {item.quantity}</span>
        </div>
      ))}
    </div>
  );
};

describe('CartContext', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <NotificationProvider>
        <CartProvider>
          {component}
        </CartProvider>
      </NotificationProvider>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('adds item to cart', () => {
    renderWithProviders(<TestComponent />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
  });

  it('removes item from cart', () => {
    renderWithProviders(<TestComponent />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Remove from Cart'));
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
  });

  it('updates item quantity', () => {
    renderWithProviders(<TestComponent />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Update Quantity'));
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
  });

  it('persists cart state in localStorage', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    unmount();

    const storedCart = JSON.parse(localStorage.getItem('marketech_cart') || '[]');
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0].product.id).toBe(mockProduct.id);
  });
});