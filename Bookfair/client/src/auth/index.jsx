import React, { useState, useEffect } from "react";
import { LogIn, SignUp } from "../Api/AuthApi";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import Alert from "react-bootstrap/Alert";
import "../BuyerModule/Buyer.scss";

export const Authentication = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isError, setIsError] = useState(false);
  const [isSignupRequest, setIsSignupRequest] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const userType = params.user;
  useEffect(() => {
    if (localStorage.key("token")) {
      localStorage.clear();
    }
    setIsSignupRequest(window.location.href.includes("new"));
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    if (!email) return;
    if (validator.isEmail(email) && name) {
      let response;

      if (isSignupRequest) response = await SignUp(name, email, userType);
      else response = await LogIn(name, email, userType);

      if (response?.data?.buyer) {
        localStorage.setItem("token", response.data.buyer.token);
        navigate(`/buyer/${response.data.buyer.id}`);
      } else if (response?.data?.seller) {
        localStorage.setItem("token", response.data.seller.token);
        navigate(`/seller/${response.data.seller.id}`);
      }
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="bgsignup">
      <div className="mainBoxContainer">
        <div className="loginBox">
          {isError ? (
            <Alert variant="info" onClose={() => setIsError(false)}>
              Enter Valid Inputs
            </Alert>
          ) : (
            <span>
              {isSignupRequest ? "Signup" : "Login"} as {userType}
            </span>
          )}
          <input
            name="name"
            placeholder="Name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            name="email"
            value={email || ""}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btnSignup" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
