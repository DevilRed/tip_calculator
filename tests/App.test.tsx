import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);
    expect(screen.getByText(/tip calculator/i)).toBeInTheDocument();
  });
});
