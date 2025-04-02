import { render, screen } from '@testing-library/react';
import Register from '../pages/Register'; // Adjust path to your Register.tsx
import RegisterForm from '../components/Auth/RegisterForm';

// Mock the imported component
jest.mock('../components/Auth/RegisterForm', () => jest.fn(() => <div data-testid="mock-register-form">Register Form</div>));

describe('Register Component', () => {
  beforeEach(() => {
    jest.mocked(RegisterForm).mockClear();
  });

  test('renders without crashing', () => {
    render(<Register />);
    expect(screen.getByTestId('mock-register-form')).toBeInTheDocument();
  });

  test('renders RegisterForm component', () => {
    render(<Register />);
    const registerForm = screen.getByTestId('mock-register-form');
    expect(registerForm).toBeInTheDocument();
    expect(registerForm).toHaveTextContent('Register Form');
  });
});