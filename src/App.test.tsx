import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("<App /> tests", () => {
  test("should not be faulsy while rendering App component", () => {
    const { container } = render(<App />);

    expect(container).toBeTruthy();
  });

  test("should render App component correctly with the content", () => {
    const { getByText } = render(<App />);
    const element = getByText("React-TypeScript-Sign-Up");
    expect(element).toBeInTheDocument();
  });
});
