import { describe, test, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";

describe("Home Page appearance test set", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test("navigates to Home page, Header and navigation are at the page", () => {
    const navigationElement = screen.getByRole("navigation");
    expect(navigationElement).toBeInTheDocument();
  });

  test("navigates to Home page, Header with navigation link to '/' and '/sign-up' are in the page", () => {
    const links: HTMLAnchorElement[] = screen.getAllByRole("link");

    expect(links[0]).toBeInTheDocument();
    expect(links[0].textContent).toEqual("Home");
    expect(links[0].href).toContain("/");

    expect(links[1]).toBeInTheDocument();
    expect(links[1].textContent).toEqual("Sign Up");
    expect(links[1].href).toContain("/sign-up");
  });

  test("navigates to Home page, the main content is in the page", () => {
    expect(
      screen.getByText(
        /^This application is a PoC to demonstrate React development skills$/i
      )
    ).toBeInTheDocument();
  });
  test("navigates to Home page, footer is at the page", () => {
    expect(
      screen.getByText(/^React TypeScript Sign Up SPA PoC$/i)
    ).toBeInTheDocument();
  });
});

describe("Sign Up Page appearance test set", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa/sign-up"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test("Header and navigation are at the page", () => {
    const navigationElement = screen.getByRole("navigation");
    expect(navigationElement).toBeInTheDocument();
  });

  test("Header with navigation link to '/' and '/sign-up' are in the page", () => {
    const navigationElement = screen.getByRole("link", { name: "Sign Up" });
    expect(navigationElement).toBeInTheDocument();
    const links: HTMLAnchorElement[] = screen.getAllByRole("link");

    expect(links[0].textContent).toEqual("Home");
    expect(links[0].href).toContain("/");

    expect(links[1].textContent).toEqual("Sign Up");
    expect(links[1].href).toContain("/sign-up-spa/sign-up");
  });

  test("Register form is in the page", () => {
    const formElement = screen.getByText(/^Register form$/i);

    expect(formElement).toBeInTheDocument();
  });

  test("email input field is on the page", async () => {
    const inputEmail = screen.getByTestId<HTMLInputElement>(/^input-email$/);

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail.name).toEqual("email");
    expect(inputEmail.value).toEqual("");
  });

  test("email input field error message should NOT be displayed", async () => {
    const emailErrorMessage = screen.queryByText(
      /^Email address provided is invalid!$/i
    );

    expect(emailErrorMessage).toBeNull();
  });

  test("password input field is on the page", async () => {
    const inputPassword =
      screen.getByTestId<HTMLInputElement>(/^input-password$/);

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword.name).toEqual("password");
    expect(inputPassword.value).toEqual("");
  });

  test("password input field error message should NOT be displayed", async () => {
    const errorMessage = screen.queryByText(
      /^Password must be at least 8 characters long, must have at least one capital letter, one numeric character, and one special character!$/i
    );

    expect(errorMessage).toBeNull();
  });

  test("confirmPassword input field is on the page", async () => {
    const inputConfirmPassword = screen.getByTestId<HTMLInputElement>(
      /^input-confirmPassword$/
    );

    expect(inputConfirmPassword).toBeInTheDocument();
    expect(inputConfirmPassword.name).toEqual("confirmPassword");
    expect(inputConfirmPassword.value).toEqual("");
  });

  test("password input field error message should NOT be displayed", async () => {
    const errorMessage = screen.queryByText(/^Passwords don't match!$/i);

    expect(errorMessage).toBeNull();
  });

  test("buttons '← Back' and 'Sign Up' are on the page", async () => {
    const buttons: HTMLInputElement[] = screen.getAllByRole("button");

    // ← Back
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0].textContent).toEqual("← Back");

    // password
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1].textContent).toEqual("Sign Up");
  });

  test("footer is at the page", () => {
    expect(
      screen.getByText(/^React TypeScript Sign Up SPA PoC$/i)
    ).toBeInTheDocument();
  });
});
