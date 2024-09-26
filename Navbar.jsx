import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/Slices/AuthSlice"; // Adjust the import path as necessary

const Navbar = () => {
  const cart = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  console.log("i am at navbar and i got token as --> ");
  console.log(token);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <div className="bg-[#0A1A31]">
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto ">
        <NavLink to="/">
          <div className="ml-5">
            <div className="  text-4xl sm:mx-[5px] md:mx-[50px] hidden md:block text-white font-mono font-semibold italic tracking-wide">
              SHOPSPOT
            </div>
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/home">
            <p>Home</p>
          </NavLink>

          {!isLoggedIn && (
            <NavLink to="/login">
              <p>Login</p>
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/myitems">
              <p>My Purchases</p>
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink to="/logout" onClick={handleLogout}>
              <p>Sign out</p>
            </NavLink>
          )}

          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
