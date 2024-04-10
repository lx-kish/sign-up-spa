import { ReactElement, ChangeEvent, FocusEvent, memo } from "react";

interface IProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  pattern?: string;
  errorMessage: string;
  required?: boolean;
  inputClass: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  errorMessageClass: string;
}

function FormInput({
  id,
  name,
  type,
  placeholder,
  label,
  value,
  inputClass,
  errorMessage,
  required,
  onChange,
  onBlur,
  errorMessageClass,
}: IProps): ReactElement {
  return (
    <div className="form-input__container">
      <label className="form-input__label" htmlFor={id}>
        {label} <span>*</span>
      </label>
      <input
        className={`form-input__field${inputClass}`}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onBlur={onBlur}
        data-testid={`input-${name}`}
      />

      <div className="form-input__error-message-container">
        <span
          className={`form-input__error-message${errorMessageClass}`}
          data-testid={`error-${name}`}
        >
          {errorMessage}
        </span>
      </div>
    </div>
  );
}

export default memo(FormInput);
