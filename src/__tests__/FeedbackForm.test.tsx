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

    // Query star buttons by their aria-label
    const starButtons = [
      screen.getByRole("button", { name: "Rate 1 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 2 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 3 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 4 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 5 out of 5 stars" }),
    ];

    fireEvent.click(starButtons[3]); // Selecting 4 stars (index 3 = 4th star)

    await waitFor(() => {
      // Check if the aria-label updates to "Rated" for the clicked stars
      expect(starButtons[0]).toHaveAttribute("aria-label", "Rated 1 out of 5 stars");
      expect(starButtons[1]).toHaveAttribute("aria-label", "Rated 2 out of 5 stars");
      expect(starButtons[2]).toHaveAttribute("aria-label", "Rated 3 out of 5 stars");
      expect(starButtons[3]).toHaveAttribute("aria-label", "Rated 4 out of 5 stars");
      expect(starButtons[4]).toHaveAttribute("aria-label", "Rate 5 out of 5 stars");
    }, { timeout: 1000 });
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

    const starButtons = [
      screen.getByRole("button", { name: "Rate 1 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 2 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 3 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 4 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 5 out of 5 stars" }),
    ];

    fireEvent.click(starButtons[4]); // Selecting 5 stars
    fireEvent.change(screen.getByPlaceholderText("Write your review"), {
      target: { value: "Awesome book!" },
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

    const starButtons = [
      screen.getByRole("button", { name: "Rate 1 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 2 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 3 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 4 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 5 out of 5 stars" }),
    ];

    fireEvent.click(starButtons[4]); // Selecting 5 stars
    fireEvent.change(screen.getByPlaceholderText("Write your review"), {
      target: { value: "Great book!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Failed to submit review. Please try again.")).toBeInTheDocument();
    });
  });

  test("disables submit button while submitting", async () => {
    (addBookReviews as jest.Mock<Promise<ReviewResponse>>).mockResolvedValueOnce({ _id: "new-review-id" });

    render(<FeedbackForm bookId={bookId} onReviewSubmitted={mockOnReviewSubmitted} />);

    const starButtons = [
      screen.getByRole("button", { name: "Rate 1 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 2 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 3 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 4 out of 5 stars" }),
      screen.getByRole("button", { name: "Rate 5 out of 5 stars" }),
    ];

    fireEvent.click(starButtons[4]); // Selecting 5 stars
    fireEvent.change(screen.getByPlaceholderText("Write your review"), {
      target: { value: "Amazing read!" },
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