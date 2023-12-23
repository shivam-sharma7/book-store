import { Book } from '../models/bookModel.js';

export const createBook =  async (req, res) => {
    try {
      if (
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
      ) {
        return res.status(400)
        .send({message: 'Send all required fields: title, author, publishYear'});
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      const book = await Book.create(newBook);

      return res.status(201).send({book, message: 'Book created successfully'});
    
    } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
    }
};

export const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json({
        message: 'Books retrieved successfully',
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
    }
  };

export const getBookById = async (req, res) => { 
    try {
        const books = await Book.findById(req.params.id);
      if (!books) {
        return res.status(404).send({message: 'Book not found'});
      }
      return res.status(200).json({
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
    }
  }

  export const updateBook =  async (req, res) => {
    try {
        
     if (
       !req.body.title ||
       !req.body.author ||
       !req.body.publishYear
     ) {
       return res.status(400)
       .send({message: 'Send all required fields: title, author, publishYear'});
     }
 
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!book) {
      return res.status(404).send({message: 'Book not found'});  
    }
    
    return res.status(200).send({message: 'Book updated successfully'});  
    } catch (error) {
     console.log(error.message);
     res.status(500).send({message: error.message});
    }
 };

    export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({message: 'Book not found'});  
    }
    return res.status(200).send({message: 'Book deleted successfully'});  
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
};