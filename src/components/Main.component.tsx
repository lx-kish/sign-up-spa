import { ReactElement } from "react";

import { useMessage } from "../contexts/MessageContext";

import Message from "./Notification.component";

function Main({ children }: { children: ReactElement }): ReactElement {
  const { message, messType, display } = useMessage();

  return (
    <main className="main">
      {display && messType && <Message type={messType} message={message} />}
      {children}
    </main>
  );
}

export default Main;
