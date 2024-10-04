const Book = require("../models/book");

//get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create New book
exports.createBook = async (req, res) => {
  try {
    const { title, author, reviewText, rating } = req.body;
    const userId = req.user.userId;


    const book = new Book({
      title,
      author,
      reviewText,
      rating,
      user: userId,
    });

    await book.save();
    res.json({ message: "Book review added successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get User Reviews
exports.UserReviews = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId)
    const userReviews = await Book.find({ user: userId });

    if (!userReviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this user." });
    }

    res.json(userReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Review
exports.editReview = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const { title, author, reviewText, rating } = req.body;
    const book = await Book.findByIdAndUpdate(
      bookId,
      { title, author, reviewText, rating },
      { new: true }
    );
    if (!book)
      return res
        .status(404)
        .json({ message: "No review found for this book." });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Book Review
exports.deleteReview = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);
    if (!book)
      return res
        .status(404)
        .json({ message: "No review found for this book." });
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search with title
exports.searchBook = async (req, res) => {
    try {
      const title = req.params.title;
      const book = await Book.findOne({ title: new RegExp(title, 'i') }); // Use regex for case-insensitive search
      if (!book)
        return res.status(404).json({ message: "No book found with this title." });
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
