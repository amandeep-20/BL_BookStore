import { render, screen } from '@testing-library/react';
import LoginForm from '../components/Auth/LoginForm'; 
import Template from '../components/Auth/Template'; 

// Mock the imported component
jest.mock('../components/Auth/Template', () => jest.fn(() => <div data-testid="mock-template">Template</div>));

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.mocked(Template).mockClear();
  });

  test('renders without crashing', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('mock-template')).toBeInTheDocument();
  });
});