import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

// Mock LoginForm
jest.mock('../components/Auth/LoginForm', () => {
  return () => <div data-testid="mock-login-form">Mock Login Form</div>;
});

describe('Login Component', () => {
  it('renders a div element', () => {
    render(<Login />);
    const divElement = screen.getByTestId('login-container');
    expect(divElement).toBeInTheDocument();
  });
});