import { ReactElement } from "react";

import Navigation from "./Navigation.component";

function Header(): ReactElement {
  return (
    <div className="header">
      <Navigation />
    </div>
  );
}

export default Header;
