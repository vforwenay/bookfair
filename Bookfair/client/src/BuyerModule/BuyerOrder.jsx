import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrders } from "../Api/BuyerApi";
import { NavbarBuyer } from "../utility/Navbar";

export const BuyerOrder = () => {
  const params = useParams();
  const [books, setBooks] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getOrders(params, token).then((res) =>
        setBooks(res.buyer.map((each) => each.orders))
      );
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavbarBuyer />
      <div className="buyerOrder">
        <div className="row mx-0 position-relative">
          <div className="col-md-11 mx-auto">
            <h2 className="py-4 text-white text-center text-uppercase text-decoration-underline">
              Orders
            </h2>
            {books &&
              books.map((each) =>
                each.map((item, index) => (
                  <ul className="order-list" key={index}>
                    <li className="text-white">{item.books.name}</li>
                  </ul>
                ))
              )}
          </div>
        </div>
      </div>
    </>
  );
};
