import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GuestView from '../components/Same/GuestView';

jest.mock('../components/Same/Header.tsx', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('../assets/images/Page-1.svg', () => 'mocked-image-path');

describe('GuestView Component', () => {
  const renderGuestView = () => {
    return render(
      <MemoryRouter>
        <GuestView />
      </MemoryRouter>
    );
  };

  test('renders without crashing', () => {
    renderGuestView();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  test('displays login prompt text', () => {
    renderGuestView();
    expect(screen.getByText('PLEASE LOG IN')).toBeInTheDocument();
    expect(screen.getByText('Login to view items in your wishlist.')).toBeInTheDocument();
  });

  test('renders placeholder image', () => {
    renderGuestView();
    const image = screen.getByAltText('placeholder-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mocked-image-path');
  });

  test('renders login/signup button with correct styling', () => {
    renderGuestView();
    const button = screen.getByText('LOGIN/SIGNUP');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-[#A03037]');
    expect(button).toHaveClass('font-normal');
    expect(button).toHaveClass('border-[#A03037]');
    expect(button).toHaveClass('border-2');
    expect(button).toHaveClass('text-xs');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('mt-2');
  });

  test('login/signup button is wrapped in NavLink to home', () => {
    renderGuestView();
    const button = screen.getByText('LOGIN/SIGNUP');
    const navLink = button.closest('a');
    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveAttribute('href', '/');
  });

  test('has correct container styling', () => {
    const { container } = renderGuestView();
    const mainContent = container.querySelector('div > div:nth-child(2)');
    expect(mainContent).toHaveClass('flex');
    expect(mainContent).toHaveClass('flex-col');
    expect(mainContent).toHaveClass('justify-center');
    expect(mainContent).toHaveClass('items-center');
    expect(mainContent).toHaveClass('min-h-[75vh]');
    expect(mainContent).toHaveClass('gap-7');
  });

  test('login prompt text has correct styling', () => {
    renderGuestView();
    const pleaseLogin = screen.getByText('PLEASE LOG IN');
    const subtext = screen.getByText('Login to view items in your wishlist.');
    
    expect(pleaseLogin).toHaveClass('text-xl');
    expect(pleaseLogin).toHaveClass('font-semibold');
    expect(pleaseLogin).toHaveClass('text-[#0A0102]');
    
    expect(subtext).toHaveClass('text-xs');
    expect(subtext).toHaveClass('text-[#9D9D9D]');
    expect(subtext).toHaveClass('font-semibold');
  });
});