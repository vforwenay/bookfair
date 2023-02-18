import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchSeller, getSellers } from "../Api/BuyerApi";
import { NavbarBuyer } from "../utility/Navbar";

export const ViewSellers = () => {
  const [sellers, setSellers] = useState();
  const [searchSeller, setSearchSeller] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getSellers(token).then((res) => {
        setSellers(res.data.seller);
      });
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleSearch = (name) => {
    if (name) {
      getSearchSeller(name).then((res) => {
        setSearchSeller(res.sellers);
      });
    } else {
      const token = localStorage.getItem("token");
      getSellers(token).then((res) => {
        setSellers(res.data.seller);
      });
    }
  };

  return (
    <>
      <NavbarBuyer handleSearch={handleSearch} search={"search"} />
      <div className="buyerOrder">
        <div className="row mx-0 position-relative">
          <div className="col-md-11 mx-auto">
            <h2 className="py-4 text-white text-center text-uppercase text-decoration-underline">
              Sellers
            </h2>
            {!searchSeller
              ? sellers &&
                sellers.map((each) => (
                  <div className="container" key={each.id}>
                    <div className="row row-cols-2">
                      <ul className="order-list">
                        {/* <Link to={`/sellers/${each.id}`}> */}
                        <li
                          className="text-white"
                          onClick={() =>
                            navigate(`/sellers/${each.id}`, {
                              state: { buyerId: state.buyerId },
                            })
                          }
                        >
                          {each.name}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              : searchSeller.map((each) => (
                  <div className="container" key={each.id}>
                    <div className="row row-cols-2">
                      <ul className="order-list">
                        {/* <Link to={`/sellers/${each.id}`}> */}
                        <li
                          className="text-white"
                          onClick={() =>
                            navigate(`/sellers/${each.id}`, {
                              state: { buyerId: state.buyerId },
                            })
                          }
                        >
                          {each.name}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
