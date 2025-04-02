import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BookDetails from '../components/BookDetails/BookDetails';
import * as API from '../../src/utils/API';
import { ToastContainer } from 'react-toastify';

// Mock dependencies
jest.mock('../../src/utils/API', () => ({
  addWishlist: jest.fn(),
  removeWishlist: jest.fn(),
  getWishlist: jest.fn(),
  addToCart: jest.fn(),
}));

jest.mock('../components/BookDetails/Feedback', () => () => <div data-testid="mock-feedback">Feedback</div>);
jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="mock-toast">Toast</div>,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock image
jest.mock('../assets/images/bookImage.png', () => 'mock-book-image.png');

const mockBook = {
  _id: 'book1',
  bookName: 'Test Book',
  author: 'Test Author',
  discountPrice: 10,
  price: 15,
  pic: 'test-image.jpg',
  quantity: 100,
  description: 'Test description',
};

// Wrapper component for routing with consistent state
const renderWithRouter = (component: React.ReactNode, initialEntries = [{ pathname: '/book', state: { book: mockBook } }]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/book" element={component} />
        <Route path="/cart" element={<div>Cart Page</div>} />
        <Route path="/guest" element={<div>Guest Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('BookDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('mock-token');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders book details correctly', async () => {
    (API.getWishlist as jest.Mock).mockResolvedValue([]);
    
    await act(async () => {
      renderWithRouter(<BookDetails />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText('by Test Author')).toBeInTheDocument();
      expect(screen.getByText('Rs. 10')).toBeInTheDocument();
      // Check for the line-through class instead of direct style
      expect(screen.getByText('Rs. 15').className).toContain('line-through');
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByTestId('mock-feedback')).toBeInTheDocument();
    });
  });

  it('handles add to cart successfully', async () => {
    (API.getWishlist as jest.Mock).mockResolvedValue([]);
    (API.addToCart as jest.Mock).mockResolvedValue({ success: true });

    await act(async () => {
      renderWithRouter(<BookDetails />);
    });

    const addButton = screen.getByText('ADD TO CART');
    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(API.addToCart).toHaveBeenCalledWith('book1');
      expect(screen.getByText('+')).toBeInTheDocument(); // Cart counter appears
    });
  });

  it('handles wishlist toggle', async () => {
    (API.getWishlist as jest.Mock)
      .mockResolvedValueOnce([]) // Initial state: not wishlisted
      .mockResolvedValueOnce([{ _id: 'book1' }]); // After adding
    (API.addWishlist as jest.Mock).mockResolvedValue({});
    (API.removeWishlist as jest.Mock).mockResolvedValue({});

    await act(async () => {
      renderWithRouter(<BookDetails />);
    });

    const wishlistButton = screen.getByText('WISHLIST');
    expect(wishlistButton).toBeInTheDocument();

    // Add to wishlist
    await act(async () => {
      fireEvent.click(wishlistButton);
    });
    await waitFor(() => {
      expect(API.addWishlist).toHaveBeenCalledWith('book1');
      expect(screen.getByText('WISHLISTED')).toBeInTheDocument();
    });

    // Remove from wishlist
    await act(async () => {
      fireEvent.click(screen.getByText('WISHLISTED'));
    });
    await waitFor(() => {
      expect(API.removeWishlist).toHaveBeenCalledWith('book1');
      expect(screen.getByText('WISHLIST')).toBeInTheDocument();
    });
  });

  it('handles no token scenario', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    (API.getWishlist as jest.Mock).mockResolvedValue([]);
    (API.addToCart as jest.Mock).mockRejectedValue({ response: { status: 401 } });

    await act(async () => {
      renderWithRouter(<BookDetails />);
    });

    const addButton = screen.getByText('ADD TO CART');
    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByText('ADD TO CART')).toBeInTheDocument(); // Button reverts
    });
  });
});