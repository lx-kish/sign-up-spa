import { ReactElement } from "react";

import { useNotification } from "../contexts/NotificationContext";

import Notification from "./Notification.component";

function Main({ children }: { children: ReactElement }): ReactElement {
  const { notificationState } = useNotification();

  return (
    <main className="main">
      {notificationState.display && notificationState.type && (
        <Notification
          type={notificationState.type}
          message={notificationState.notification}
        />
      )}
      {children}
    </main>
  );
}

export default Main;
