import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Template from '../components/Auth/Template';
import { loginApiCall, signupApiCall } from '../../src/utils/API';

// Mock dependencies
jest.mock('../../src/utils/API', () => ({
  loginApiCall: jest.fn(),
  signupApiCall: jest.fn(),
}));

jest.mock('../assets/images/loginSignupImage.png', () => 'mocked-image-path');

import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Template Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('component should render', () => {
    render(
      <MemoryRouter>
        <Template container="login" />
      </MemoryRouter>
    );
    expect(screen.getByText('ONLINE BOOK SHOPPING')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByText('SIGNUP')).toBeInTheDocument();
  });

  test('should render login form if container is login and initially be empty', () => {
    render(
      <MemoryRouter>
        <Template container="login" />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email Id')).toHaveValue('');
    expect(screen.getByLabelText('Password')).toHaveValue('');
  });

  test('should render register form when container is register and initially be empty', () => {
    render(
      <MemoryRouter>
        <Template container="register" />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Full Name')).toHaveValue('');
    expect(screen.getByLabelText('Email Id')).toHaveValue('');
    expect(screen.getByLabelText('Password')).toHaveValue('');
    expect(screen.getByLabelText('Mobile Number')).toHaveValue('');
  });

  test('login form fields update on change', () => {
    render(
      <MemoryRouter>
        <Template container="login" />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email Id');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass@1234' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('Pass@1234');
  });

  test('register form fields update on change', () => {
    render(
      <MemoryRouter>
        <Template container="register" />
      </MemoryRouter>
    );
    const fullNameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Id');
    const passwordInput = screen.getByLabelText('Password');
    const phoneInput = screen.getByLabelText('Mobile Number');

    fireEvent.change(fullNameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass@1234' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(fullNameInput).toHaveValue('Test User');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('Pass@1234');
    expect(phoneInput).toHaveValue('1234567890');
  });

  test('login form shows validation errors when submitted empty', async () => {
    render(
      <MemoryRouter>
        <Template container="login" />
      </MemoryRouter>
    );
    const form = screen.getByTestId('auth-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.')).toBeInTheDocument();
    });
  });

  test('register form shows validation errors when submitted empty', async () => {
    render(
      <MemoryRouter>
        <Template container="register" />
      </MemoryRouter>
    );
    const form = screen.getByTestId('auth-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid 10-digit phone number')).toBeInTheDocument();
    });
  });

  test('login form submits successfully with valid data', async () => {
    (loginApiCall as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <Template container="login" />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email Id');
    const passwordInput = screen.getByLabelText('Password');
    const form = screen.getByTestId('auth-form');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass@1234' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(loginApiCall).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Pass@1234' });
      expect(toast.success).toHaveBeenCalledWith('Login Successful!', {
        position: 'top-right',
        autoClose: 3000,
      });
      expect(mockedNavigate).toHaveBeenCalledWith('/home');
    }, { timeout: 2000 });
  });

  test('register form submits successfully with valid data', async () => {
    (signupApiCall as jest.Mock).mockResolvedValue({ data: { result: 'user' } });

    render(
      <MemoryRouter>
        <Template container="register" />
      </MemoryRouter>
    );
    const fullNameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Id');
    const passwordInput = screen.getByLabelText('Password');
    const phoneInput = screen.getByLabelText('Mobile Number');
    const form = screen.getByTestId('auth-form');

    fireEvent.change(fullNameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass@1234' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(signupApiCall).toHaveBeenCalledWith({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'Pass@1234',
        phone: '1234567890',
      });
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('login form shows error when API fails', async () => {
    (loginApiCall as jest.Mock).mockRejectedValue(new Error('Login Failed'));

    render(
      <MemoryRouter>
        <Template container="login" />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email Id');
    const passwordInput = screen.getByLabelText('Password');
    const form = screen.getByTestId('auth-form');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass@1234' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('login failed. Please check your credentials.')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('register form shows error when API fails', async () => {
    (signupApiCall as jest.Mock).mockRejectedValue(new Error('Registration Failed'));
  
    render(
      <MemoryRouter>
        <Template container="register" />
      </MemoryRouter>
    );
    const fullNameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Id');
    const passwordInput = screen.getByLabelText('Password');
    const phoneInput = screen.getByLabelText('Mobile Number');
    const form = screen.getByTestId('auth-form');
  
    fireEvent.change(fullNameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass@1234' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.submit(form);
  
    await waitFor(() => {
      expect(screen.getByText('register failed. Email might already exist.')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});