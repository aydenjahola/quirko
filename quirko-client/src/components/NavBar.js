import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "./logo-no-background.png";
import { AuthContext } from "../contexts/AuthContext";
import { database } from "../index";
import "./Navbar.css";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      const userRef = database.ref(`users/${currentUser.uid}`);
      userRef.on("value", (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.username) {
          setUsername(userData.username);
        }
      });
    }
  }, [currentUser]);

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
        <Link to="/">
          <img src={logo} alt="Quirko Logo" />
        </Link>
      </div>
      <div className="navbar-links">
        {currentUser ? (
          <>
            {currentUser.isAnonymous ? (
              <span className="navbar-link">Logged in as Anonymous</span>
            ) : (
              <span
                className="navbar-link"
                onClick={handleProfileClick}
                style={{ cursor: "pointer" }}
              >
                Logged in as {username}
              </span>
            )}
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
