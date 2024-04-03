import express from 'express'
import { config } from 'dotenv';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import database from './config/db.js';
import { notFound, errorHandler } from './middleware/middlewareError.js';
config({silent: true})
const app = express()
const PORT = process.env.PORT || 5000
database()

// Middleware  
app.use(express.json());
app.use(express.urlencoded({extended: true}))
 
app.use(cors({
   origin: process.env.ORIGIN,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
 
 }))

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "./../frontend/dist")))

app.use('/books', booksRoutes);

app.use(notFound)
app.use(errorHandler);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
 
 
