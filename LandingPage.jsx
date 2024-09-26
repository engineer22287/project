import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="background-overlay"></div>
      <header className="landing-header">
        <h1 className="landing-title">Welcome to ShopSpot </h1>
        <p className="landing-subtitle">Amazing deals & offers await you!</p>
        <NavLink to="/login" className="landing-button">
          Login
        </NavLink>
      </header>
      <section className="features">
        <div className="feature">
          <h2>Deals</h2>
          <p>Incredible discounts on top products.</p>
        </div>
        <div className="feature">
          <h2>Shipping</h2>
          <p>Fast and reliable delivery.</p>
        </div>
        <div className="feature">
          <h2>Support</h2>
          <p>24/7 customer assistance.</p>
        </div>
      </section>
      <section className="cta">
        <h2>Explore Now</h2>
        <NavLink to="/signup" className="cta-button">
          Sign Up
        </NavLink>
      </section>
    </div>
  );
};

export default LandingPage;
