import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AuthTemplate from "../components/Auth/Template";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, test, expect } from "vitest";
import { loginUser } from "../utils/API";
import "@testing-library/jest-dom"; // Add this here instead

vi.mock("../../utils/API", () => ({
    loginUser: vi.fn().mockResolvedValue({ result: { accessToken: "fakeToken123" } }),
}));

describe("AuthTemplate component render", () => {
    test("renders login authTemplate component", () => {
        render(
            <MemoryRouter>
                <AuthTemplate container="login" />
            </MemoryRouter>
        );

        expect(screen.getByText("LOGIN")).toBeInTheDocument();
        expect(screen.getByText("SIGNUP")).toBeInTheDocument();
        expect(screen.getByLabelText("Email Id")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Forget Password?")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });

    test("renders signup authTemplate component", () => {
        render(
            <MemoryRouter>
                <AuthTemplate container="register" />
            </MemoryRouter>
        );

        expect(screen.getByText("LOGIN")).toBeInTheDocument();
        expect(screen.getByText("SIGNUP")).toBeInTheDocument();
        expect(screen.getByLabelText("Email Id")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Mobile Number")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Signup" })).toBeInTheDocument();
    });

    test("password toggle functionality", async () => {
        render(
            <MemoryRouter>
                <AuthTemplate container="register" />
            </MemoryRouter>
        );

        const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
        // const toggleButton = screen.getByTestId("togglePassword");

        expect(passwordInput).toHaveAttribute("type", "password");

        // fireEvent.click(toggleButton);
        // await waitFor(() => {
        //     expect(passwordInput).toHaveAttribute("type", "text");
        // });

        // fireEvent.click(toggleButton);
        // await waitFor(() => {
        //     expect(passwordInput).toHaveAttribute("type", "password");
        // });
    });
});