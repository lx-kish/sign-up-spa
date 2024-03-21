import { describe, test, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import App from "../App";

describe("Navigation test set", () => {
  afterEach(cleanup);

  test("redirect from Home page to Sign Up page when navigation link is pressed", async () => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa"]}>
        <App />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const linkToSignUpPage = screen.getByRole("link", { name: "Sign Up" });
    expect(linkToSignUpPage).toBeInTheDocument();

    expect(window.location.pathname).toBe("/");

    await user.click(linkToSignUpPage);

    expect(window.location.pathname).toBe("/sign-up-spa/sign-up");
  });

  test("redirect from Sign Up page to Home page when navigation link is pressed", async () => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa/sign-up"]}>
        <App />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const linkToHomePage = screen.getByRole("link", { name: "Home" });
    expect(linkToHomePage).toBeInTheDocument();

    expect(window.location.pathname).toBe("/sign-up-spa/sign-up");

    await user.click(linkToHomePage);

    expect(window.location.pathname).toBe("/sign-up-spa");
  });
});
