import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { useNavigate, To } from "react-router-dom";

import { routes } from "../constants/constants";
import { TRoutes } from "../types/types";

interface IRedirectState {
  redirect: boolean;
  destination: TRoutes | number;
}

interface IRedirectContextProp {
  redirectState: IRedirectState;
  setRedirectState: Dispatch<SetStateAction<IRedirectState>>;
}

interface IProps {
  children: ReactElement;
}

const RedirectContext = createContext<IRedirectContextProp>(
  {} as IRedirectContextProp
);

function RedirectProvider({ children }: IProps): ReactElement {
  const navigate = useNavigate();

  const [redirectState, setRedirectState] = useState<IRedirectState>({
    redirect: false,
    destination: routes.home,
  });

  useEffect(
    function () {
      if (redirectState.redirect && redirectState.destination !== routes.none) {
        navigate(redirectState.destination as To);
        setRedirectState({
          ...redirectState,
          redirect: false,
          destination: "",
        });
      }
    },
    [redirectState.redirect]
  );

  return (
    <RedirectContext.Provider
      value={{
        redirectState,
        setRedirectState,
      }}
    >
      {children}
    </RedirectContext.Provider>
  );
}

function useRedirect() {
  const context = useContext(RedirectContext);
  if (context === undefined)
    throw new Error("RedirectContext was used outside the RedirectProvider");
  return context;
}

export { RedirectProvider, useRedirect };
