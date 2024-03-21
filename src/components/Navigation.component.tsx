import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

function Navigation(): ReactElement {
  return (
    <nav className="navigation">
      <ul className="navigation__menu">
        <li>
          <NavLink to="/sign-up-spa" className="navigation__btn">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up-spa/sign-up" className="navigation__btn">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
