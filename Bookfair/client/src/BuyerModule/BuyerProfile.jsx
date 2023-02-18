import React, { useEffect, useState } from "react";
import { NavbarBuyer } from "../utility/Navbar";
import avtr from "../asset/images/avatar-1.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedInBuyer } from "../Api/BuyerApi";
import "./Buyer.scss";

export const BuyerProfile = () => {
  const [buyer, setBuyer] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getLoggedInBuyer(params, token).then((response) => {
        setBuyer(response.buyer);
      });
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavbarBuyer />
      <div className=" bgProfile">
        <div className="mainBoxContainer">
          <div className="profileBox">
            <div className="profileMainBox">
              <div className="nameBox">
                <div className="profileImg">
                  <img src={avtr} alt="avtr" />
                </div>
                <div className="profile-text">
                  {buyer?.id && (
                    <ul>
                      <li>{buyer.name}</li>
                      <li>{buyer.email}</li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="buttonbox profileBtn">
                <button
                  className="button"
                  onClick={() => navigate(`/buyers/${buyer.id}/orders`)}
                >
                  View order
                </button>
                <button
                  className="button"
                  onClick={() =>
                    navigate("/sellers", { state: { buyerId: buyer.id } })
                  }
                >
                  {" "}
                  View sellers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
