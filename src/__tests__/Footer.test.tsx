import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Same/Footer';

describe('Footer Component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('displays copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(
      'Copyright © 2020, Bookstore Private Limited. All Rights Reserved'
    );
    expect(copyrightText).toBeInTheDocument();
  });

  test('has correct container classes', () => {
    const { container } = render(<Footer />);
    const outerDiv = container.querySelector('[data-testid="footer"]');
    expect(outerDiv).toHaveClass('w-full');
    expect(outerDiv).toHaveClass('bg-[#2E1D1E]');
    expect(outerDiv).toHaveClass('h-[50px]');
  });

  test('has correct inner div classes', () => {
    render(<Footer />);
    const innerDiv = screen.getByText(/Copyright/).parentElement;
    expect(innerDiv).toHaveClass('max-w-6xl');
    expect(innerDiv).toHaveClass('p-4');
    expect(innerDiv).toHaveClass('xl:p-0');
    expect(innerDiv).toHaveClass('h-full');
    expect(innerDiv).toHaveClass('flex');
    expect(innerDiv).toHaveClass('text-[.6rem]');
    expect(innerDiv).toHaveClass('md:text-xs');
    expect(innerDiv).toHaveClass('items-center');
    expect(innerDiv).toHaveClass('mx-auto');
  });

  test('paragraph has correct text color', () => {
    render(<Footer />);
    const paragraph = screen.getByText(/Copyright/);
    expect(paragraph).toHaveClass('text-white');
  });
});