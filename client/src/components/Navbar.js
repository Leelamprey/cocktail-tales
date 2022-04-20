import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../logo.svg";

const Navbar = ({ token, setToken }) => {
  let history = useHistory();

  async function handleLogout() {
    localStorage.clear();
    setToken(null);
    history.go("/login");
  }

  if (token) {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <Link to="/">
            <img src={logo} alt="cocktail tales logo" className="logo"></img>
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/favourites">favourites</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="cocktail tales logo" className="logo"></img>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/favourites">favourites</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
