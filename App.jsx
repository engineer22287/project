import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import Logout from "./pages/Logout";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/security/PrivateRoute";
import MyItems from "./pages/MyItems";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordByEmail from "./pages/ResetPasswordByEmail";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "./redux/Slices/AuthSlice";

const App = () => {
  const [data, setData] = useState([]);
  const isResetPassword = localStorage.getItem("isresetpassword") === "true";
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess({ token }));
    } else {
      dispatch(logout());
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shopping-website-project.onrender.com/shoppingwebsite/allitems"
        );
        setData(response.data.items);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      {isLoggedIn && (
        <div className="bg-slate-900">
          <Navbar />
        </div>
      )}
      <Routes>
        <Route
          path="/home"
          element={
            isLoggedIn ? <Home data={data} /> : <Navigate to="/landingpage" />
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? <Home data={data} /> : <Navigate to="/landingpage" />
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/home" />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/home" />}
        />
        <Route
          path="/landingpage"
          element={!isLoggedIn ? <LandingPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/otp"
          element={!isLoggedIn ? <Otp /> : <Navigate to="/home" />}
        />
        <Route path="/myitems" element={<MyItems />} />
        <Route
          path="/resetpasswordbyemail"
          element={<ResetPasswordByEmail />}
        />
        <Route
          path="/resetpassword"
          element={<ProtectedRoute element={ResetPassword} />}
        />
      </Routes>
    </div>
  );
};

export default App;
