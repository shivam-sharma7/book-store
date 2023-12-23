/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";

const UpdateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      }) 
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

  }, []);


  const handleUpdateBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data)
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
    <div className="p-4">
      <BackButton />
      <h1 className=" font-bold text-3xl my-4">Update Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-500 rounded-xl w-[600px]  p-4 max-auto ">
        <div className="my-4">
          <label className="text-xl mr-4 text-black-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
            className="border-2 my-1 px-4 py-2 w-full border-slate-500 rounded-xl"/>
        </div>
        <div className="my-2">
          <label className="text-xl mr-4 text-black-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required={true}
            className="border-2 my-1 px-4 py-2 w-full border-slate-500 rounded-xl"/>
        </div>
        <div className="my-2">
          <label className="text-xl mr-4 text-black-500">publishYear</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            required={true}
            className="border-2 my-1 px-4 py-2 w-full border-slate-500 rounded-xl"/>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleUpdateBook}>Save</button>
      </div>
    </div>
  );
};

export default UpdateBooks;
