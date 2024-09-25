import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../config/firebase/firebasemethods";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Navbar = () => {
  // State to track user login status
  const [isUser, setIsUser] = useState(false);

  // Use the useNavigate hook to navigate between routes
  const navigate = useNavigate();

  // Logout function, signs out the user and navigates to the login page
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
            {isUser ? (
              // If the user is logged in, show the Home link and Logout button
              <>
                <li className="nav-item">
                  {/* Link to the Home page */}
                  <Link
                    className="nav-link text-white display-4"
                    style={{ fontSize: 30 }}
                    to="home"
                  >
                    Home
                  </Link>
                </li>
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
              // If the user is not logged in, show the Login and Register links
              <>
                <li className="nav-item">
                  {/* Link to the Login page */}
                  <Link
                    className="nav-link text-white display-4"
                    style={{ fontSize: 30 }}
                    to="/"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  {/* Link to the Register page */}
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
