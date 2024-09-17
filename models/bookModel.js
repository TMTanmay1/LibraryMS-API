const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student", default: null },
  borrowHistory: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      borrowedAt: { type: Date, default: Date.now },
      returnedAt: { type: Date },
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
