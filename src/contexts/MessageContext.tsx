import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

import { TNotificationType } from "../types/types";

interface IMessageContextProp {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  messType: TNotificationType | undefined;
  setMessType: Dispatch<SetStateAction<TNotificationType | undefined>>;
  secondsRemaining: number;
  setSecondsRemaining: Dispatch<SetStateAction<number>>;
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
}

interface IProps {
  children: ReactElement;
}

const MessageContext = createContext<IMessageContextProp>(
  {} as IMessageContextProp
);

function MessageProvider({ children }: IProps): ReactElement {
  const [message, setMessage] = useState<string>("");
  const [messType, setMessType] = useState<TNotificationType | undefined>(
    undefined
  );
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(
    function () {
      let id: any;
      if (display && messType && secondsRemaining > 0) {
        id = setInterval(() => {
          setSecondsRemaining((seconds) => seconds - 1);
        }, 1000);
      }

      return () => clearInterval(id);
    },
    [display, messType, secondsRemaining]
  );

  useEffect(
    function () {
      if (secondsRemaining <= 0) {
        setDisplay(false);
      }
    },
    [secondsRemaining]
  );

  useEffect(
    function () {
      if (!display) {
        setMessage("");
        setMessType(undefined);
      }
    },
    [display]
  );

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        messType,
        setMessType,
        secondsRemaining,
        setSecondsRemaining,
        display,
        setDisplay,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

function useMessage() {
  const context = useContext(MessageContext);
  if (context === undefined)
    throw new Error("MessageContext was used outside the MessageProvider");
  return context;
}

export { MessageProvider, useMessage };
