import React from "react";
import { Link } from "react-router-dom";
import "./Seller.scss";
export const Seller = () => {


  return (
    <>
      <div className="bgsignup">
        <div className="mainBoxContainer">
          <div className="buttonbox">
            <Link to="/seller/new">
              <button className="button">
                Sign Up
              </button>
            </Link>
            <Link to="/seller/login">
              <button className="button">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
