const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  reviewText: {type: String,required: true},
  rating: {type: Number,required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

module.exports = mongoose.model("Book", bookSchema);
