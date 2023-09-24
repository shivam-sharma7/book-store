import  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();  

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
       <BackButton />
       <h1 className=' font-bold text-3xl my-5 rounded-sm'>Show Book</h1>
       {loading ? (
        <Spinner />
       ):(
       <div className='flex flex-col border-2 border-sky-500 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-slate-500'>id</span>
          <span>{book._id}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-slate-500'>Title</span>
          <span>{book.title}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-slate-500'>Author</span>
          <span>{book.author}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-slate-500'>Publish Year</span>
          <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-slate-500'>Create Time</span>
          <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
          <span className='text-xl mr-4 text-slate-500'>Last Time updated </span>
          <span>{new Date(book.createdAt).toString()}</span>
          </div>
        </div>
       )}
    </div>
  )
}

export default ShowBooks
