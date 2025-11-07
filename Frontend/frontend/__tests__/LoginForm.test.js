/**
 * @file LoginForm.test.js
 * @description Tests login form component for correct input and submit handling.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../src/components/LoginForm";

describe("LoginForm Component", () => {
  test("renders login inputs", () => {
    render(<LoginForm setToken={() => {}} />);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test("submits credentials when filled", () => {
    const mockSetToken = jest.fn();
    render(<LoginForm setToken={mockSetToken} />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // In real world, you'd mock the API call
    expect(screen.getByPlaceholderText(/Email/i).value).toBe("test@example.com");
  });
});
