import { describe, test, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import App from "../App";
import { navigationLinks, routes } from "../constants/constants";

describe("Navigation test set", () => {
  afterEach(cleanup);

  test("redirect from Home page to Sign Up page when navigation link is pressed", async () => {
    render(
      <MemoryRouter initialEntries={[routes.home]}>
        <App />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const linkToSignUpPage = screen.getByRole("link", {
      name: navigationLinks.signUp,
    });
    expect(linkToSignUpPage).toBeInTheDocument();

    expect(
      screen.getByText(
        /This application is a PoC to demonstrate React development skills/i
      )
    ).toBeInTheDocument();

    await user.click(linkToSignUpPage);

    expect(window.location.pathname).toBe(routes.signUp);
  });

  test("redirect from Sign Up page to Home page when navigation link is pressed", async () => {
    render(
      <MemoryRouter initialEntries={[routes.signUp]}>
        <App />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const linkToHomePage = screen.getByRole("link", {
      name: navigationLinks.home,
    });
    expect(linkToHomePage).toBeInTheDocument();

    expect(screen.getByText(/Register form/i)).toBeInTheDocument();

    await user.click(linkToHomePage);

    console.log(window.location.pathname);
    expect(window.location.pathname).toBe(routes.home);
  });
});
