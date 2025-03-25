import Home from "../pages/Home"
import { render, screen } from "@testing-library/react"
import { vi, describe, test, expect } from "vitest"; 
import "@testing-library/jest-dom";

vi.mock('../components/Same/Header.tsx', () => ({
    default: () => <div data-testid="header">Header</div>
}
))

vi.mock('../components/BookContainer/BookContainer.tsx', () => ({
    default: () => <div data-testid="bookContainer">BookContainer</div>
}
))

vi.mock('../components/Same/Footer.tsx', () => ({
    default: () => <div data-testid="footer">Footer</div>
}
))

describe("Home page render", () => {
    test("renders Header, BookContainer, and Footer", () => {
        render(<Home />)

        expect(screen.getByTestId("header")).toBeInTheDocument()
        expect(screen.getByTestId("bookContainer")).toBeInTheDocument()
        expect(screen.getByTestId("footer")).toBeInTheDocument()
    })
})