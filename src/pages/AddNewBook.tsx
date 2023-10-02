import React, { useState } from "react";
import { usePostBookMutation } from "../redux/features/book/bookApi";
import auth from "../firebase.init";
import { toast } from "react-toastify";

const AddNewBook: React.FC = () => {
  const currentUserEmail = auth.currentUser?.email;
  const [AddNewBook] = usePostBookMutation();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    addedBy: currentUserEmail || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setBook({
        ...book,
        addedBy: currentUserEmail || "",
      });
      await AddNewBook(book);

      toast.success("Book added!");
    } catch (error) {
      toast.error("Error occured!");
    }

    // Reset the form after submission
    setBook({
      title: "",
      author: "",
      genre: "",
      publicationDate: "",
      addedBy: "",
    });
  };

  return (
    <div className="container mx-auto my-12">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add a New Book
      </h2>
      <form onSubmit={(e) => void handleSubmit(e)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-600">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-600">
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publicationDate" className="block text-gray-600">
            Publication Date:
          </label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            value={book.publicationDate}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddNewBook;
