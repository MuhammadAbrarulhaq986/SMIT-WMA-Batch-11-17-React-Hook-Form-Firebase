import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, signOutUser } from "../config/firebase/firebasemethods";

// Define the Home component
const Home = () => {
  // Initialize state variables to store user data
  const [userEmail, setUserEmail] = useState(""); // User's email
  const [userName, setUserName] = useState(""); // User's name
  const [fatherName, setFatherName] = useState(""); // User's father's name
  const [phoneNumber, setPhoneNumber] = useState(""); // User's phone number
  const [dateOfBirth, setDateOfBirth] = useState(""); // User's date of birth
  const [address, setAddress] = useState(""); // User's address
  const [profilePicture, setProfilePicture] = useState(""); // User's profile picture URL
  const navigate = useNavigate(); // Navigate function from react-router-dom

  // Use the useEffect hook to fetch user data from Firebase when the component mounts
  useEffect(() => {
    const getUserDataFromFirebase = async () => {
      try {
        // Call the getUserData function to retrieve user data from Firebase
        const userData = await getUserData();
        // Update state variables with the retrieved user data
        setUserEmail(userData.email);
        setUserName(userData.displayName);
        setFatherName(userData.fatherName);
        setPhoneNumber(userData.phoneNumber);
        setDateOfBirth(userData.dateOfBirth);
        setAddress(userData.address);
        setProfilePicture(userData.profilePicture);
      } catch (error) {
        console.error(error); // Log any errors to the console
      }
    };
    getUserDataFromFirebase(); // Call the function to fetch user data
  }, []);

  // Define a function to handle logout
  const logoutUser = async () => {
    try {
      // Call the signOutUser function to sign out the user
      await signOutUser();
      // Navigate to the login page
      navigate("/");
    } catch (error) {
      console.error(error); // Log any errors to the console
    }
  };

  // Render the component
  return (
    <div className="container p-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 mb-5">
            <div className="card-body bg-black text-white p-5">
              <h1 className="text-center">Welcome, {userName}!</h1>
              <p className="text-center">Your email is: {userEmail}</p>
              <p className="text-center">Your father's name is: {fatherName}</p>
              <p className="text-center">Your phone number is: {phoneNumber}</p>
              <p className="text-center">
                Your date of birth is: {dateOfBirth}
              </p>
              <p className="text-center">Your address is: {address}</p>
              {/* Display the profile picture */}
              <img src={profilePicture} alt="Profile Picture" />
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
