import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import avtr from "../asset/images/avatar-1.jpeg";
import { getLoggedInSeller } from "../Api/SellerApi";
import LogoutButton from "../utility/LogoutButton";
import Col from "react-bootstrap/esm/Col";

export const SellerHome = () => {
  const [seller, setSeller] = useState();
  const [shopshow, setShopShow] = useState(false);
  const [shopName, setShopName] = useState();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getLoggedInSeller(params, token).then((response) => {
        setSeller(response.seller);
      });
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const { state } = useLocation();

  const handleSubmitShop = () => {
    setShopShow(false);
    axios
      .post(`${process.env.REACT_APP_API}/seller/${params.sellerId}/shop/new`, {
        name: shopName,
      })
      .then(function (response) {
        // console.log('response',response)
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };
  const handleViewBook = () => {
    params.sellers
      ? navigate(`/sellers/${params.sellerId}/books`, {
          state: { buyerId: state.buyerId },
        })
      : navigate(`/seller/${params.sellerId}/books`);
  };
  return (
    <>
      <Modal show={shopshow} onHide={() => setShopShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ShopName</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder="Enter Shop Name"
            className="form-control"
            onChange={(e) => setShopName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShopShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitShop}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="bgTrance bgProfile">
        <div className="mainBoxContainer">
          <div className="profileBox">
            <div className="profileMainBox">
              <div className="nameBox">
                <div className="profileImg">
                  <img src={avtr} alt="avtr" />
                </div>
                <div className="profile-text">
                  {seller?.id && (
                    <ul>
                      <li>{seller.name}</li>
                      <li>{seller.email}</li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="buttonbox profileBtn">
                {!params.sellers ? (
                  <button className="button" onClick={() => setShopShow(true)}>
                    Create Shop
                  </button>
                ) : (
                  ""
                )}
                <button className="button" onClick={handleViewBook}>
                  {" "}
                  View Book
                </button>
                {!params.sellers ? (
                  <button className="button" onClick={()=>navigate(`/seller/${params.sellerId}/orders`)}>Order</button>
                ) : (
                  ""
                )}
              </div>
              <Col md={6} sm={8}>
                <LogoutButton />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
