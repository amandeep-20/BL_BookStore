import React from 'react';
import { render, screen } from '@testing-library/react';
import Books from '../components/BookContainer/Books';
import '@testing-library/jest-dom';

describe('Books Component', () => {
  const book = {
    bookName: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4.5,
    price: 500,
    discountPrice: 400,
    pic: 'https://example.com/book-cover.jpg',
    quantity: 10,
  };

  beforeEach(() => {
    render(<Books book={book} />);
  });

  test('renders book name', () => {
    expect(screen.getByText(/The Alchemist/i)).toBeInTheDocument();
  });

  test('renders book author', () => {
    expect(screen.getByText(/by Paulo Coelho/i)).toBeInTheDocument();
  });


  test('renders book discount price', () => {
    expect(screen.getByText('Rs. 400')).toBeInTheDocument();
  });

  test('renders book original price', () => {
    expect(screen.getByText('Rs. 500')).toBeInTheDocument();
  });

  test('renders book image with correct alt text', () => {
    const image = screen.getByAltText('The Alchemist');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/book-cover.jpg');
  });
});
