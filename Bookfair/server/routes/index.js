const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = "abcdefghijklmnopqrstuvwxyz";

router.get("/", async (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.post("/seller/new", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  if (!email || !name) {
    return res.status(400).json({ message: "Empty Input" });
  }
  try {
    const message = "Seller registered successfully";
    const sellerExist = await prisma.seller.findFirst({
      where: { email: email },
    });
    if (sellerExist) return res.status(400).json("Seller already exist");
    else if (!sellerExist) {
      const newSeller = await prisma.seller.create({
        data: {
          name: name,
          email: email,
        },
      });
      const token = jwt.sign(
        { id: newSeller.id, email: newSeller.email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      newSeller["token"] = token;

      return res.status(200).json({ message, seller: newSeller });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/buyer/new", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  if (!email || !name) {
    return res.status(400).json({ message: "Empty Input" });
  }
  try {
    const message = "Buyer registered successfully";
    const buyerExist = await prisma.buyer.findFirst({
      where: { email: email },
    });
    if (buyerExist) return res.status(400).json("Buyer already exist");
    else if (!buyerExist) {
      const newBuyer = await prisma.buyer.create({
        data: {
          name: name,
          email: email,
        },
      });
      const token = jwt.sign(
        { id: newBuyer.id, email: newBuyer.email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      newBuyer["token"] = token;
      return res.status(200).json({ message, buyer: newBuyer });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/seller/login", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Empty Input" });
  }
  try {
    const message = "Seller logged-in successfully";
    const sellerExist = await prisma.seller.findFirst({
      where: { email: email },
    });
    if (sellerExist) {
      const token = jwt.sign(
        { id: sellerExist.id, email: sellerExist.email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      sellerExist["token"] = token;
      return res.status(200).json({ message, seller: sellerExist });
    } else if (!sellerExist)
      return res.status(400).json("Seller doesn't exist with this email");
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/buyer/login", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Empty Input" });
  }
  try {
    const message = "Buyer logged-in successfully";
    const buyerExist = await prisma.buyer.findFirst({
      where: { email: email },
    });
    if (buyerExist) {
      const token = jwt.sign(
        { id: buyerExist.id, email: buyerExist.email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      buyerExist["token"] = token;
      return res.status(200).json({ message, buyer: buyerExist });
    } else if (!buyerExist)
      return res.status(400).json("Buyer doesn't exist with this email");
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/seller/:id/books", auth, async (req, res) => {
  const sellerId = req.params.id;
  if (!sellerId) {
    return res.status(400).json({ message: "Inavlid Seller Id" });
  }
  try {
    const message = "Seller identified successfully";
    const sellerExist = await prisma.seller.findFirst({
      where: { id: Number(sellerId) },
      include: {
        books: true,
      },
    });
    if (sellerExist)
      return res.status(200).json({ message, seller: sellerExist });
    else if (!sellerExist)
      return res.status(400).json({ message: "Inavlid Seller Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/seller/:id/books/new", auth, async (req, res) => {
  const sellerId = req.params.id;
  const bookName = req.body.name;
  const bookCount = req.body.count;

  if (!sellerId || !bookName) {
    return res
      .status(400)
      .json({ message: "Inavlid Seller Id or Fields are empty" });
  }
  try {
    const message = "Book created successfully";
    const sellerExist = await prisma.seller.findFirst({
      where: { id: Number(sellerId) },
      include: {
        books: true,
      },
    });
    if (sellerExist) {
      const newBook = await prisma.Book.create({
        data: {
          name: bookName,
          count: bookCount ? Number(bookCount) : 1,
          seller:{
            connect:{
                id: Number(sellerId)
            }
          }
        },
      });
      if (newBook.id) sellerExist.books.push(newBook);
      return res.status(200).json({ message, seller: sellerExist });
    } else if (!sellerExist)
      return res.status(400).json({ message: "Inavlid Seller Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/seller/:id/orders", auth, async (req, res) => {
  const sellerId = req.params.id;
  if (!sellerId) {
    return res.status(400).json({ message: "Inavlid Seller Id" });
  }
  try {
    const message = "Seller identified successfully";
    const sellerExist = await prisma.seller.findFirst({
      where: { id: Number(sellerId) },
      include: {
        orders: {
          include:{
            buyers: true,
            sellers: true,
            books: true  
          }
        },
      },
    });
    if (sellerExist)
      return res.status(200).json({ message, seller: sellerExist });
    else if (!sellerExist)
      return res.status(400).json({ message: "Inavlid Seller Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/buyer/:id/orders/new", auth, async (req, res) => {
  const buyerId = req.params.id;
  const bookId = req.body.bookId;
  const sellerId = req.body.sellerId;
  let allOrders = []
  if (!buyerId) {
    return res.status(400).json({ message: "Inavlid Buyer Id" });
  }
  try {
    const message = "Buyer identified successfully";
    const buyerExist = await prisma.buyer.findFirst({
      where: { id: Number(buyerId) },
    });
    if (buyerExist) {
      for(let i=0; i<bookId.length;i++){
      const newOrder = await prisma.order.create({
        data: {
          books: {
            connect: {
              id: Number(bookId[i]),
            },
          },
          buyers: {
            connect: {
              id: Number(buyerId),
            },
          },
          sellers: {
            connect: {
              id: Number(sellerId),
            },
          },
        },
      });
      allOrders.push(newOrder)
    }
    return res.status(200).json({ message, order: allOrders });

  } else if (!buyerExist)
      return res.status(400).json({ message: "Inavlid Seller Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/seller/:id/shop/new", auth, async (req, res) => {
  const sellerId = req.params.id;
  const shopName = req.body.name;

  if (!sellerId) {
    return res.status(400).json({ message: "Inavlid Seller Id" });
  }
  try {
    const message = "Seller identified successfully";
    const sellerExist = await prisma.seller.findFirst({
      where: { id: Number(sellerId) },
    });
    if (sellerExist) {
      const newShop = await prisma.shop.create({
        data: {
          name: shopName,
          seller: {
            connect: {
              id: Number(sellerId),
            },
          },
        },
      });
      return res.status(200).json({ message, shop: newShop });
    } else if (!sellerExist)
      return res.status(400).json({ message: "Inavlid Seller Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/seller/:id", auth, async (req, res) => {
  const sellerId = req.params.id;
  if (!sellerId) {
    return res.status(400).json({ message: "Inavlid Seller Id" });
  }
  try {
    const message = "Seller identified successfully";
    const sellerExist = await prisma.seller.findFirst({
      where: { id: Number(sellerId) },
      include: {
        books: true,
        shops: true,
        orders: true,
      },
    });
    if (sellerExist)
      return res.status(200).json({ message, seller: sellerExist });
    else if (!sellerExist)
      return res.status(400).json({ message: "Inavlid Seller Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/buyer/:id", auth, async (req, res) => {
  const buyerId = req.params.id;
  if (!buyerId) {
    return res.status(400).json({ message: "Inavlid Buyer Id" });
  }
  try {
    const message = "Buyer identified successfully";
    const buyerExist = await prisma.buyer.findFirst({
      where: { id: Number(buyerId) },
      include: {
        orders: true,
      },
    });
    if (buyerExist) return res.status(200).json({ message, buyer: buyerExist });
    else if (!buyerExist)
      return res.status(400).json({ message: "Inavlid Buyer Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/sellers", auth, async (req, res) => {
  try {
    const message = "Seller identified successfully";
    const sellerExist = await prisma.seller.findMany({
      include: {
        books: true,
      },
    });
    if (sellerExist)
      return res.status(200).json({ message, seller: sellerExist });
    else if (!sellerExist)
      return res.status(400).json({ message: "Inavlid Seller Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/buyers/:id/orders", auth, async (req, res) => {
  const buyerId = req.params.id
  try {
    const message = "Buyer identified successfully";
    const buyerExist = await prisma.buyer.findMany({
      where: { id: Number(buyerId) },
      include: {
        orders:  {
            include:{
              buyers: true,
              sellers: true,
              books: true
            }
        }
      },
    });
    if (buyerExist)
      return res.status(200).json({ message, buyer: buyerExist });
    else if (!buyerExist)
      return res.status(400).json({ message: "Inavlid Buyer Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/buyers/:id/order", auth, async (req, res) => {
  const buyerId = req.params.id
  const orderId = req.body.orderId
  try {
    const message = "Buyer identified successfully";
    const buyerExist = await prisma.buyer.findFirst({
      where: { id: Number(buyerId) },
      include: {
        orders:  {where: { id: Number(orderId) },include:{
          buyers: true,
          sellers: true,
          books: true
        }},
      },
    });
    if (buyerExist)
      return res.status(200).json({ message, buyer: buyerExist });
    else if (!buyerExist)
      return res.status(400).json({ message: "Inavlid Buyer Id" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/search/sellers", auth, async (req, res) => {
  const name = req.query.name
  try {
    const message = "sellers found successfully";
    const sellerExist = await prisma.seller.findMany({
      where:{
        name: {
        contains: name
      }},
    });
    if (sellerExist)
      return res.status(200).json({ message, sellers: sellerExist });
    else if (!sellerExist)
      return res.status(400).json({ message: "No search results found", sellers:[] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/search/books", auth, async (req, res) => {
  const name = req.query.name
  try {
    const message = "Books found successfully";
    const bookExist = await prisma.book.findMany({
      where:{
        name: {
        contains: name
      }},
    });
    if (bookExist)
      return res.status(200).json({ message, books: bookExist });
    else if (!bookExist)
      return res.status(400).json({ message: "No search results found", books:[] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
