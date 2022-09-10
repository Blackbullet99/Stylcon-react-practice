import { Fragment } from "react";

import './navigation.style.scss';

import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crwnlogo } from "../../assets/crown.svg";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Crwnlogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
