const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
let users = []; // Array to store registered users
const router = express.Router();

// Task 6: Register a new user
router.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }
    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully" });
});

// Task 7: Login as a registered user
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const accessToken = jwt.sign({ username: user.username }, 'access', { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Task 8: Add or modify a book review
router.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.user.username;
    const book = books[isbn];
    if (book) {
        book.reviews[username] = review;
        res.send(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Task 9: Delete a book review
router.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.username;
    const book = books[isbn];
    if (book && book.reviews[username]) {
        delete book.reviews[username];
        res.send(book);
    } else {
        res.status(404).json({ message: "Book or review not found" });
    }
});

module.exports = { authenticated: router, users };
