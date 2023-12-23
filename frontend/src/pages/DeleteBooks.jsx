import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <> 
      <BackButton />
    <div className="flex flex-col items-center p-4">
      <h1 className="flex justify-center font-bold text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-500 rounded-xl w-[600px]  p-4 max-auto ">
        <div className="flex justify-center my-4">
          <h3 className="text-xl mr-4 text-black-500">
            Are you sure you want to delete this book?
          </h3>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleDeleteBook}
            className="bg-red-500 px-4 py-2 rounded-md text-white text-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DeleteBooks;
