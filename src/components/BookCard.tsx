import { useEffect, useState } from "react";
import { IBook } from "../interfaces/book";
import { Link } from "react-router-dom";

const BookCard = ({ book }: { book: IBook }) => {
  const { _id, title, author, genre, publicationDate, reviews } = book;
  const [averageRating, setAverageRating] = useState(0);

  // form publication date
  const date = new Date(publicationDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // calculate average rating
  useEffect(() => {
    if (reviews?.length) {
      // Calculate the sum of ratings
      const sumOfRatings = reviews.reduce(
        (sum, review) => sum + review.rating!,
        0
      );

      // Calculate the average rating
      setAverageRating(sumOfRatings / reviews.length);
    }
  }, [reviews]);

  return (
    <Link to={`/books/${_id}`}>
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold mb-2">
          <span>{title}</span>
        </h2>
        <p className="mb-2">
          Author: <span className="text-gray-600">{author}</span>
        </p>
        <p className="mb-2">
          Genre: <span className="text-gray-600">{genre}</span>
        </p>
        <p className="mb-2">
          Publication Date:{" "}
          <span className="text-gray-600">{formattedDate}</span>
        </p>

        <div className="flex items-center">
          <p className="mr-2">Review Rating:</p>
          <div className="flex">
            <span className="text-gray-600">
              {averageRating ? averageRating : "No rating yet"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
