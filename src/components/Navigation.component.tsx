import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { routes, navigationLinks } from "../constants/constants";

function Navigation(): ReactElement {
  return (
    <nav className="navigation">
      <ul className="navigation__menu">
        <li>
          <NavLink to={routes.home} className="navigation__btn">
            {navigationLinks.home}
          </NavLink>
        </li>
        <li>
          <NavLink to={routes.signUp} className="navigation__btn">
            {navigationLinks.signUp}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
