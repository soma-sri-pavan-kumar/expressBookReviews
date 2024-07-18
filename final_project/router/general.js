const express = require('express');
let books = require("./booksdb.js"); // Use your local books data
const router = express.Router();

// Task 1: Get list of books
router.get('/books', (req, res) => {
    try {
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
});

// Task 2: Get book details based on ISBN
router.get('/books/isbn/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books[isbn];
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 3: Get book details based on author
router.get('/books/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase(); // Apply toLowerCase to the parameter
    const filteredBooks = Object.values(books).filter(book => book.author.toLowerCase() === author);
    if (filteredBooks.length > 0) {
        res.json(filteredBooks);
    } else {
        res.status(404).json({ message: "No books found by this author" });
    }
});

// Task 4: Get book details based on title
router.get('/books/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase(); // Convert the title to lowercase
    const filteredBooks = Object.values(books).filter(book => book.title.toLowerCase() === title);
    if (filteredBooks.length > 0) {
        res.json(filteredBooks);
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});

// Task 5: Get book reviews
router.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        res.send(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports = { general: router };
