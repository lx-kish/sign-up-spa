import {
  useState,
  ReactElement,
  SyntheticEvent,
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useCallback,
} from "react";

import { useNotification } from "../contexts/NotificationContext";
import { useRedirect } from "../contexts/RedirectContext";

import FormInput from "./FormInput.component";
import Button from "./Button.component";

import { apiClient } from "../api/apiCalls";

import {
  timeouts,
  submitStatus,
  notificationTypes,
  routes,
  formFieldExpressions,
} from "../constants/constants";

import { TSubmitStatus } from "../types/types";

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
  const { setNotificationState } = useNotification();

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

  const inputs: {
    id: string;
    name: string;
    type: string;
    placeholder: string;
    label: string;
    required?: boolean;
    isValid: () => [boolean, string];
  }[] = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter a valid email",
      label: "Please provide a valid email address",
      isValid: () => {
        if (isEmpty("email")) return [false, errorMessages.email.empty];

        const valid = formFieldExpressions.email.test(formValues.email);
        return [valid, valid ? "" : errorMessages.email.notEmpty];
      },
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Enter a password",
      label: "Please provide a password",
      isValid: () => {
        if (isEmpty("password")) return [false, errorMessages.password.empty];

        const valid = formFieldExpressions.password.test(formValues.password);
        return [valid, valid ? "" : errorMessages.password.notEmpty];
      },
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm the password",
      label: "Please confirm the password",
      isValid: () => {
        if (isEmpty("confirmPassword"))
          return [false, errorMessages.confirmPassword.empty];

        const valid = formValues.password === formValues.confirmPassword;
        return [valid, valid ? "" : errorMessages.confirmPassword.notEmpty];
      },
    },
  ];

  function isEmpty(field: string): boolean {
    return formValues[field] === "";
  }

  const handleBtnBack = useCallback(function handleBtnBack() {
    setRedirectState({ redirect: true, destination: -1 });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // set form Sign Up button disabled, submit handler is located in useEffect hook
    setStatus(submitStatus.pending);

    let formStatus = true;

    const validationErrors: any = {};
    Object.entries(formValues).map(([key]) => {
      const input = inputs.find((field) => field.name === key);

      const [valid, errorMessage] = input!.isValid();

      validationErrors[`${key}`] = valid;
      validationErrors[`${key}Error`] = errorMessage;

      if (!valid) {
        formStatus = false;
      }
    });

    setFieldsValidation((prevState) => ({
      ...prevState,
      ...validationErrors,
    }));

    if (!formStatus) {
      setNotificationState((prevState) => ({
        ...prevState,
        notification: `Please correct fields pointing with error messages!`,
        type: notificationTypes.error,
        secondsRemaining: timeouts.error,
        display: true,
      }));
      setStatus(submitStatus.rejected);
    }

    if (formStatus) {
      // Form data for submitting:
      setNotificationState((prevState) => ({
        ...prevState,
        notification: `Submitting data to the server...`,
        type: notificationTypes.pending,
        secondsRemaining: timeouts.pending,
        display: true,
      }));

      const { result } = await apiClient.signUp({
        email: formValues.email,
        password: formValues.password,
      });

      setNotificationState((prevState) => ({
        ...prevState,
        notification: `Form has been successfully submitted! Form data is ready to be sent to the server now:
            email: ${formValues.email}
            password: ${formValues.password}`,
        type: notificationTypes.success,
        secondsRemaining: timeouts.success,
        display: true,
      }));

      setStatus(submitStatus.fulfilled);
      setRedirectState({ redirect: true, destination: routes.home });
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onBlur(e: FocusEvent<HTMLInputElement>) {
    const input = inputs.find((field) => field.name === e.target.name);

    const [valid, errorMessage] = input!.isValid();

    setFieldsValidation((prevState) => ({
      ...prevState,
      [e.target.name]: valid,
      [`${e.target.name}Error`]: errorMessage,
    }));
  }

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
      <div className="form__fields">
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
      </div>

      <div className="form__btn-container">
        <Button
          data-testid={`btn-back`}
          onClick={handleBtnBack}
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
