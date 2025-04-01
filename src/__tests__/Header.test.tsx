import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Same/Header'; 
import * as API from '../utils/API'; 

jest.mock('../components/Same/Dropdown.tsx', () => jest.fn(({ username }) => (
  <div data-testid="mock-dropdown">{username}</div>
)));

jest.mock('../utils/API.ts', () => ({
  getCartItems: jest.fn(),
}));

jest.mock('../assets/images/education.svg', () => 'mocked-logo-path');

describe('Header Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders properly with logo and bookstore text', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/bookstore/i)).toBeInTheDocument();
    expect(screen.getByAltText('logo-img')).toHaveAttribute('src', 'mocked-logo-path');
  });

  it('shows search bar when container is "home" on desktop', () => {
    render(
      <MemoryRouter>
        <Header container="home" />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-dropdown')).toBeInTheDocument();
  });

  it('shows mobile search icon when container is "home"', () => {
    render(
      <MemoryRouter>
        <Header container="home" />
      </MemoryRouter>
    );

    const mobileSearchContainer = screen.getByText('Search').parentElement;
    expect(mobileSearchContainer?.querySelector('svg')).toHaveClass('text-white');
    expect(mobileSearchContainer?.querySelector('svg')).toHaveClass('text-xl');
  });

  it('does not render search bar, cart, or dropdown when container is not "home"', () => {
    render(
      <MemoryRouter>
        <Header container="other" />
      </MemoryRouter>
    );

    expect(screen.queryByPlaceholderText(/search.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cart/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-dropdown')).not.toBeInTheDocument();
  });

  it('handles search input change', () => {
    render(
      <MemoryRouter>
        <Header container="home" />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(searchInput, { target: { value: 'test book' } });
    expect(searchInput).toHaveValue('test book');
  });

  it('displays username from localStorage correctly', async () => {
    localStorage.setItem('userName', 'John5413Doe');
    
    await act(async () => {
      render(
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('mock-dropdown')).toHaveTextContent('John');
  });

  it('handles empty localStorage username', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('mock-dropdown')).toHaveTextContent('');
  });

  it('displays cart count when API returns items', async () => {
    (API.getCartItems as jest.Mock).mockResolvedValue({
      success: true,
      result: [{ quantityToBuy: 2 }, { quantityToBuy: 3 }],
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(API.getCartItems).toHaveBeenCalledTimes(1);
  });

  it('sets cart count to 0 when API call fails', async () => {
    (API.getCartItems as jest.Mock).mockRejectedValue(new Error('API Error'));

    await act(async () => {
      render(
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      );
    });

    expect(screen.queryByText(/[1-9]/)).not.toBeInTheDocument();
    expect(API.getCartItems).toHaveBeenCalledTimes(1);
  });

  it('renders cart icon and link correctly with zero count', async () => {
    (API.getCartItems as jest.Mock).mockResolvedValue({
      success: true,
      result: [],
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      );
    });

    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
    expect(screen.queryByText(/[1-9]/)).not.toBeInTheDocument();
  });
});