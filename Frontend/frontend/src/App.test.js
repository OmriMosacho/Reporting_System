import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Login screen by default", () => {
  render(<App />);
  const loginHeadings = screen.getAllByText(/Login/i);
  expect(loginHeadings.length).toBeGreaterThan(0);
});
