import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../components/Context/UserContext";
import "../styles/Navbar.css";

import logo from "./resources/bookworm_logo.png";

function Nav() {
  const [search, setSearch] = useState("");

  const history = useLocation();

  const { user } = useAuth();

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${search}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    //TODO: handle Logout
  };

  // TODO: Create a collapsable menu for mobile view

  return (
    <nav className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-50 shadow blue lighten-2 ">
      <div className="justify-between md:items-center md:flex">
        <div className="fixed top-0 mx-auto">
          <a href="/" className="brand-logo">
            <img src={logo} className="brand-logo-img" alt=""></img>
          </a>
        </div>
        <ul
          id="nav-mobile"
          className="right hide-on-med-and-down align-wrapper"
        >
          <li>
            <form onSubmit={(e) => onSearchSubmit(e)}>
              <div className="input-field">
                <i className="material-icons prefix">search</i>
                <input id="search" type="text" onChange={updateSearch} />
              </div>
            </form>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/library">Library</Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  Logout: {user.user.sub}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
