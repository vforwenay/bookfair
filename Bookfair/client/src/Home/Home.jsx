import React from "react";
import { Link } from "react-router-dom";
import './Home.scss'


const Home = () => {
  return (
    <>
      <div className="bgTrance">
        <div className="mainBoxContainer">
          <div className="buttonbox">
            <Link to="/seller">
            <button className="button">Register as Seller</button>
            </Link>
            <Link to="/buyer">
            <button className="button">Register as Buyer</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
