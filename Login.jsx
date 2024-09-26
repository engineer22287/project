import React, { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Slices/AuthSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://shopping-website-project.onrender.com/shoppingwebsite/login",
        { email, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);

      if (response.data.success) {
        dispatch(loginSuccess(response.data.user));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Incorrect email or password");
    }
  };

  const forgetpasswordhandler = () => {
    navigate("/resetpasswordbyemail");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            className={emailError ? "input-error" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bxs-user"></i>
          {emailError && <span className="error-text">Email is required</span>}
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            className={passwordError ? "input-error" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="bx bxs-lock-alt"></i>
          {passwordError && (
            <span className="error-text">Password is required</span>
          )}
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#" onClick={forgetpasswordhandler}>
            Forgot Password
          </a>
        </div>
        <button type="submit" className="btnn">
          Login
        </button>
        <div className="register-link">
          <p>
            Don't have an account? <NavLink to="/signup">Register</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
