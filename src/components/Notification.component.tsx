import { ReactElement } from "react";
import { TNotificationType } from "../types/types";

interface IProps {
  message: string;
  type: TNotificationType | undefined;
}

function Notification({ message, type }: IProps): ReactElement | null {
  if (!type) return null;
  return (
    <div
      className={`message message--${type?.toString()}`}
      data-testid={`notification`}
    >
      {message.split("\n").map((val, i) => (
        <p key={i}>{val}</p>
      ))}
    </div>
  );
}

export default Notification;
