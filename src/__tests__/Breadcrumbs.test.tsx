import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useParams } from 'react-router-dom';
import React from 'react';
import Breadcrumbs from '../components/Same/Breadcrumbs';

interface BreadcrumbItem {
  title: React.ReactNode;
}

jest.mock('antd', () => ({
  Breadcrumb: jest.fn(({ items }: { items: BreadcrumbItem[] }) => (
    <div data-testid="breadcrumb">
      {items.map((item: BreadcrumbItem, index: number) => (
        <span key={index} data-testid={`breadcrumb-item-${index}`}>
          {item.title}
        </span>
      ))}
    </div>
  )),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Breadcrumbs Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
  });

  it('renders Home breadcrumb item always', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');
  });

  it('renders nothing for second item when container is undefined', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );

    const breadcrumbItems = screen.getAllByTestId(/breadcrumb-item-\d/);
    expect(breadcrumbItems).toHaveLength(2);
    expect(breadcrumbItems[1]).toHaveTextContent('');
  });

  it('renders Book breadcrumb with bookId when container is "bookPage"', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '4' });
    render(
      <MemoryRouter>
        <Breadcrumbs container="bookPage" />
      </MemoryRouter>
    );

    const bookLink = screen.getByRole('link', { name: /book\(5\)/i });
    expect(bookLink).toBeInTheDocument();
    expect(bookLink).toHaveAttribute('href', '/book');
    expect(screen.getByText('Book(5)')).toHaveClass('text-black font-semibold');
  });

  it('renders My Order breadcrumb when container is "myOrder"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="myOrder" />
      </MemoryRouter>
    );

    const orderLink = screen.getByRole('link', { name: /my order/i });
    expect(orderLink).toBeInTheDocument();
    expect(orderLink).toHaveAttribute('href', '/myOrder');
    expect(screen.getByText('My Order')).toHaveClass('text-black font-semibold');
  });

  it('renders My Wishlist breadcrumb when container is "wishlist"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="wishlist" />
      </MemoryRouter>
    );

    const wishlistLink = screen.getByRole('link', { name: /my wishlist/i });
    expect(wishlistLink).toBeInTheDocument();
    expect(wishlistLink).toHaveAttribute('href', '/wishlist');
    expect(screen.getByText('My Wishlist')).toHaveClass('text-black font-semibold');
  });

  it('renders My Cart breadcrumb when container is "cart"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="cart" />
      </MemoryRouter>
    );

    const cartLink = screen.getByRole('link', { name: /my cart/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
    expect(screen.getByText('My cart')).toHaveClass('text-black font-semibold');
  });

  it('renders My Profile breadcrumb when container is "profile"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="profile" />
      </MemoryRouter>
    );

    const profileLink = screen.getByRole('link', { name: /my profile/i });
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', '/profile');
    expect(screen.getByText('My Profile')).toHaveClass('text-black font-semibold');
  });

  it('uses default bookId of 0 when params.id is undefined for bookPage', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="bookPage" />
      </MemoryRouter>
    );

    const bookLink = screen.getByRole('link', { name: /book\(1\)/i });
    expect(bookLink).toBeInTheDocument();
    expect(bookLink).toHaveAttribute('href', '/book');
  });

  it('wraps breadcrumb in a div', () => {
    const { container } = render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(container.firstChild).toHaveProperty('nodeName', 'DIV');
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
  });
});