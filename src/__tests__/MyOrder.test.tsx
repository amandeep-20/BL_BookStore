import { render, screen } from '@testing-library/react';
import MyOrder from '../pages/MyOrder'; // Adjust path to your MyOrder.tsx
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';
import Breadcrumbs from '../components/Same/Breadcrumbs';
import OrderConatiner from '../components/Same/OrderConatiner';

// Mock the imported components
jest.mock('../components/Same/Header', () => jest.fn(() => <div data-testid="mock-header">Header</div>));
jest.mock('../components/Same/Footer', () => jest.fn(() => <div data-testid="mock-footer">Footer</div>));
jest.mock('../components/Same/Breadcrumbs', () => jest.fn(() => <div data-testid="mock-breadcrumbs">Breadcrumbs</div>));
jest.mock('../components/Same/OrderConatiner', () => jest.fn(() => <div data-testid="mock-order-container">Order Container</div>));

// Mock the image imports
jest.mock('../assets/images/bookImage.png', () => 'mocked-book-image');
jest.mock('../assets/images/bookImage2.png', () => 'mocked-book-image2');

describe('MyOrder Component', () => {
  beforeEach(() => {
    jest.mocked(Header).mockClear();
    jest.mocked(Footer).mockClear();
    jest.mocked(Breadcrumbs).mockClear();
    jest.mocked(OrderConatiner).mockClear();
  });

  test('renders without crashing', () => {
    render(<MyOrder />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-breadcrumbs')).toBeInTheDocument();
  });

  test('renders correct number of OrderContainer components', () => {
    render(<MyOrder />);
    const orderContainers = screen.getAllByTestId('mock-order-container');
    expect(orderContainers).toHaveLength(2);
  });
});