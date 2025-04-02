import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookContainer from '../components/BookContainer/BookContainer';
import '@testing-library/jest-dom';


jest.mock('../components/BookContainer/BooksCrad', () => () => <div data-testid="books-card">BooksCard Component</div>);



describe('BookContainer Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        render(
            <BrowserRouter>
                <BookContainer />
            </BrowserRouter>
        );
    };

    test('renders BooksCard component and basic UI elements', () => {
        renderComponent();

        
        expect(screen.getByTestId('books-card')).toBeInTheDocument();

        
        expect(screen.getByText('Books')).toBeInTheDocument();
        expect(screen.getByText('(123 items)')).toBeInTheDocument();
        expect(screen.getByText('Sort by relevance')).toBeInTheDocument();

        
    });

    test('renders dropdown and allows interaction', async () => {
        renderComponent();

        
        const dropdownTrigger = screen.getByText('Sort by relevance');
        expect(dropdownTrigger).toBeInTheDocument();

        
        fireEvent.click(dropdownTrigger);

        
        await waitFor(() => {
            expect(screen.getByText('First menu item')).toBeInTheDocument();
            expect(screen.getByText('Second menu item')).toBeInTheDocument();
            expect(screen.getByText('Third menu item')).toBeInTheDocument();
        });
    });
});