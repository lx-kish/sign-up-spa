import { ReactElement, ReactNode, SyntheticEvent } from "react";

interface IProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactElement | ReactNode | undefined;
  onClick?: (() => void) | ((e: SyntheticEvent) => void) | undefined;
  btnClassName?: string;
  disabled?: boolean;
}

function Button({
  type = "button",
  children = undefined,
  onClick = undefined,
  btnClassName = "",
  disabled = false,
}: IProps): ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      className={btnClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
