import { describe, test, expect } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";
import { act } from "react-dom/test-utils";

describe("Form submitting tests", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/sign-up"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test(`ALL input fields are EMPTY`, async () => {
    const user = userEvent.setup();

    // const submitBtn = screen.getByTestId(/btn-submit/);
    const submitBtn = screen.getByRole("button", { name: /Sign Up/i });
    // const submitBtn = await screen.findByRole("button", { name: "Sign Up" });
    // expect(submitBtn).toHaveTextContent("Sign Up");
    // expect(submitBtn).toBeInTheDocument();
    // const backBtn = screen.getByText("← Back");
    // const backBtn = screen.getByRole("button", { name: /← Back/i });

    // screen.debug();

    const email = screen.getByPlaceholderText<HTMLInputElement>(
      /^Enter a valid email$/
    );

    expect(email).toBeInTheDocument();
    expect(email.name).toEqual("email");
    expect(email.value).toEqual("");

    const password =
      screen.getByPlaceholderText<HTMLInputElement>(/^Enter a password$/);

    expect(password).toBeInTheDocument();
    expect(password.name).toEqual("password");
    expect(password.value).toEqual("");

    const confirmPassword = screen.getByPlaceholderText<HTMLInputElement>(
      /^Confirm the password$/
    );

    expect(confirmPassword).toBeInTheDocument();
    expect(confirmPassword.name).toEqual("confirmPassword");
    expect(confirmPassword.value).toEqual("");

    // user clicks Sign Up button
    // await user.click(backBtn);

    // fireEvent.click(submitBtn);
    // await user.click(submitBtn);

    // screen.debug();

    fireEvent.click(submitBtn);
    expect(submitBtn).toBeCalled();
    // await waitFor(async () => {
    //   // await user.click(submitBtn);
    //   const errorMessage = await screen.queryByText(
    //     /^Email field cannot be empty!$/i
    //   );
    //   console.log(errorMessage);
    //   expect(errorMessage).toBeVisible();

    //   // expect(
    //   //   await screen.queryByText(/^Email field cannot be empty!$/i)
    //   // ).toBeInTheDocument();
    //   // const errorMessage = screen.getByText(
    //   //   /^Please correct fields pointing with error messages!$/
    //   // );
    //   // console.log(errorMessage);
    //   // expect(errorMessage).toBeInTheDocument();
    // });

    // test(`EMAIL is filled, the rest are EMPTY`, async () => {
    //   const user = userEvent.setup();

    //   const submitBtn = screen.getByRole("button", { name: /Sign Up/i });
    //   // expect(submitBtn).toBeInTheDocument();

    //   const email = screen.getByPlaceholderText<HTMLInputElement>(
    //     /^Enter a valid email$/
    //   );

    //   expect(email).toBeInTheDocument();
    //   expect(email.name).toEqual("email");
    //   expect(email.value).toEqual("");

    //   const password =
    //     screen.getByPlaceholderText<HTMLInputElement>(/^Enter a password$/);

    //   expect(password).toBeInTheDocument();
    //   expect(password.name).toEqual("password");
    //   expect(password.value).toEqual("");

    //   const confirmPassword = screen.getByPlaceholderText<HTMLInputElement>(
    //     /^Confirm the password$/
    //   );

    //   expect(confirmPassword).toBeInTheDocument();
    //   expect(confirmPassword.name).toEqual("confirmPassword");
    //   expect(confirmPassword.value).toEqual("");

    //   await user.type(email, "very.common@example.com");

    //   const filledEmail = screen.getByDisplayValue(/"very.common@example.com"/i);
    //   expect(filledEmail).toBeInTheDocument();
    //   // expect(email.value).toEqual("very.common@example.com");

    //   // user clicks Sign Up button
    //   await user.click(submitBtn);

    //   const notification = screen.queryByTestId(/^notification$/i);
    //   expect(notification).not.toBeNull();

    //   // console.log(notification?.textContent);

    //   const emailError = screen.queryByText(/^Email field cannot be empty!$/i);
    //   expect(emailError).not.toBeNull();

    //   const passwordError = screen.queryByText(
    //     /^Password field cannot be empty!$/
    //   );
    //   expect(passwordError).not.toBeNull();

    //   const confirmPasswordError = screen.queryByText(
    //     /^Confirm password field cannot be empty!$/
    //   );
    //   expect(confirmPasswordError).not.toBeNull();
  });

  // ***********************************************************************
  // const password =
  //   screen.getByPlaceholderText<HTMLInputElement>(/^Enter a password$/i);

  // await user.type(password, `qweRTY1$`);

  // expect(password.value).toEqual(`qweRTY1$`);

  // const confirmPassword = screen.getByPlaceholderText<HTMLInputElement>(
  //   /^Confirm the password$/i
  // );

  // await user.type(confirmPassword, `qweRTY1$`);

  // expect(confirmPassword.value).toEqual(`qweRTY1$`);

  // await user.tab();

  // const errorMessage = screen.getByText(/^Passwords don't match!$/i);

  // expect(errorMessage.getAttribute("class")).not.toContain(
  //   "form-input__error-message--error"
  // );
});
