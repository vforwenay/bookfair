import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Seller.scss";
import { addBook, getLoggedInSeller } from "../Api/SellerApi";
import { NavbarBuyer } from "../utility/Navbar";
import { getSearchBook } from "../Api/BuyerApi";

export const ViewBook = () => {
  const [bookshow, setBookShow] = useState(false);
  const [bookName, setBookName] = useState();
  const [seller, setSeller] = useState();
  const [bookCount, setBookCount] = useState();
  const params = useParams();
  const [addCart, setAddCart] = useState([]);
  const [searchBook, setSearchBook] = useState();
  const navigate = useNavigate();

  const { state } = useLocation();
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

  const handleSubmitBook = () => {
    setBookShow(false);
    addBook(params, bookName, bookCount);
    getLoggedInSeller(params).then((response) => {
      setSeller(response.seller);
    });
  };

  const addToCart = (name, id, sellerId) => {
    addCart.push({
      bookName: name,
      bookId: [id],
      sellerId: sellerId,
      buyerId: state.buyerId,
    });
    setAddCart([...new Set(addCart)]);
  };
  localStorage.setItem("cart", JSON.stringify(addCart));

  const handleSearch = (name) => {
    if (name) {
      getSearchBook(name).then((res) => {
        setSearchBook(res.books);
      });
    } else {
      getLoggedInSeller(params).then((response) => {
        setSeller(response.seller);
      });
    }
  };
  return (
    <div>
      {seller && params.sellers ? (
        <NavbarBuyer
          sellerName={seller.name}
          handleSearch={handleSearch}
          search={"search"}
        />
      ) : (
        ""
      )}
      <Modal show={bookshow} onHide={() => setBookShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ADD BOOK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            placeholder="Enter Book Name"
            onChange={(e) => setBookName(e.target.value)}
          />
          <br />
          <input
            className="form-control"
            placeholder="Stock Count"
            onChange={(e) => setBookCount(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setBookShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitBook}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex flex-wrap">
        {!searchBook
          ? seller?.books.length > 0 &&
            seller.books.map((each) => (
              <div className="MainBox" key={each.id}>
                <div className="dataBox">
                  <div className="boxProduct">
                    <div className="productWhite">
                      <div className="product-img">
                        {/* <img src={bg}></img> */}
                      </div>
                      <div key={each} className="productTitle">
                        <h2>{each.name}</h2>
                        <h2>Count {each.count}</h2>
                        <div className="prizeBook">$200</div>
                        {params.sellers ? (
                          <button
                            className="btnProduct"
                            onClick={() =>
                              addToCart(each.name, each.id, each.sellerId)
                            }
                          >
                            Add to Cart
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : searchBook.map((each) => (
              <div className="MainBox" key={each.id}>
                <div className="dataBox">
                  <div className="boxProduct">
                    <div className="productWhite">
                      <div className="product-img">
                        {/* <img src={bg}></img> */}
                      </div>
                      <div key={each} className="productTitle">
                        <h2>{each.name}</h2>
                        <h2>Count {each.count}</h2>
                        <div className="prizeBook">$200</div>
                        {params.sellers ? (
                          <button
                            className="btnProduct"
                            onClick={() => addToCart(each.name, each.id)}
                          >
                            Add to Cart
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className="mainBoxContainer">
        <div className="buttonbox profileBtn">
          {!params.sellers ? (
            <button className="button" onClick={() => setBookShow(true)}>
              Add Book
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
