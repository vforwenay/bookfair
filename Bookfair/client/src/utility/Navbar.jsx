import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./navbar.scss";
import LogoutButton from "./LogoutButton";
import { addOrder } from "../Api/BuyerApi";

export const NavbarBuyer = (props) => {
  const [openCart, setOpencart] = useState(false);
  const [search, setSearch] = useState();
  const [cart, setCart] = useState();

  useEffect(() => {
    const getCart = localStorage.getItem("cart");
    setCart(JSON.parse(getCart));
  }, [openCart]);

  const placeOrder = (bookId, sellerId, buyerId) => {
    const token = localStorage.getItem("token");
    addOrder(bookId, sellerId, buyerId, token);
  };

  return (
    <>
      <Navbar className="navbarHeader mb-0" variant="dark">
        <Container>
          <Nav className="navbar-nav">
            <Nav.Link>{props.sellerName}</Nav.Link>
            {props.search ? (
              <Form className="d-flex">
                <input
                  type="search"
                  placeholder="Search"
                  className="searchBar"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  className="Button"
                  onClick={() => props.handleSearch(search)}
                >
                  Search
                </Button>
              </Form>
            ) : (
              ""
            )}
            <Nav.Link className="nav-cart" onClick={() => setOpencart(true)}>
              Cart
            </Nav.Link>
            <Nav.Link>
              <LogoutButton />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {openCart && (
        <Modal show={openCart} onHide={() => setOpencart(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Our Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cart &&
              cart.map((each, index) => (
                <>
                  <ul>
                    <li key={index}>{each.bookName}</li>
                    <button
                      onClick={() =>
                        placeOrder(each.bookId, each.sellerId, each.buyerId)
                      }
                    >
                      place order
                    </button>
                  </ul>
                </>
              ))}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
