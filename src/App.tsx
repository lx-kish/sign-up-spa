import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

import { NotificationProvider } from "./contexts/NotificationContext";
import { RedirectProvider } from "./contexts/RedirectContext";

import HomePage from "./pages/Home.page";
import SignUp from "./pages/SignUp.page";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import Main from "./components/Main.component";
import { routes } from "./constants/constants";

function App(): ReactElement {
  return (
    <>
      <RedirectProvider>
        <NotificationProvider>
          <div>
            <Header />
            <Main>
              <Routes>
                <Route path={routes.home} element={<HomePage />} />
                <Route path={routes.signUp} element={<SignUp />} />
              </Routes>
            </Main>
            <Footer />
          </div>
        </NotificationProvider>
      </RedirectProvider>
    </>
  );
}

export default App;
