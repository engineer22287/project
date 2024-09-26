import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "./Logout.css";

const Logout = () => {
  return (
    <div className="maincontainer">
      <div className="subcontainer">
        <div className="textlineone">THANKS FOR SHOPPING</div>
        <div className="textlinetwo">Have a good day!</div>
        <Link to="/landingpage" className="btn-link">
          <button className="btnn">Go to Landing Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Logout;
