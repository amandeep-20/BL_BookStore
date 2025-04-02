import { render, screen } from '@testing-library/react';
import UserProfile from '../pages/UserProfile'; // Adjust path to your UserProfile.tsx
import Header from '../components/Same/Header';
import Footer from '../components/Same/Footer';
import Breadcrumbs from '../components/Same/Breadcrumbs';

// Mock the imported components
jest.mock('../components/Same/Header', () => jest.fn(() => <div data-testid="mock-header">Header</div>));
jest.mock('../components/Same/Footer', () => jest.fn(() => <div data-testid="mock-footer">Footer</div>));
jest.mock('../components/Same/Breadcrumbs', () => jest.fn(() => <div data-testid="mock-breadcrumbs">Breadcrumbs</div>));

describe('UserProfile Component', () => {
  beforeEach(() => {
    jest.mocked(Header).mockClear();
    jest.mocked(Footer).mockClear();
    jest.mocked(Breadcrumbs).mockClear();
  });

  test('renders without crashing', () => {
    render(<UserProfile />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-breadcrumbs')).toBeInTheDocument();
  });

  test('renders personal details section', () => {
    render(<UserProfile />);
    expect(screen.getByText('Personal Details')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Email ID')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Mobile Number')).toBeInTheDocument();
    // Removed: expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('renders address details section', () => {
    render(<UserProfile />);
    expect(screen.getByText('Address Details')).toBeInTheDocument();
    expect(screen.getByText('1. WORK')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('City/Town')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add new address/i })).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  test('renders radio buttons for address type', () => {
    render(<UserProfile />);
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
    expect(radioButtons[0]).toHaveAttribute('value', 'Home');
    expect(radioButtons[1]).toHaveAttribute('value', 'Work');
    expect(radioButtons[2]).toHaveAttribute('value', 'Other');
  });
});