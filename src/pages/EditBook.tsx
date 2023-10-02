import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { IBook } from "../interfaces/book";

function EditBook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [editedBook, setEditedBook] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
  });

  // Fetch the book data for editing
  const { data } = useGetSingleBookQuery<{ data: { data: IBook } }>(
    id as string
  );
  const { data: bookData } = data as { data: IBook };

  // Use useEffect to update editedBook when bookData is available
  useEffect(() => {
    if (bookData) {
      const formattedDate = new Date(bookData.publicationDate)
        .toISOString()
        .split("T")[0];

      setEditedBook({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        publicationDate: formattedDate,
      });
    }
  }, [bookData]);

  const [editBook] = useEditBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editBook({
        id: id as string,
        ...editedBook,
      }).unwrap();

      toast.success("Book edited successfully!");
      navigate(`/books/${id as string}`);
    } catch (error) {
      toast.error("Error occurred! Edit failed!!!");
    }
  };

  return (
    <div className="container mx-auto my-12">
      <h2 className="text-3xl font-semibold mb-4 text-center">Edit Book</h2>
      <form onSubmit={(e) => void handleSubmit(e)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter title"
            value={editedBook.title}
            onChange={(e) =>
              setEditedBook({ ...editedBook, title: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block font-medium mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter author"
            value={editedBook.author}
            onChange={(e) =>
              setEditedBook({ ...editedBook, author: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block font-medium mb-1">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter genre"
            value={editedBook.genre}
            onChange={(e) =>
              setEditedBook({ ...editedBook, genre: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publicationDate" className="block font-medium mb-1">
            Publication Date
          </label>
          <input
            type="date"
            id="publicationDate"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={editedBook.publicationDate}
            onChange={(e) =>
              setEditedBook({ ...editedBook, publicationDate: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditBook;
