const Book = require("../models/bookModel");

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;
    const book = await Book.findById(bookId);
    if (book.borrowedBy) {
      return res.status(400).json({ success: false, message: "Book already borrowed" });
    }

    book.borrowedBy = studentId;
    book.borrowHistory.push({ student: studentId });
    await book.save();

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book.borrowedBy) {
      return res.status(400).json({ success: false, message: "Book was not borrowed" });
    }

    const lastEntry = book.borrowHistory[book.borrowHistory.length - 1];
    lastEntry.returnedAt = Date.now();
    book.borrowedBy = null;
    await book.save();

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getBookHistory = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("borrowHistory.student", "name");
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
