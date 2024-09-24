import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../config/firebase/firebasemethods";
import "bootstrap/dist/css/bootstrap.min.css"; // Add this line

const Navbar = () => {
  const [isUser, setIsUser] = useState(false); // Add a state to track user login status

  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await signOutUser();
      setIsUser(false); // Set isUser to false after logout
      navigate("login"); // Navigate to the login page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <ul className="nav nav-pills justify-content-center m-5">
            <li className="nav-item">
              <Link
                className="nav-link text-white display-4"
                style={{ fontSize: 30 }}
                to="/"
              >
                Home
              </Link>
            </li>
            {isUser ? (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-secondary text-white display-4"
                    style={{ fontSize: 30 }}
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white display-4"
                    style={{ fontSize: 30 }}
                    to="login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white display-4"
                    style={{ fontSize: 30 }}
                    to="register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
