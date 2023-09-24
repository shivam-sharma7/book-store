import express from 'express'
import { config } from 'dotenv';
import mongoose from 'mongoose';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';
config();
const app = express();
const PORT = process.env.PORT;

// Middleware for parsing request body
app.use(express.json());

/*
 * Middleware handling CORS Policy
 * Options 1: Allow all origins with default of cors(*)
 */
app.use(cors())

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
 await mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
console.log('App has Connected with Database')
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch((error) => {
  console.log(error);
})
 
