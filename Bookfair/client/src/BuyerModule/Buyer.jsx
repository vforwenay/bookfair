import React from "react";
import { Link } from "react-router-dom";
import "./Buyer.scss";

export const Buyer = () => {
  return (
    <>
      <div className="bgsignup">
        <div className="mainBoxContainer">
          <div className="buttonbox">
            <Link to="/buyer/new">
              <button className="button">Sign Up</button>
            </Link>
            <Link to="/buyer/login">
              <button className="button">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
