import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSellerOrders } from "../Api/SellerApi";

export const ViewOrder = () => {
  const params = useParams();
  const [order, setOrder] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    getSellerOrders(params, token).then((res) => setOrder(res.seller.orders));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="buyerOrder">
        <div className="row mx-0 position-relative">
          <div className="col-md-11 mx-auto">
            <h2 className="py-4 text-white text-center text-uppercase text-decoration-underline">
              Orders
            </h2>
            {order &&
              order.map((each, index) => (
                <ul className="order-list" key={index}>
                  <li className="text-white">
                      {each.books.name} <br />
                    {each.buyers.name}
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
