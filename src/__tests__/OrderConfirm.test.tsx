import { render, screen } from '@testing-library/react';
import OrderConfirm from '../pages/OrderConfirm'; // Adjust path to your OrderConfirm.tsx
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';

// Mock the imported components
jest.mock('../components/Same/Header', () => jest.fn(() => <div data-testid="mock-header">Header</div>));
jest.mock('../components/Same/Footer', () => jest.fn(() => <div data-testid="mock-footer">Footer</div>));

// Mock the image import
jest.mock('../assets/images/orderplaced.png', () => 'mocked-order-placed-image');

describe('OrderConfirm Component', () => {
  beforeEach(() => {
    jest.mocked(Header).mockClear();
    jest.mocked(Footer).mockClear();
  });

  test('renders without crashing', () => {
    render(<OrderConfirm />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('renders order confirmation message', () => {
    render(<OrderConfirm />);
    expect(screen.getByText(/hurray!!! your order is confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/the order id is #123456/i)).toBeInTheDocument();
    expect(screen.getByText(/save the order id for further communication/i)).toBeInTheDocument();
  });

  test('renders contact details table correctly', () => {
    render(<OrderConfirm />);
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('admin@bookstore.com')).toBeInTheDocument();
    expect(screen.getByText('+91 9876543210')).toBeInTheDocument();
    expect(screen.getByText(/42, 14th Main, 15th Cross/i)).toBeInTheDocument();
  });

  test('renders continue shopping button', () => {
    render(<OrderConfirm />);
    const button = screen.getByText(/continue shopping/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-[#3371B5]', 'text-sm', 'uppercase', 'py-2', 'px-7', 'rounded-sm', 'text-white');
  });

  test('renders order placed image with correct src', () => {
    render(<OrderConfirm />);
    const image = screen.getByAltText('Order Placed');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mocked-order-placed-image');
  });
});