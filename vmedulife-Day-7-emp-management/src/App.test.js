import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders employee registration heading", () => {
  render(<App />);
  const heading = screen.getByText(/employees/i);
  expect(heading).toBeInTheDocument();
});
