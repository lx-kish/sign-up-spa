import { describe, test, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";
import { routes } from "../constants/constants";

interface ITestDataSet {
  description: string;
  placeholder: RegExp;
  testId: RegExp;
  expectations: boolean;
  testData: {
    testCase: string;
    userInput: string;
  }[];
}

const testDataSet: ITestDataSet[] = [
  {
    // const testDataSet: {description: {placeholder: string, testId: string, testData: {testCase: string, userInput: string}[]}[] = [{
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
    description: "NO error displayed for the VALID User email input",
    placeholder: /^Enter a valid email$/i,
    testId: /^error-email$/i,
    expectations: false,
    testData: [
      {
        testCase: `simple@example.com - NO error displayed after user types this address into email input field`,
        userInput: `simple@example.com`,
      },
      {
        testCase: `very.common@example.com - NO error displayed after user types this address into email input field`,
        userInput: `very.common@example.com`,
      },
      {
        testCase: `x@example.com - NO error displayed after user types this address into email input field`,
        userInput: `x@example.com`,
      },
      {
        testCase: `long.email-address-with-hyphens@and.subdomains.example.com - NO error displayed after user types this address into email input field`,
        userInput: `long.email-address-with-hyphens@and.subdomains.example.com`,
      },
      {
        testCase: `user.name+tag+sorting@example.com - NO error displayed after user types this address into email input field`,
        userInput: `user.name+tag+sorting@example.com`,
      },
      {
        testCase: `name/surname@example.com - NO error displayed after user types this address into email input field`,
        userInput: `name/surname@example.com`,
      },
      {
        testCase: `example@s.example - NO error displayed after user types this address into email input field`,
        userInput: `example@s.example`,
      },
      {
        testCase: `"john..doe"@example.org - NO error displayed after user types this address into email input field`,
        userInput: `"john..doe"@example.org`,
      },
      {
        testCase: `mailhost!username@example.org - NO error displayed after user types this address into email input field`,
        userInput: `mailhost!username@example.org`,
      },
      {
        testCase: `user%example.com@example.org - NO error displayed after user types this address into email input field`,
        userInput: `user%example.com@example.org`,
      },
      {
        testCase: `user-@example.org - NO error displayed after user types this address into email input field`,
        userInput: `user-@example.org`,
      },
    ],
  },
  {
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
    description: `ERROR displayed for the INVALID User email input`,
    placeholder: /^Enter a valid email$/i,
    testId: /^error-email$/i,
    expectations: true,
    testData: [
      {
        testCase: `abc.example.com - ERROR displayed after user types this address into email input field`,
        userInput: `abc.example.com`,
      },
      {
        testCase: `a@b@c@example.com - ERROR displayed after user types this address into email input field`,
        userInput: `a@b@c@example.com`,
      },
      {
        testCase: `a"b(c)d,e:f;g<h>i@example.com - ERROR displayed after user types this address into email input field`,
        userInput: `a"b(c)d,e:f;g<h>i@example.com`,
      },
      {
        testCase: `just"not"right@example.com - ERROR displayed after user types this address into email input field`,
        userInput: `just"not"right@example.com`,
      },
      {
        testCase: `this is"not\allowed@example.com - ERROR displayed after user types this address into email input field`,
        userInput: `this is"not\allowed@example.com`,
      },
      {
        testCase: `this\ still\"not\\allowed@example.com - ERROR displayed after user types this address into email input field`,
        userInput: `this\ still\"not\\allowed@example.com`,
      },
      {
        testCase: `i.like.underscores@but_they_are_not_allowed_in_this_part - ERROR displayed after user types this address into email input field`,
        userInput: `i.like.underscores@but_they_are_not_allowed_in_this_part`,
      },
    ],
  },
  {
    description: `NO error displayed for the VALID User password input`,
    placeholder: /^Enter a password$/i,
    testId: /^error-password$/i,
    expectations: false,
    testData: [
      {
        testCase: `qweRTY1$ - NO error displayed after user types the password into password input field`,
        userInput: `qweRTY1$`,
      },
      {
        testCase: `~!@#$%^&*()_-+=\|:;"'<,>.?/qW1 - NO error displayed after user types the password into password input field`,
        userInput: `~!@#$%^&*()_-+=\|:;"'<,>.?/qW1`,
      },
    ],
  },
  {
    description: `ERROR displayed for the INVALID User password input`,
    placeholder: /^Enter a password$/i,
    testId: /^error-password$/i,
    expectations: true,
    testData: [
      {
        testCase: `qweRT1$ (less than 8 characters) - ERROR displayed after user types the password into password input field`,
        userInput: `qweRT1$`,
      },
      {
        testCase: `qwertY!$ (no number) - ERROR displayed after user types this address into password input field`,
        userInput: `qwertY!$`,
      },
      {
        testCase: `QWERTY1$ (no lowercase letters) - ERROR displayed after user types this address into password input field`,
        userInput: `QWERTY1$`,
      },
      {
        testCase: `qwerty1$ (no uppercase letters) - ERROR displayed after user types this address into password input field`,
        userInput: `qwerty1$`,
      },
    ],
  },
];

// running tests for the data set
testDataSet.forEach((dataset): void => {
  describe(dataset.description, () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={[routes.signUp]}>
          <App />
        </MemoryRouter>
      );
    });

    afterEach(cleanup);

    dataset.testData.forEach((testCase: any) => {
      test(testCase.testCase, async () => {
        const user = userEvent.setup();
        const email = screen.getByPlaceholderText<HTMLInputElement>(
          dataset.placeholder
        );

        await user.type(email, testCase.userInput);

        expect(email.value).toEqual(testCase.userInput);

        await user.tab();

        const errorMessage = screen.getByTestId(dataset.testId);

        if (dataset.expectations) {
          expect(errorMessage.getAttribute("class")).toContain(
            "form-input__error-message--error"
          );
        }
        if (!dataset.expectations) {
          expect(errorMessage.getAttribute("class")).not.toContain(
            "form-input__error-message--error"
          );
        }
      });
    });
  });
});

test.only("validate when submit", async () => {
  render(
    <MemoryRouter initialEntries={[routes.signUp]}>
      <App />
    </MemoryRouter>
  );

  const user = userEvent.setup();

  const password = "A123123$a";
  const paswordInput = screen.getByLabelText("Please provide a password *");
  const confirmInput = screen.getByLabelText("Please confirm the password *");

  await user.type(paswordInput, password);
  await user.type(confirmInput, password);
  await user.click(screen.getByRole("button", { name: "Sign Up" }));

  expect(screen.getByText("Email field cannot be empty!")).toBeInTheDocument();
});

test.only("display message while submitting the form", async () => {
  render(
    <MemoryRouter initialEntries={[routes.signUp]}>
      <App />
    </MemoryRouter>
  );

  const user = userEvent.setup();

  const email = "test@test.test";
  const password = "A123123$a";
  const emailInput = screen.getByLabelText(
    "Please provide a valid email address *"
  );
  const paswordInput = screen.getByLabelText("Please provide a password *");
  const confirmInput = screen.getByLabelText("Please confirm the password *");

  await user.type(emailInput, email);
  await user.type(paswordInput, password);
  await user.type(confirmInput, password);
  await user.click(screen.getByRole("button", { name: "Sign Up" }));

  expect(
    screen.getByText("Submitting data to the server...")
  ).toBeInTheDocument();
});
