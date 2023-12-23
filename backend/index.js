import express from 'express'
import { config } from 'dotenv';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';
import database from './config/db.js';
config({silent: true})
const app = express()
const PORT = process.env.PORT || 5000

// Middleware for parsing request body
app.use(express.json());

/*
 * Middleware handling CORS Policy
 * Options 1: Allow all origins with default of cors(*)
 */
app.use(cors())
database()
/*
 * Middleware handling CORS Policy
 * Options 2: Allow custom origin
 */

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }))


app.get('/', (req, res) => {  
   return res.status(200).send('Welcome to the Bookstore APP.');
});

app.use('/books', booksRoutes);

// Database connection
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
 
 
