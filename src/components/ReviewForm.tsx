import { useState } from "react";
import { toast } from "react-toastify";
import { IBook } from "../interfaces/book";
import auth from "../firebase.init";
import { useEditBookMutation } from "../redux/features/book/bookApi";

const ReviewForm = ({ book }: { book: IBook }) => {
  const currentUserEmail = auth.currentUser?.email;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [editBook] = useEditBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBook = {
      ...book,
      reviews: [
        ...(book.reviews || []),
        { reviewerEmail: currentUserEmail, rating, comment },
      ],
    };

    try {
      if (currentUserEmail) {
        await editBook({
          id: book._id,
          ...updatedBook,
        }).unwrap();

        toast.success("Review added!");
        setRating(5);
        setComment("");
      } else {
        toast.info("Login first!");
      }
    } catch (error) {
      toast.error("Error occurred!");
    }
  };

  return (
    <form className="bg-white my-8" onSubmit={(e) => void handleSubmit(e)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="comment"
        >
          Comment
        </label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          id="comment"
          name="comment"
          rows={4}
          placeholder="Write your comment here..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="rating"
        >
          Rating
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          placeholder="Enter a rating from 1 to 5"
          onChange={(e) => setRating(parseInt(e.target.value))}
          value={rating}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          type="submit"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
