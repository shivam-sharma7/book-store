import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBook] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/books')
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-green-500 text-3xl my-7">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-3xl text-sky-800 hover:bg-green-500 " />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-500 rounded-md">No.</th>
              <th className="border border-slate-500 rounded-md">Title</th>
              <th className="border border-slate-500 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-500 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-500 rounded-md">Operation</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-600 rounded-md text-center">
                  {i + 1}
                </td>
                <td className="border border-slate-600 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-600 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-sky-800" />
                    </Link>
                    <Link to={`/books/update/${book._id}`}>
                      <AiOutlineEdit  className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
