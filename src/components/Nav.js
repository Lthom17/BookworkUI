
import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../components/Context/UserContext";
import "../styles/Navbar.css";

import logo from "./resources/bookworm_logo.png";


function Nav() {

  const history = useLocation();

  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    //TODO: handle Logout
  };

  // TODO: Create a collapsable menu for mobile view

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt=""></img>
        </a>
      </div>
      <div className="navbar-right">

        {user ? (
          <>
            <Link to="/library">Library</Link>

            <Link to="/" onClick={logout}>
              Logout: {user.user.sub}
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link">
              Register
            </Link>

            <Link to="/login" className="nav-link">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
