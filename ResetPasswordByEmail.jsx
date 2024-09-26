import React, { useState } from "react";
import pic from "../assets/login.jpg";
import "./ResetPasswordByEmail.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Slices/AuthSlice";

const ResetPasswordByEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const canclehandler = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      localStorage.setItem("isresetpassword", "true"); // or "false" depending on the value you want to store
      // Update Redux state
      const response = await axios.post(
        "https://shopping-website-project.onrender.com/shoppingwebsite/resetpasswordgenerateotp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("OTP sent to email");
        navigate("/otp", { state: { email } });
      } else {
        toast.error(`Error sending OTP: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(
        `Error sending OTP: ${error.response?.data?.message || error.message}`
      );
    }
  };
  console.log("Mai reset password mai hooo");
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password by Email</h1>
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
        <button type="submit" className="btnn">
          Submit
        </button>
        <button type="button" className="canclebutton" onClick={canclehandler}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordByEmail;
