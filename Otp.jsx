import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Otp.css"; // Linking the new CSS file

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  useEffect(() => {
    // Check local storage and update state
    const isReset = localStorage.getItem("isresetpassword") === "true";
    setIsResetPassword(isReset);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://shopping-website-project.onrender.com/shoppingwebsite/verify-otp",
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Email verified successfully");
        localStorage.setItem("canreset", "true");
        if (isResetPassword) {
          navigate("/resetpassword");
        } else {
          navigate("/login");
        }
      } else {
        console.error("Error verifying OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="wrapper">
      <h1>Enter the OTP</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            id="confirmOtp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
        </div>
        <button className="btnn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Otp;
