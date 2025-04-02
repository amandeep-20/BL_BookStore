import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react'; // Correct import from react
import WishList from '../pages/WishList';
import * as API from '../utils/API';
import { v4 as uuid } from 'uuid';

jest.mock('../components/Same/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('../components/Same/Footer', () => () => <div data-testid="mock-footer">Footer</div>);
jest.mock('../components/Same/Breadcrumbs', () => () => <div data-testid="mock-breadcrumbs">Breadcrumbs</div>);
jest.mock('../components/Same/WishListContainer', () => ({ order, onRemove }: { order: any; onRemove: (id: string) => void }) => (
    <div data-testid="wishlist-item">
      <button onClick={() => onRemove('test-id')}>Remove</button>
    </div>
  ));
  
jest.mock('../utils/API', () => ({
  getWishlist: jest.fn(),
  removeWishlist: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('WishList Component', () => {
  const mockToken = 'mock-token';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockToken);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('displays empty wishlist message when no items', async () => {
    (API.getWishlist as jest.Mock).mockResolvedValue([]);
    
    await act(async () => {
      render(<WishList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument();
    });
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders wishlist items when data is available', async () => {
    const mockWishlist = [
      {
        product_id: { _id: 'test-id-1' },
        name: 'Test Product',
      },
    ];
    (API.getWishlist as jest.Mock).mockResolvedValue(mockWishlist);
    
    await act(async () => {
      render(<WishList />);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('wishlist-item')).toBeInTheDocument();
    });
    expect(screen.getByText('My Wishlist')).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    (API.getWishlist as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    await act(async () => {
      render(<WishList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument();
    });
  });

  it('handles null token gracefully', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    (API.getWishlist as jest.Mock).mockRejectedValue(new Error('No token'));
    
    await act(async () => {
      render(<WishList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument();
    });
  });
});
