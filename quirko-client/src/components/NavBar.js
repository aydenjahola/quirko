import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "./logo-no-background.png";
import { AuthContext } from "../contexts/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleProfileClick = () => {
    history.push("/update-profile");
  };

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log("Failed to log out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="Quirko Logo" />
        </a>
      </div>
      <div className="navbar-links">
        {currentUser ? (
          <>
            <span
              className="navbar-link"
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            >
              Logged in as {currentUser.email}
            </span>
            <button
              className="navbar-link logout-button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
