import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Dropdown from '../components/Same/Dropdown';
import { toast, ToastContainer } from 'react-toastify';

jest.mock('antd', () => ({
  Popover: jest.fn(({ content, children }) => (
    <div data-testid="popover">
      <div data-testid="trigger">{children}</div>
      <div data-testid="content">{content}</div>
    </div>
  )),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
  ToastContainer: jest.fn(() => null),
}));

describe('Dropdown Component Tests', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn() as jest.MockedFunction<(key: string) => string | null>,
        setItem: jest.fn() as jest.MockedFunction<(key: string, value: string) => void>,
        clear: jest.fn() as jest.MockedFunction<() => void>,
        removeItem: jest.fn() as jest.MockedFunction<(key: string) => void>,
      },
      writable: true,
    });
  });

  it('renders profile icon and username when prop provided', () => {
    render(
      <MemoryRouter>
        <Dropdown username="John" />
      </MemoryRouter>
    );

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByTestId('trigger')).toBeInTheDocument();
  });

  it('uses localStorage username when no prop provided', () => {
    (global.localStorage.getItem as jest.Mock).mockReturnValue('Jane5413Doe');
    render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );

    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('shows guest content when no username', () => {
    (global.localStorage.getItem as jest.Mock).mockReturnValue(null);
    render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login\/signup/i })).toBeInTheDocument();
    expect(screen.getAllByText(/my orders/i)).toHaveLength(1);
    expect(screen.getByText('Wishlist')).toBeInTheDocument();
  });

  it('shows logged-in content when username present', () => {
    render(
      <MemoryRouter>
        <Dropdown username="John" />
      </MemoryRouter>
    );

    expect(screen.getByText('Hello John')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile');
    expect(screen.getByRole('link', { name: 'My Orders' })).toHaveAttribute('href', '/myOrder');
    expect(screen.getByRole('link', { name: 'My Wishlist' })).toHaveAttribute('href', '/wishlist');
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('handles logout correctly', async () => {
    jest.useFakeTimers();
    render(
      <MemoryRouter>
        <Dropdown username="John" />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
    });

    expect(global.localStorage.clear).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    expect(screen.queryByText('Hello John')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
    jest.useRealTimers();
  });

  it('renders ToastContainer with correct props', () => {
    render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );

    expect(ToastContainer).toHaveBeenCalledWith(
      {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
      },
      undefined
    );
  });

  it('updates username when prop changes', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );

    rerender(
      <MemoryRouter>
        <Dropdown username="Alice" />
      </MemoryRouter>
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});