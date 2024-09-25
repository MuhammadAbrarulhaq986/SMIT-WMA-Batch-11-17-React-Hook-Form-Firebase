// Import the necessary dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpUser, uploadImage } from "../config/firebase/firebasemethods";
// Import the useNavigate hook from react-router-dom
import { useNavigate } from "react-router-dom";

// Define the Register component
const Register = () => {
  // Initialize the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // getValues is a method on the useForm hook
  } = useForm();
  // Initialize state for image and image error
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  // Initialize the useNavigate hook
  const navigate = useNavigate(); // Use navigate instead of history

  // Define the onSubmit function
  const onSubmit = async (data) => {
    try {
      // Upload image to Firebase Storage
      const userProfileImageUrl = await uploadImage(image, data.email);
      // Create user data object with uploaded image URL
      const userData = await signUpUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        fatherName: data.fatherName,
        phoneNumber: data.phoneNumber,
        cnic: data.cnic,
        dob: data.dob,
        gender: data.gender,
        admissionStatus: data.admissionStatus,
        address: data.address,
        profileImage: userProfileImageUrl,
      });
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  // Define the handleImageChange function
  const handleImageChange = (event) => {
    try {
      // Update image state with selected file
      setImage(event.target.files[0]);
      // Clear image error state
      setImageError(null);
    } catch (error) {
      // Update image error state with error message
      setImageError("Error uploading image: " + error.message);
    }
  };

  // Return the JSX for the Register component
  return (
    // Container for the form
    <div className="container p-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 mb-5">
            <div className="card-body bg-dark text-white p-5">
              <h1 className="text-center">Admission Form</h1>
              {/* Form with onSubmit event handler */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name field */}
                <div className="form-group mb-3">
                  <label htmlFor="fullName" className="text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter your full name"
                    {...register("fullName", { required: true })}
                  />
                  {errors.fullName && (
                    <div className="text-danger">Full name is required</div>
                  )}
                </div>

                {/* Father Name field */}
                <div className="form-group mb-3">
                  <label htmlFor="fatherName" className="text-white">
                    Father Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fatherName"
                    placeholder="Enter your father's name"
                    {...register("fatherName", { required: true })}
                  />
                  {errors.fatherName && (
                    <div className="text-danger">Father name is required</div>
                  )}
                </div>

                {/* Email field */}
                <div className="form-group mb-3">
                  <label htmlFor="email" className="text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <div className="text-danger">Email is required</div>
                  )}
                </div>

                {/* Phone Number field */}
                <div className="form-group mb-3">
                  <label htmlFor="phoneNumber" className="text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    {...register("phoneNumber", { required: true })}
                  />
                  {errors.phoneNumber && (
                    <div className="text-danger">Phone number is required</div>
                  )}
                </div>

                {/* Date of Birth field */}
                <div className="form-group mb-3">
                  <label htmlFor="dob" className="text-white">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    placeholder="mm/dd/yyyy"
                    {...register("dob", { required: true })}
                  />
                  {errors.dob && (
                    <div className="text-danger">Date of birth is required</div>
                  )}
                </div>

                {/* Gender field */}
                <div className="form-group mb-3">
                  <label htmlFor="gender" className="text-white">
                    Gender
                  </label>
                  <select
                    className="form-control"
                    id="gender"
                    {...register("gender", { required: true })}
                  >
                    <option value="Male"> Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <div className="text-danger">Gender is required</div>
                  )}
                </div>

                {/* Admission Status field */}
                <div className="form-group mb-3">
                  <label htmlFor="admissionStatus" className="text-white">
                    Admission Status
                  </label>
                  <select
                    className="form-control"
                    id="admissionStatus"
                    {...register("admissionStatus", { required: true })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.admissionStatus && (
                    <div className="text-danger">
                      Admission status is required
                    </div>
                  )}
                </div>

                {/* Address field */}
                <div className="form-group mb-3">
                  <label htmlFor="address" className="text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter your address"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <div className="text-danger">Address is required</div>
                  )}
                </div>

                {/* Password field */}
                <div className="form-group mb-3">
                  <label htmlFor="password" className="text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger">
                      Password is required and must be at least 8 characters
                    </div>
                  )}
                </div>

                {/* Confirm Password field */}
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword" className="text-white">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => value === getValues().password, // Use getValues correctly
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="text-danger">
                      Confirm password is required and must match password
                    </div>
                  )}
                </div>
                {/* Your Pic field */}
                <div className="form-group mb-3">
                  <label htmlFor="profileImage" className="text-white">
                    Your Pic
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="profileImage"
                    onChange={handleImageChange}
                  />
                  {imageError && (
                    <div className="text-danger">{imageError}</div>
                  )}
                </div>

                {/* Register and Go to Login buttons */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-3"
                >
                  Register
                </button>
                <p className="text-center">
                  Log in page{" "}
                  <a href="#" onClick={() => navigate("/")}>
                    Log In
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
