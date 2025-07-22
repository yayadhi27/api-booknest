const express = require('express');
const router = express.Router();
const { listBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

/**
* @swagger
* /api/books:
*   get:
*     summary: Get all books
*     responses:
*       200:
*         description: A list of books.
*/
router.get('/', auth, listBooks);

/**
* @swagger
* /api/book:
*   post:
*     summary: Add a new book
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               author:
*                 type: string
*               description:
*                 type: string
*     responses:
*       201:
*         description: Book created successfully.
*/
router.post('/', auth, addBook);

/**
* @swagger
* /api/book/{id}:
*   put:
*     summary: Update a book
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: The ID of the book to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               author:
*                 type: string
*               description:
*                 type: string
*     responses:
*       200:
*         description: Book updated successfully.
*/
router.put('/:id', auth, updateBook);

/**
* @swagger
* /api/book/{id}:
*   delete:
*     summary: Delete a book (admin only)
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: The ID of the book to delete
*     responses:
*       200:
*         description: Book deleted successfully.
*       403:
*         description: Forbidden - Admins only
*/
router.delete('/:id', auth, isAdmin, deleteBook);

module.exports = router;
