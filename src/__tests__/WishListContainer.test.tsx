import { render, screen, fireEvent } from "@testing-library/react";
import WishListContainer from "../components/Same/WishListContainer";

// Mock the image import
jest.mock('../assets/images/BookCover1.png', () => 'mocked-image-path');

describe("WishListContainer", () => {
  const mockOrder = {
    product_id: {
      _id: "123",
      bookName: "Test Book",
      author: "Test Author",
      discountPrice: 500,
      price: 600,
    },
  };

  const mockOnRemove = jest.fn();

  it("renders book details correctly", () => {
    render(
      <WishListContainer
        order={mockOrder}
        container="wishlist"
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Rs. 500")).toBeInTheDocument();
    expect(screen.getByText("Rs. 600")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "mocked-image-path");
  });

  it("renders remove button when container is wishlist", () => {
    render(
      <WishListContainer
        order={mockOrder}
        container="wishlist"
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByTestId("remove-button-container")).toBeInTheDocument();
  });

  it("does not render remove button when container is not wishlist", () => {
    render(
      <WishListContainer
        order={mockOrder}
        container="cart"
        onRemove={mockOnRemove}
      />
    );

    expect(screen.queryByTestId("remove-button-container")).not.toBeInTheDocument();
  });

  it("calls onRemove with correct id when remove button is clicked", () => {
    render(
      <WishListContainer
        order={mockOrder}
        container="wishlist"
        onRemove={mockOnRemove}
      />
    );

    fireEvent.click(screen.getByTestId("remove-button-container"));
    expect(mockOnRemove).toHaveBeenCalledWith("123");
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it("applies correct flex alignment based on container prop", () => {
    const { rerender } = render(
      <WishListContainer
        order={mockOrder}
        container="wishlist"
        onRemove={mockOnRemove}
      />
    );
    expect(screen.getByTestId("remove-button-container").parentElement?.parentElement).toHaveClass("items-center");

    rerender(
      <WishListContainer
        order={mockOrder}
        container="cart"
        onRemove={mockOnRemove}
      />
    );
    expect(screen.getByText("Test Book").parentElement?.parentElement?.parentElement).toHaveClass("items-start");
  });
});