import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

import { MessageProvider } from "./contexts/MessageContext";
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
        <MessageProvider>
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
        </MessageProvider>
      </RedirectProvider>
    </>
  );
}

export default App;
