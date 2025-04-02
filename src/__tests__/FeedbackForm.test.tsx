import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedbackForm from "../components/BookDetails/FeedbackForm";
import { addBookReviews } from "../utils/API";

interface ReviewResponse {
  _id: string;
}

jest.mock("../utils/API", () => ({
  addBookReviews: jest.fn() as jest.Mock<Promise<ReviewResponse>>,
}));

describe("FeedbackForm Component", () => {
  const mockOnReviewSubmitted = jest.fn();
  const bookId = "123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders FeedbackForm correctly", () => {
    render(<FeedbackForm bookId={bookId} onReviewSubmitted={mockOnReviewSubmitted} />);

    expect(screen.getByText("Customer Feedback")).toBeInTheDocument();
    expect(screen.getByText("Overall rating")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your review")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("allows users to select a rating", async () => {
    render(<FeedbackForm bookId={bookId} onReviewSubmitted={mockOnReviewSubmitted} />);

    const stars = screen.getAllByRole("img"); // This will now find all stars due to role="img"
    fireEvent.click(stars[3]); // Selecting 4 stars (index 3 = 4th star)

    await waitFor(() => {
        const filledStars = screen.getAllByRole("img", { name: /filled star/i });
        expect(filledStars).toHaveLength(4); // Should find 4 filled stars
    }, { timeout: 1000 }); // Add timeout to prevent hanging
});

  test("shows error message if review is submitted without rating or comment", async () => {
    render(<FeedbackForm bookId={bookId} onReviewSubmitted={mockOnReviewSubmitted} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Please provide both a rating and a review.")).toBeInTheDocument();
    });
  });

  test("calls API and shows success message upon successful submission", async () => {
    (addBookReviews as jest.Mock<Promise<ReviewResponse>>).mockResolvedValueOnce({ _id: "new-review-id" });

    render(<FeedbackForm bookId={bookId} onReviewSubmitted={mockOnReviewSubmitted} />);

    const stars = screen.getAllByRole("img");
    fireEvent.click(stars[4]); // Selecting 5 stars
    fireEvent.change(screen.getByPlaceholderText("Write your review"), { 
      target: { value: "Awesome book!" }
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Submitting...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockOnReviewSubmitted).toHaveBeenCalledWith({
        _id: "new-review-id",
        user_id: { fullName: "Current User" },
        rating: 5,
        comment: "Awesome book!",
      });
      expect(screen.getByText("Review submitted successfully!")).toBeInTheDocument();
    });
  });

  test("shows error message if submission fails", async () => {
    (addBookReviews as jest.Mock<Promise<ReviewResponse>>).mockRejectedValueOnce(new Error("Submission Failed"));

    render(<FeedbackForm bookId={bookId} onReviewSubmitted={mockOnReviewSubmitted} />);

    const stars = screen.getAllByRole("img");
    fireEvent.click(stars[4]); // Selecting 5 stars
    fireEvent.change(screen.getByPlaceholderText("Write your review"), { 
      target: { value: "Great book!" }
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Failed to submit review. Please try again.")).toBeInTheDocument();
    });
  });

  test("disables submit button while submitting", async () => {
    (addBookReviews as jest.Mock<Promise<ReviewResponse>>).mockResolvedValueOnce({ _id: "new-review-id" });

    render(<FeedbackForm bookId={bookId} onReviewSubmitted={mockOnReviewSubmitted} />);

    const stars = screen.getAllByRole("img");
    fireEvent.click(stars[4]); // Selecting 5 stars
    fireEvent.change(screen.getByPlaceholderText("Write your review"), { 
      target: { value: "Amazing read!" }
    });
    
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent("Submitting...");
    });

    await waitFor(() => {
      expect(screen.getByText("Review submitted successfully!")).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });
  });
});