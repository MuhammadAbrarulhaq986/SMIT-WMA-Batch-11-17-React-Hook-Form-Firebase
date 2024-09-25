import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginUser, signOutUser } from "../config/firebase/firebasemethods";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase/firebasemethods"; // Import the auth object
import Home from "./Home"; // Import the Home component

const Login = () => {
  const [isUser, setIsUser] = useState(false); // Add a state to track user login status
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });
    return unsubscribe;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await loginUser({ email: data.email, password: data.password });
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="container p-4">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-11">
          <div className="card mt-5 mb-5">
            <div className="card-body bg-black text-white p-5">
              <h1 className="text-center mb-4">Login</h1>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback mt-2">
                      This field is required
                    </div>
                  )}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback mt-2">
                      This field is required
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Login
                </button>
                <p className="text-center mb-4">
                  Don't have an account?{" "}
                  <a href="#" onClick={() => navigate("/register")}>
                    Register
                  </a>
                </p>
              </form>
              {isUser && <Home />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
