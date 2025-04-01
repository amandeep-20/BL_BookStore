import { render, screen } from '@testing-library/react';
import { MemoryRouter, NavLink } from 'react-router-dom'; // Needed for NavLink
import ForgotPassword from '../pages/ForgetPassword'; // Adjust path as needed
import Header from '../components/Same/Header';

jest.mock('../components/Same/Header.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-header">Header Component</div>),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: jest.fn(({ children, to }) => (
    <a href={to} data-testid="mock-navlink">{children}</a>
  )),
}));

describe('ForgotPassword', () => {
  beforeEach(() => {
    jest.mocked(Header).mockClear();
    jest.mocked(NavLink).mockClear();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
    expect(screen.getByTestId('mock-navlink')).toBeInTheDocument();
  });

  it('renders form elements correctly', () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email Id')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
    expect(screen.getByText('CREATE ACCOUNT')).toBeInTheDocument();
  });
});