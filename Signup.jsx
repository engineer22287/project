import React, { useState } from "react";
import axios from "axios";
import pic from "../assets/login.jpg";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const canclehandler = () => {
    navigate("/login");
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://shopping-website-project.onrender.com/shoppingwebsite/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("OTP sent to email");
        navigate("/otp", { state: { email: formData.email } });
      } else {
        toast.error(`Error creating user: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(
        `Error creating user: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="input-box">
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-envelope"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" className="btnn">
          SIGN UP
        </button>
        <button type="button" className="canclebutton" onClick={canclehandler}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Signup;
