import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser, signOutUser } from "../config/firebase/firebasemethods";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isUser, setIsUser] = useState(false); // Add a state to track user login status

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginUserFromFirebase = async (data) => {
    console.log(data);
    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log(userLogin);
      setIsUser(true); // Set isUser to true after successful login
      navigate("/home"); // Navigate to the homepage
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className="container p-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card mt-5 mb-5">
              {" "}
              {/* added margin top and bottom */}
              <div className="card-body bg-black text-white p-5">
                <h1 className="text-center">Login</h1>
                <form onSubmit={handleSubmit(loginUserFromFirebase)}>
                  <div className="form-group mb-3">
                    {" "}
                    {/* added margin bottom */}
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        This field is required
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    {" "}
                    {/* added margin bottom */}
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        This field is required
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3"
                  >
                    {" "}
                    {/* added margin bottom */}
                    Login
                  </button>
                  <p className="text-center">
                    Don't have an account?{" "}
                    <a href="#" onClick={() => navigate("/register")}>
                      Register
                    </a>
                  </p>
                </form>
                {isUser && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-block mb-3"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
