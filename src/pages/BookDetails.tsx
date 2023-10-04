import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { IBook, Review } from "../interfaces/book";
import { useEffect, useState } from "react";
import Reviews from "../components/Reviews";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";
import { toast } from "react-toastify";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialogue";
import ReviewForm from "../components/ReviewForm";
import auth from "../firebase.init";
import AddToWishListReadingFinished from "../components/AddToWishListReadingFinished";
import { useGetUserByEmailQuery } from "../redux/features/user/userApi";

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const currentUserEmail = auth.currentUser?.email;
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const [averageRating, setAverageRating] = useState(0);
  const [deleteBook] = useDeleteBookMutation();

  const navigate = useNavigate();

  const { data: userData } = useGetUserByEmailQuery(currentUserEmail as string);
  const user = userData?.data;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError, error } = useGetSingleBookQuery(
    id as string
  );

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
      const sumOfRatings = book?.reviews?.reduce((sum, review) => {
        if (review?.rating !== undefined) {
          return sum + review.rating;
        }
        return sum;
      }, 0);

      // Calculate the average rating
      setAverageRating(sumOfRatings / book?.reviews?.length);
    }
  }, [book]);

  const handleDeleteBook = async () => {
    try {
      if (book.addedBy === currentUserEmail) {
        await deleteBook(id as string);
        toast.error("Book deleted!");
        navigate("/books");
      } else {
        toast.error("Unauthorized! You can't delete this book.");
        setShowConfirmationDialog(false);
      }
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  const goToEditPage = () => {
    if (book.addedBy !== currentUserEmail) {
      toast.error("Unauthorized! You can't edit this book!!!");
    } else navigate(`/books/${id as string}/edit`);
  };

  // Ensure that reviews have valid Review objects
  const validReviews: Review[] = (book?.reviews || []).map((review) => ({
    rating: review.rating || 0, // Provide a default value if needed
    comment: review.comment || "", // Provide a default value if needed
  }));

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
            {user && (
              <AddToWishListReadingFinished
                userEmail={currentUserEmail as string}
                bookId={book?._id}
                user={user}
              />
            )}
            <div>
              {book && book?.reviews ? (
                <Reviews reviews={validReviews} />
              ) : (
                <></>
              )}
            </div>
            <ReviewForm book={book} />
          </div>
          <div className="flex flex-col gap-4 items-end">
            <button
              onClick={goToEditPage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit Book
            </button>
            <button
              onClick={() => setShowConfirmationDialog(true)}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
            >
              Delete Book
            </button>

            {showConfirmationDialog && (
              <DeleteConfirmationDialog
                onCancel={() => setShowConfirmationDialog(false)}
                onConfirm={handleDeleteBook}
              />
            )}
          </div>
        </div>
      )}
      {!isLoading && error && <ErrorComponent message="Error Occured!" />}
    </div>
  );
}

export default BookDetails;
