import { describe, test, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";

describe("NO error displayed for the VALID User email input", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa/sign-up"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  /**
   * list of some valid emails (see: https://en.wikipedia.org/wiki/Email_address#Valid_email_addresses):
   *
   * simple@example.com
   * very.common@example.com
   * x@example.com (one-letter local-part)
   * long.email-address-with-hyphens@and.subdomains.example.com
   * user.name+tag+sorting@example.com (may be routed to user.name@example.com inbox depending on mail server)
   * name/surname@example.com (slashes are a printable character, and allowed)
   * example@s.example (see the List of Internet top-level domains)
   * " "@example.org (space between the quotes)
   * "john..doe"@example.org (quoted double dot)
   * mailhost!username@example.org (bangified host route used for uucp mailers)
   * user%example.com@example.org (% escaped mail route to user@example.com via example.org)
   * user-@example.org (local-part ending with non-alphanumeric character from the list of allowed printable characters)
   */

  test(`simple@example.com - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, "simple@example.com");

    expect(email.value).toEqual("simple@example.com");

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`very.common@example.com - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, "very.common@example.com");

    expect(email.value).toEqual("very.common@example.com");

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`x@example.com - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, "x@example.com");

    expect(email.value).toEqual("x@example.com");

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`long.email-address-with-hyphens@and.subdomains.example.com - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(
      email,
      "long.email-address-with-hyphens@and.subdomains.example.com"
    );

    expect(email.value).toEqual(
      "long.email-address-with-hyphens@and.subdomains.example.com"
    );

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`user.name+tag+sorting@example.com - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, "user.name+tag+sorting@example.com");

    expect(email.value).toEqual("user.name+tag+sorting@example.com");

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`name/surname@example.com - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, "name/surname@example.com");

    expect(email.value).toEqual("name/surname@example.com");

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`example@s.example - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, "example@s.example");

    expect(email.value).toEqual("example@s.example");

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`"john..doe"@example.org - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `"john..doe"@example.org`);

    expect(email.value).toEqual(`"john..doe"@example.org`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`mailhost!username@example.org - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `mailhost!username@example.org`);

    expect(email.value).toEqual(`mailhost!username@example.org`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`user%example.com@example.org - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `user%example.com@example.org`);

    expect(email.value).toEqual(`user%example.com@example.org`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`user-@example.org - NO error displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `user-@example.org`);

    expect(email.value).toEqual(`user-@example.org`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });
});

describe("ERROR displayed for the INVALID User email input", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa/sign-up"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  /**
   * list of some invalid emails (see: https://en.wikipedia.org/wiki/Email_address#Invalid_email_addresses):
   *
   * abc.example.com (no @ character)
   * a@b@c@example.com (only one @ is allowed outside quotation marks)
   * a"b(c)d,e:f;g<h>i@example.com (none of the special characters in this local-part are allowed outside quotation marks)
   * just"not"right@example.com (quoted strings must be dot separated or be the only element making up the local-part)
   * this is"not\allowed@example.com (spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash)
   * this\ still\"not\\allowed@example.com (even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes)
   * i.like.underscores@but_they_are_not_allowed_in_this_part (underscore is not allowed in domain part)
   */

  test(`abc.example.com - ERROR displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `abc.example.com`);

    expect(email.value).toEqual(`abc.example.com`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`a@b@c@example.com - ERROR displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `a@b@c@example.com`);

    expect(email.value).toEqual(`a@b@c@example.com`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`a"b(c)d,e:f;g<h>i@example.com - ERROR displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `a"b(c)d,e:f;g<h>i@example.com`);

    expect(email.value).toEqual(`a"b(c)d,e:f;g<h>i@example.com`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`a"b(c)d,e:f;g<h>i@example.com - ERROR displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `a"b(c)d,e:f;g<h>i@example.com`);

    expect(email.value).toEqual(`a"b(c)d,e:f;g<h>i@example.com`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`just"not"right@example.com - ERROR displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `just"not"right@example.com`);

    expect(email.value).toEqual(`just"not"right@example.com`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`this is"not\allowed@example.com - ERROR displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `this is"not\allowed@example.com`);

    expect(email.value).toEqual(`this is"not\allowed@example.com`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`this\ still\"not\\allowed@example.com - ERROR displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(email, `this\ still\"not\\allowed@example.com`);

    expect(email.value).toEqual(`this\ still\"not\\allowed@example.com`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`i.like.underscores@but_they_are_not_allowed_in_this_part - ERROR displayed after user types this address into email input field`, async () => {
    const user = userEvent.setup();
    const email = screen.getByTestId<HTMLInputElement>(/^input-email$/i);

    await user.type(
      email,
      `i.like.underscores@but_they_are_not_allowed_in_this_part`
    );

    expect(email.value).toEqual(
      `i.like.underscores@but_they_are_not_allowed_in_this_part`
    );

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-email$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });
});

describe("NO error displayed for the VALID User password input", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa/sign-up"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test(`qweRTY1$ - NO error displayed after user types the password into password input field`, async () => {
    const user = userEvent.setup();
    const password = screen.getByTestId<HTMLInputElement>(/^input-password$/i);

    await user.type(password, `qweRTY1$`);

    expect(password.value).toEqual(`qweRTY1$`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-password$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`~!@#$%^&*()_-+=\|:;"'<,>.?/qW1 - NO error displayed after user types the password into password input field`, async () => {
    const user = userEvent.setup();
    const password = screen.getByTestId<HTMLInputElement>(/^input-password$/i);

    await user.type(password, `~!@#$%^&*()_-+=\|:;"'<,>.?/qW1`);

    expect(password.value).toEqual(`~!@#$%^&*()_-+=\|:;"'<,>.?/qW1`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-password$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });
});

describe("ERROR displayed for the INVALID User password input", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa/sign-up"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test(`qweRT1$ (less than 8 characters) - ERROR displayed after user types the password into password input field`, async () => {
    const user = userEvent.setup();
    const password = screen.getByTestId<HTMLInputElement>(/^input-password$/i);

    await user.type(password, `qweRT1$`);

    expect(password.value).toEqual(`qweRT1$`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-password$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`qwertY!$ (no number) - ERROR displayed after user types this address into password input field`, async () => {
    const user = userEvent.setup();
    const password = screen.getByTestId<HTMLInputElement>(/^input-password$/i);

    await user.type(password, `qwertY!$`);

    expect(password.value).toEqual(`qwertY!$`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-password$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`QWERTY1$ (no lowercase letters) - ERROR displayed after user types this address into password input field`, async () => {
    const user = userEvent.setup();
    const password = screen.getByTestId<HTMLInputElement>(/^input-password$/i);

    await user.type(password, `QWERTY1$`);

    expect(password.value).toEqual(`QWERTY1$`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-password$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });

  test(`qwerty1$ (no uppercase letters) - ERROR displayed after user types this address into password input field`, async () => {
    const user = userEvent.setup();
    const password = screen.getByTestId<HTMLInputElement>(/^input-password$/i);

    await user.type(password, `qwerty1$`);

    expect(password.value).toEqual(`qwerty1$`);

    await user.tab();

    const passwordErrorMessage = screen.getByTestId(/^error-password$/i);

    expect(passwordErrorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });
});

describe("confirmPassword input field matching password input field", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/sign-up-spa/sign-up"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test(`NO error displayed when the confirmPassword field value matches the password input field value`, async () => {
    const user = userEvent.setup();
    const password = screen.getByTestId<HTMLInputElement>(/^input-password$/i);

    await user.type(password, `qweRTY1$`);

    expect(password.value).toEqual(`qweRTY1$`);

    const confirmPassword = screen.getByTestId<HTMLInputElement>(
      /^input-confirmPassword$/i
    );

    await user.type(confirmPassword, `qweRTY1$`);

    expect(confirmPassword.value).toEqual(`qweRTY1$`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-confirmPassword$/i);

    expect(errorMessage.getAttribute("class")).not.toContain(
      "form-input__error-message--error"
    );
  });

  test(`ERROR displayed when the confirmPassword field value DOES NOT match the password input field value`, async () => {
    const user = userEvent.setup();
    const password = screen.getByTestId<HTMLInputElement>(/^input-password$/i);

    await user.type(password, `qweRTY1$`);

    expect(password.value).toEqual(`qweRTY1$`);

    const confirmPassword = screen.getByTestId<HTMLInputElement>(
      /^input-confirmPassword$/i
    );

    await user.type(confirmPassword, `q`);

    expect(confirmPassword.value).toEqual(`q`);

    await user.tab();

    const errorMessage = screen.getByTestId(/^error-confirmPassword$/i);

    expect(errorMessage.getAttribute("class")).toContain(
      "form-input__error-message--error"
    );
  });
});
