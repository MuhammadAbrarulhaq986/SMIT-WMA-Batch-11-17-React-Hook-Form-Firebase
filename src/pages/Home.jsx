import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, signOutUser } from "../config/firebase/firebasemethods";

const Home = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDataFromFirebase = async () => {
      try {
        const userData = await getUserData();
        setUserEmail(userData.email);
        setUserName(userData.displayName);
      } catch (error) {
        console.error(error);
      }
    };
    getUserDataFromFirebase();
  }, []);

  const logoutUser = async () => {
    try {
      await signOutUser();
      navigate("login"); // Navigate to the login page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container p-4">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card mt-5 mb-5">
            <div className="card-body bg-black text-white p-5">
              <h1 className="text-center">Welcome, {userName}!</h1>
              <p className="text-center">Your email is: {userEmail}</p>
              <button
                type="button"
                className="btn btn-secondary btn-block mb-3"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
