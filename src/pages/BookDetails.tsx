import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { IBook } from "../interfaces/book";
import { useEffect, useState } from "react";
import Reviews from "../components/Reviews";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";
import { toast } from "react-toastify";

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [averageRating, setAverageRating] = useState(0);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError, error } = useGetSingleBookQuery(id);

  const book: IBook | undefined = (data as { data: IBook })?.data;

  // form publication date
  const date = new Date(book?.publicationDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // calculate average rating
  useEffect(() => {
    if (book?.reviews?.length) {
      // Calculate the sum of ratings
      const sumOfRatings = book?.reviews?.reduce(
        (sum, review) => sum + review?.rating,
        0
      );

      // Calculate the average rating
      setAverageRating(sumOfRatings / book?.reviews?.length);
    }
  }, [book]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id || "");
      toast.success("Book deleted!");
      navigate("/books");
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  return (
    <div>
      {isLoading && !isError && <LoadingSpinner />}

      {!isLoading && !isError && (
        <div className="w-full bg-white px-20 my-12 flex justify-between">
          <div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Book Name:
                <span className="text-gray-500"> {book?.title}</span>
              </h2>
              <p className="mb-2 text-lg">
                Author: <span className="text-gray-500">{book?.author}</span>
              </p>
              <p className="mb-2 text-lg">
                Genre: <span className="text-gray-500">{book?.genre}</span>
              </p>
              <p className="mb-2 text-lg">
                Publication Date:{" "}
                <span className="text-gray-500">{book && formattedDate}</span>
              </p>

              <div className="flex items-center">
                <p className="mr-2 text-lg">Review Rating:</p>
                <div className="flex">
                  <span className="text-gray-600 text-lg">
                    {book && averageRating ? averageRating : "No rating yet"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              {book && averageRating ? (
                <Reviews reviews={book?.reviews} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Edit Book
            </button>
            <button
              onClick={() => void handleDeleteBook()}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete Book
            </button>
          </div>
        </div>
      )}
      {!isLoading && isError && <ErrorComponent message={error?.message} />}
    </div>
  );
}

export default BookDetails;
