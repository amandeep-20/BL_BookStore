import { render, screen } from '@testing-library/react';
import Home from '../pages/Home'; // Adjust path as needed
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';

jest.mock('../components/Same/Header', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-header">Header Component</div>),
}));

jest.mock('../components/Same/Footer', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-footer">Footer Component</div>),
}));

jest.mock('../components/BookContainer/BookContainer', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-book-container">Book Container Component</div>),
}));

describe('Home', () => {
  beforeEach(() => {
    jest.mocked(Header).mockClear();
    jest.mocked(Footer).mockClear();
    jest.mocked(require('../components/BookContainer/BookContainer').default).mockClear();
  });

  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-book-container')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});