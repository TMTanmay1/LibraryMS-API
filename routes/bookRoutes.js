const express = require("express");
const { addBook, borrowBook, returnBook, getBookHistory , getAllBooks } = require("../controllers/bookController");
const router = express.Router();

router.post("/add", addBook);
router.post("/borrow", borrowBook);
router.post("/return", returnBook);
router.get("/history/:bookId", getBookHistory);
router.get("/all-books", getAllBooks);

module.exports = router;
