import { render, screen } from '@testing-library/react';
import BookPage from '../pages/BookPage';
import Header from '../components/Same/Header';
import Breadcrumbs from '../components/Same/Breadcrumbs';

jest.mock('../components/Same/Header', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-header">Header Component</div>),
}));

jest.mock('../components/Same/Breadcrumbs', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-breadcrumbs">Breadcrumbs Component</div>),
}));

jest.mock('../components/BookDetails/BookDetails', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-book-details">Book Details Component</div>),
}));

describe('BookPage', () => {
  beforeEach(() => {
    jest.mocked(Header).mockClear();
    jest.mocked(Breadcrumbs).mockClear();
    jest.mocked(require('../components/BookDetails/BookDetails').default).mockClear();
  });

  it('renders without crashing', () => {
    render(<BookPage />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('mock-book-details')).toBeInTheDocument();
  });

  it('renders with correct container className', () => {
    const { container } = render(<BookPage />);
    expect(container.querySelector('.max-w-6xl')).toBeInTheDocument();
    expect(container.querySelector('.mx-auto')).toBeInTheDocument();
    expect(container.querySelector('.p-8')).toBeInTheDocument();
  });
});