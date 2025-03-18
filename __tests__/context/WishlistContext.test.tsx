import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistProvider, useWishlist } from '../../app/context/WishlistContext';
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
  const { items, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  return (
    <div>
      <button onClick={() => addToWishlist(mockProduct)}>Add to Wishlist</button>
      <button onClick={() => removeFromWishlist(mockProduct.id)}>Remove from Wishlist</button>
      <span>Items: {items.length}</span>
      <span>Is in wishlist: {isInWishlist(mockProduct.id).toString()}</span>
    </div>
  );
};

describe('WishlistContext', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <NotificationProvider>
        <WishlistProvider>
          {component}
        </WishlistProvider>
      </NotificationProvider>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('adds item to wishlist', () => {
    renderWithProviders(<TestComponent />);
    
    fireEvent.click(screen.getByText('Add to Wishlist'));
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
    expect(screen.getByText('Is in wishlist: true')).toBeInTheDocument();
  });

  it('removes item from wishlist', () => {
    renderWithProviders(<TestComponent />);
    
    fireEvent.click(screen.getByText('Add to Wishlist'));
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Remove from Wishlist'));
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
    expect(screen.getByText('Is in wishlist: false')).toBeInTheDocument();
  });

  it('toggles item in wishlist when adding twice', () => {
    renderWithProviders(<TestComponent />);
    
    fireEvent.click(screen.getByText('Add to Wishlist'));
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Add to Wishlist'));
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
  });

  it('persists wishlist state in localStorage', () => {
    const { unmount } = renderWithProviders(<TestComponent />);
    
    fireEvent.click(screen.getByText('Add to Wishlist'));
    unmount();

    const storedWishlist = JSON.parse(localStorage.getItem('marketech_wishlist') || '[]');
    expect(storedWishlist).toHaveLength(1);
    expect(storedWishlist[0].id).toBe(mockProduct.id);
  });
});