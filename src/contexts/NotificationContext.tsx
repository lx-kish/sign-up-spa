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

import { notificationTypes } from "../constants/constants";

interface INotificationContextProp {
  notificationState: INotificationStateType;
  setNotificationState: Dispatch<SetStateAction<INotificationStateType>>;
}

interface IProps {
  children: ReactElement;
}

interface INotificationStateType {
  notification: string;
  type: TNotificationType | undefined;
  secondsRemaining: number;
  display: boolean;
}

const NotificationContext = createContext<INotificationContextProp>(
  {} as INotificationContextProp
);

function NotificationProvider({ children }: IProps): ReactElement {
  const [notificationState, setNotificationState] =
    useState<INotificationStateType>({
      notification: "",
      type: "",
      secondsRemaining: 0,
      display: false,
    });

  useEffect(
    function () {
      let id: any;
      if (
        notificationState.display &&
        notificationState.type &&
        notificationState.secondsRemaining > 0
      ) {
        id = setInterval(() => {
          setNotificationState((prevState) => ({
            ...prevState,
            secondsRemaining: prevState.secondsRemaining - 1,
          }));
        }, 1000);
      }

      return () => clearInterval(id);
    },
    [
      notificationState.display,
      notificationState.type,
      notificationState.secondsRemaining,
    ]
  );

  useEffect(
    function () {
      if (notificationState.secondsRemaining <= 0) {
        setNotificationState((prevState) => ({
          ...prevState,
          display: false,
        }));
      }
    },
    [notificationState.secondsRemaining]
  );

  useEffect(
    function () {
      if (!notificationState.display) {
        setNotificationState((prevState) => ({
          ...prevState,
          notification: "",
          type: notificationTypes.none,
        }));
      }
    },
    [notificationState.display]
  );

  return (
    <NotificationContext.Provider
      value={{
        notificationState,
        setNotificationState,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined)
    throw new Error(
      "NotificationContext was used outside the NotificationProvider"
    );
  return context;
}

export { NotificationProvider, useNotification };
