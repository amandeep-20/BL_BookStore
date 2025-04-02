import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Feedback from '../components/BookDetails/Feedback'; 
import * as API from '../utils/API'; 


interface Review {
  _id: string;
  user_id: { fullName: string };
  rating: number;
  comment: string;
}


jest.mock('../utils/API', () => ({
  getBookReviews: jest.fn(),
}));


jest.mock('../components/BookDetails/FeedbackForm', () => {
  const DummyFeedbackForm = ({ bookId, onReviewSubmitted }: {
    bookId: string;
    onReviewSubmitted: (review: Review) => void;
  }) => {
    return (
      <button
        onClick={() =>
          onReviewSubmitted({
            _id: 'new123',
            user_id: { fullName: 'New User' },
            rating: 4,
            comment: 'New review',
          })
        }
      >
        Submit Review
      </button>
    );
  };
  return DummyFeedbackForm;
});

describe('Feedback Component', () => {
  const mockReviews: Review[] = [
    {
      _id: '1',
      user_id: { fullName: 'John Doe' },
      rating: 4,
      comment: 'Great book!',
    },
  ];

  const renderWithRouter = (bookId: string) => {
    return render(
      <MemoryRouter initialEntries={[`/book/${bookId}`]}>
        <Routes>
          <Route path="/book/:id" element={<Feedback />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays "No reviews yet" when no reviews exist', async () => {
    (API.getBookReviews as jest.Mock).mockResolvedValue([]);
    renderWithRouter('123');

    await waitFor(() => {
      expect(API.getBookReviews).toHaveBeenCalledWith('123');
      expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });
  });

  test('fetches and displays reviews on mount', async () => {
    (API.getBookReviews as jest.Mock).mockResolvedValue(mockReviews);
    renderWithRouter('123');

    await waitFor(() => {
      expect(API.getBookReviews).toHaveBeenCalledWith('123');
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Great book!')).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    (API.getBookReviews as jest.Mock).mockRejectedValue(new Error('API Error'));
    renderWithRouter('123');

    await waitFor(() => {
      expect(screen.getByText('Failed to load reviews. Please try again later.')).toBeInTheDocument();
    });
  });

  test('adds new review when handleNewReview is called', async () => {
    (API.getBookReviews as jest.Mock).mockResolvedValue([]);
    renderWithRouter('123');

    await waitFor(() => {
      expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });

    const submitButton = screen.getByText('Submit Review');
    submitButton.click();

    await waitFor(() => {
      expect(screen.getByText('New User')).toBeInTheDocument();
      expect(screen.getByText('New review')).toBeInTheDocument();
    });
  });

  test('initializes with empty reviews when no bookId is provided', async () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );
    expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
  });
});