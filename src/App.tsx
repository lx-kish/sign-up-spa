import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

import { NotificationProvider } from "./contexts/NotificationContext";
import { RedirectProvider } from "./contexts/RedirectContext";

import HomePage from "./pages/Home.page";
import SignUp from "./pages/SignUp.page";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import Main from "./components/Main.component";

function App(): ReactElement {
  return (
    <>
      <RedirectProvider>
        <NotificationProvider>
          <div>
            <Header />
            <Main>
              <Routes>
                <Route path="/sign-up-spa" element={<HomePage />} />
                <Route path="/sign-up-spa/sign-up" element={<SignUp />} />
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
