import { render, screen } from '@testing-library/react';
import OrderContainer from '../components/Same/OrderConatiner';

describe('OrderContainer Component', () => {
  const mockOrder = {
    pic: 'test-image.jpg',
    title: 'Test Book',
    author: 'Test Author',
    price: 1500
  };

  test('renders with wishlist container', () => {
    render(<OrderContainer order={mockOrder} container="wishlist" />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  test('renders with myOrder container', () => {
    render(<OrderContainer order={mockOrder} container="myOrder" />);
    expect(screen.getByText('Order placed on May 21')).toBeInTheDocument();
  });

  test('displays order details', () => {
    render(<OrderContainer order={mockOrder} container="wishlist" />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Rs. 1500')).toBeInTheDocument();
    expect(screen.getByText('Rs. 2000')).toBeInTheDocument();
  });

  test('renders image with correct src and alt', () => {
    render(<OrderContainer order={mockOrder} container="wishlist" />);
    const image = screen.getByAltText('order-cover-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  test('applies correct container classes for wishlist', () => {
    const { container } = render(<OrderContainer order={mockOrder} container="wishlist" />);
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass('flex');
    expect(outerDiv).toHaveClass('flex-col');
    expect(outerDiv).toHaveClass('md:flex-row');
    expect(outerDiv).toHaveClass('justify-between');
    expect(outerDiv).toHaveClass('items-center');
    expect(outerDiv).toHaveClass('w-full');
    expect(outerDiv).toHaveClass('py-6');
    expect(outerDiv).toHaveClass('px-4');
    expect(outerDiv).toHaveClass('border-2');
    expect(outerDiv).toHaveClass('border-[#E4E4E4]');
    expect(outerDiv).toHaveClass('rounded-sm');
  });

  test('applies correct container classes for myOrder', () => {
    const { container } = render(<OrderContainer order={mockOrder} container="myOrder" />);
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass('items-start');
    expect(outerDiv).not.toHaveClass('items-center');
  });

  test('applies correct styling to price elements', () => {
    render(<OrderContainer order={mockOrder} container="wishlist" />);
    const currentPrice = screen.getByText('Rs. 1500');
    const originalPrice = screen.getByText('Rs. 2000');
    expect(currentPrice).toHaveClass('font-semibold');
    expect(originalPrice).toHaveClass('text-[#878787]');
    expect(originalPrice).toHaveClass('text-xs');
    expect(originalPrice).toHaveClass('line-through');
  });

  test('applies correct styling to title and author', () => {
    render(<OrderContainer order={mockOrder} container="wishlist" />);
    const title = screen.getByText('Test Book');
    const author = screen.getByText('Test Author');
    expect(title).toHaveClass('text-lg');
    expect(author).toHaveClass('text-[#9D9D9D]');
    expect(author).toHaveClass('text-xs');
  });

  test('order status has correct styling when myOrder', () => {
    render(<OrderContainer order={mockOrder} container="myOrder" />);
    const statusText = screen.getByText('Order placed on May 21');
    expect(statusText).toHaveClass('text-sm');
    expect(statusText).toHaveClass('text-[#0A0102]');
    expect(statusText).toHaveClass('font-semibold');
  });
});