import React, { useState } from "react";

import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Clear isresetpassword in local storage
    localStorage.removeItem("isresetpassword");
    localStorage.removeItem("canreset");
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("Two passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "https://shopping-website-project.onrender.com/shoppingwebsite/resetpassword",
        { password, email }
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");
        // Navigate to the Home page
        navigate("/");
      } else {
        // Handle failure
        toast.error("Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Reset Password</h1>
        <div className="input-box">
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx bxs-envelope"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" className="btnn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
