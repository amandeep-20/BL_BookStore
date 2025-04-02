import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import CartData from '../components/Cart/CartData'; // Adjust the import path
import { getCartItems, removeFromCart } from '../utils/API';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../utils/API', () => ({
  getCartItems: jest.fn(),
  removeFromCart: jest.fn(),
}));

// Mock the image import directly in the test file
jest.mock('../assets/images/bookImage.png', () => 'mock-image-stub');

describe('CartData Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    (getCartItems as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<CartData />);
    expect(screen.getByText('Loading cart items...')).toBeInTheDocument();
  });

  test('renders error state on fetch failure', async () => {
    (getCartItems as jest.Mock).mockRejectedValue({
      message: 'Failed to fetch cart items',
    });
    render(<CartData />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch cart items')).toBeInTheDocument();
    });
  });

  test('redirects to login on unauthorized error', async () => {
    (getCartItems as jest.Mock).mockRejectedValue({
      response: { data: { message: 'No authentication token found. Please log in.' } },
    });
    render(<CartData />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('renders empty cart message when no items', async () => {
    (getCartItems as jest.Mock).mockResolvedValue({ success: true, result: [] });
    render(<CartData />);

    await waitFor(() => {
      expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
  });

  test('renders cart items correctly', async () => {
    const mockCartItems = {
      success: true,
      result: [
        {
          _id: '1',
          product_id: {
            bookName: 'Test Book',
            author: 'Test Author',
            discountPrice: 500,
            price: 600,
            bookImage: 'test-image.jpg',
          },
          quantityToBuy: 2,
        },
      ],
    };
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    render(<CartData />);

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText('by Test Author')).toBeInTheDocument();
      expect(screen.getByText('Rs. 500')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      // Verify the mocked image is used when bookImage is undefined
      const img = screen.getByAltText('Test Book') as HTMLImageElement;
      expect(img.src).toContain('test-image.jpg');
    });
  });



  test('removes item from cart', async () => {
    const mockCartItems = {
      success: true,
      result: [
        {
          _id: '1',
          product_id: {
            bookName: 'Test Book',
            author: 'Test Author',
            discountPrice: 500,
            price: 600,
            bookImage: 'test-image.jpg',
          },
          quantityToBuy: 2,
        },
      ],
    };
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    (removeFromCart as jest.Mock).mockResolvedValue({ success: true });
    render(<CartData />);

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Remove'));
    await waitFor(() => {
      expect(removeFromCart).toHaveBeenCalledWith('1');
      expect(screen.queryByText('Test Book')).not.toBeInTheDocument();
    });
  });

  test('toggles address visibility', async () => {
    (getCartItems as jest.Mock).mockResolvedValue({ success: true, result: [] });
    render(<CartData />);

    await waitFor(() => {
      expect(screen.getByText('Customer Details')).toBeInTheDocument();
    });

    expect(screen.queryByPlaceholderText('Full Name')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Customer Details'));
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
  });

  test('toggles order summary visibility', async () => {
    const mockCartItems = {
      success: true,
      result: [
        {
          _id: '1',
          product_id: {
            bookName: 'Test Book',
            author: 'Test Author',
            discountPrice: 500,
            price: 600,
            bookImage: 'test-image.jpg',
          },
          quantityToBuy: 1,
        },
      ],
    };
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    render(<CartData />);

    await waitFor(() => {
      expect(screen.getByText('Order Summary')).toBeInTheDocument();
    });

    expect(screen.queryByText('Total Amount')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Order Summary'));
    expect(screen.getByText('Total Amount')).toBeInTheDocument();
  });

  test('handles checkout and clears cart', async () => {
    const mockCartItems = {
      success: true,
      result: [
        {
          _id: '1',
          product_id: {
            bookName: 'Test Book',
            author: 'Test Author',
            discountPrice: 500,
            price: 600,
            bookImage: 'test-image.jpg',
          },
          quantityToBuy: 1,
        },
      ],
    };
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    (removeFromCart as jest.Mock).mockResolvedValue({ success: true });
    render(<CartData />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Order Summary'));
    });

    fireEvent.click(screen.getByText('CHECKOUT'));
    await waitFor(() => {
      expect(removeFromCart).toHaveBeenCalledWith('1');
      expect(mockNavigate).toHaveBeenCalledWith('/orderConfirm');
      expect(screen.queryByText('Test Book')).not.toBeInTheDocument();
    });
  });

  // Additional test to verify the mock image fallback
  test('uses mock image when bookImage is undefined', async () => {
    const mockCartItems = {
      success: true,
      result: [
        {
          _id: '1',
          product_id: {
            bookName: 'Test Book',
            author: 'Test Author',
            discountPrice: 500,
            price: 600,
            // bookImage is undefined, should fall back to bookCover
          },
          quantityToBuy: 2,
        },
      ],
    };
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    render(<CartData />);

    await waitFor(() => {
      const img = screen.getByAltText('Test Book') as HTMLImageElement;
      expect(img.src).toContain('mock-image-stub');
    });
  });
});