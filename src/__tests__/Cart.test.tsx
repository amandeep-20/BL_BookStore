import { render, screen } from '@testing-library/react';
import Cart from '../pages/Cart';
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';
import Breadcrumbs from '../components/Same/Breadcrumbs';
import CartData from '../components/Cart/CartData';

jest.mock('../components/Same/Header.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-header">Header Component</div>),
}));

jest.mock('../components/Same/Footer.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-footer">Footer Component</div>),
}));

jest.mock('../components/Same/Breadcrumbs.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-breadcrumbs">Breadcrumbs Component</div>),
}));

jest.mock('../components/Cart/CartData.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-cart-data">Cart Data Component</div>),
}));

describe('Cart', () => {
  beforeEach(() => {
    jest.mocked(Header).mockClear();
    jest.mocked(Footer).mockClear();
    jest.mocked(Breadcrumbs).mockClear();
    jest.mocked(require('../components/Cart/CartData').default).mockClear();
  });

  it('renders without crashing', () => {
    render(<Cart />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cart-data')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});