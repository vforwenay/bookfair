import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Seller } from "./SellerModule/Seller";
import { Buyer } from "./BuyerModule/Buyer";
import { SellerHome } from "./SellerModule/SellerProfile";
import Home from "./Home/Home";
import { BuyerProfile } from "./BuyerModule/BuyerProfile";
import { ViewBook } from "./SellerModule/ViewBook";
import { Authentication } from "./auth";
import "./App.css";
import { ViewSellers } from "./BuyerModule/ViewSellers";

import { BuyerOrder } from "./BuyerModule/BuyerOrder";
import { ViewOrder } from "./SellerModule/ViewOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/:user/new" element={<Authentication />} />
        <Route path="/:user/login" element={<Authentication />} />
        <Route path="/seller/:sellerId/books" element={<ViewBook />} />
        <Route path="/seller/:sellerId" element={<SellerHome />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/buyer/:buyerId" element={<BuyerProfile />} />
        <Route path="/:sellers/:sellerId/books" element={<ViewBook />} />
        <Route path="/sellers" element={<ViewSellers />} />
        <Route path="/:sellers/:sellerId" element={<SellerHome />} />
        <Route path="/buyers/:buyerId/orders" element={<BuyerOrder />} />
        <Route path="/seller/:sellerId/orders" element={<ViewOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
