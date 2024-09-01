const express = require('express');
const app = express();
app.use(express.json());

let books = [];

// Create a new book
app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
    };
    books.push(book);
    res.status(201).send(book);
});

// Read all books
app.get('/books', (req, res) => {
    res.send(books);
});

// Read a single book
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.send(book);
});

// Update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    book.title = req.body.title;
    book.author = req.body.author;
    book.pages = req.body.pages;
    res.send(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
