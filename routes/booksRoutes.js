import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookConroller.js';

const router = express.Router();


// Route for Create a new booK
router.post('/', createBook);

// Route for Get all books
router.get('/', getAllBooks );

// Route for Get a book by id
router.get('/:id', getBookById);

// Route for Update a book by id
router.put('/:id', updateBook);

// Route for Delete a book by id
router.delete('/:id', deleteBook)

export default router;