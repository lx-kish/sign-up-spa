import {
  useState,
  ReactElement,
  SyntheticEvent,
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useEffect,
} from "react";

import { useMessage } from "../contexts/MessageContext";
import { useRedirect } from "../contexts/RedirectContext";

import FormInput from "./FormInput.component";
import Button from "./Button.component";

import {
  timeouts,
  submitStatus,
  notificationTypes,
} from "../constants/constants";

import { TSubmitStatus, TNotificationType } from "../types/types";

interface IFormValuesStateType {
  [key: string]: string;
}

interface IFieldsValidationStateType {
  [key: string]: boolean | string;
}

interface IErrorMessages {
  email: { [key: string]: string };
  password: { [key: string]: string };
  confirmPassword: { [key: string]: string };
}

const errorMessages: IErrorMessages = {
  email: {
    empty: "Email field cannot be empty!",
    notEmpty: "Please provide a valid email address!",
  },
  password: {
    empty: "Password field cannot be empty!",
    notEmpty:
      "Password must be at least 8 characters long, must have at least one capital letter, one numeric character, and one special character!",
  },
  confirmPassword: {
    empty: "Confirm password field cannot be empty!",
    notEmpty: "Confirm password doesn't match Password!",
  },
};

function Form(): ReactElement {
  // display message
  const { setMessage, setMessType, setSecondsRemaining, setDisplay } =
    useMessage();

  // redirect after submitting
  const { setRedirectState } = useRedirect();

  // form values
  const [formValues, setFormValues] = useState<IFormValuesStateType>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // form fields validation
  const [fieldsValidation, setFieldsValidation] =
    useState<IFieldsValidationStateType>({
      email: true,
      emailError: "",
      password: true,
      passwordError: "",
      confirmPassword: true,
      confirmPasswordError: "",
    });

  const [status, setStatus] = useState<TSubmitStatus>(submitStatus.rejected);

  // redirect after submitting
  useEffect(
    function () {
      if (status === submitStatus.fulfilled) {
        setRedirectState({ redirect: true, destination: "/" });
      }
    },
    [status]
  );

  // submitting if all form fields are valid
  useEffect(
    function () {
      const valid =
        fieldsValidation.email &&
        fieldsValidation.password &&
        fieldsValidation.confirmPassword;

      if (!valid && status === submitStatus.pending) {
        displayMessage(
          notificationTypes.error,
          `Please correct fields pointing with error messages!`,
          timeouts.ERROR_MESSAGE_TIMEOUT,
          true
        );
        setStatus(submitStatus.rejected);
        return;
      }

      if (valid && status === submitStatus.pending) {
        // Form data for submitting:
        displayMessage(
          notificationTypes.success,
          `Form has been successfully submitted! Form data is ready to be sent to the server now:
          email: ${formValues.email}
          password: ${formValues.password}`,
          timeouts.SUCCESS_MESSAGE_TIMEOUT,
          true
        );
        setStatus(submitStatus.fulfilled);
      }
    },
    [fieldsValidation, status]
  );

  function displayMessage(
    type: TNotificationType,
    text: string,
    seconds: number,
    show: boolean
  ): void {
    setMessType(type);
    setMessage(text);
    setSecondsRemaining(seconds);
    setDisplay(show);
  }

  function validationRules(field: string, value: string): [boolean, string] {
    let valid = true;
    let errorMessage = "";

    // empty field
    if (value === "") {
      valid = false;
      errorMessage = errorMessages[field as keyof IErrorMessages]
        .empty as string;

      return [valid, errorMessage];
    }

    if (field === "email") {
      const expression =
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{1,1})+[^<>()\.,;:\s@\"]{2,})$/;

      valid = expression.test(value);
    }

    if (field === "password") {
      const expression =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/;

      valid = expression.test(value);
    }

    if (field === "confirmPassword") {
      valid = formValues.password === formValues.confirmPassword;
    }

    errorMessage = valid
      ? ""
      : (errorMessages[field as keyof IErrorMessages].notEmpty as string);

    return [valid, errorMessage];
  }

  function handleBtnBack(e: SyntheticEvent<Element, Event>) {
    e.preventDefault();
    setRedirectState({ redirect: true, destination: -1 });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus(submitStatus.pending);

    const data = new FormData(e.currentTarget);

    const dataEntries = Object.fromEntries(data.entries());

    Object.entries(dataEntries).map(([key, value]) => {
      const [valid, errorMessage] = validationRules(key, value.toString());
      setFieldsValidation((prevState) => ({
        ...prevState,
        [key]: valid,
        [`${key}Error`]: errorMessage,
      }));
    });
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onBlur(e: FocusEvent<HTMLInputElement>) {
    const [valid, error] = validationRules(e.target.name, e.target.value);

    setFieldsValidation((prevState) => ({
      ...prevState,
      [e.target.name]: valid,
      [`${e.target.name}Error`]: error,
    }));
  }

  const inputs: {
    id: string;
    name: string;
    type: string;
    placeholder: string;
    label: string;
    required?: boolean;
  }[] = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter a valid email",
      label: "Please provide a valid email address",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Enter a password",
      label: "Please provide a password",
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm the password",
      label: "Please confirm the password",
    },
  ];

  return (
    <form
      className="form"
      onSubmit={(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) =>
        handleSubmit(e)
      }
    >
      <h3 className="form__header">Register form</h3>
      <p className="form__disclamer">
        <span>⚠️</span> This is a code demo form! Please <b>DO NOT</b> provide
        real passwords or any other sensitive data on this page!
        <span>⚠️</span>
      </p>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={formValues[input.id]}
          onChange={onChange}
          onBlur={onBlur}
          inputClass={
            fieldsValidation[input.id] ? "" : " form-input__field--error"
          }
          errorMessage={fieldsValidation[`${input.id}Error`] as string}
          errorMessageClass={
            fieldsValidation[input.id]
              ? ""
              : " form-input__error-message--error"
          }
        />
      ))}

      <div className="form__btn-container">
        <Button
          data-testid={`btn-back`}
          onClick={(e) => handleBtnBack(e)}
          btnClassName="btn btn-back"
        >
          &larr; Back
        </Button>
        <Button
          data-testid={`btn-submit`}
          type="submit"
          btnClassName="btn btn-submit"
          disabled={status === submitStatus.pending}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export default Form;
