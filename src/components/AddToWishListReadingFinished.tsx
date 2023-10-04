import { toast } from "react-toastify";
import {
  useAddBookToFinishedReadingMutation,
  useAddBookToReadingMutation,
  useAddBookToWishListMutation,
  useGetUserByEmailQuery,
} from "../redux/features/user/userApi";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function AddToWishListReadingFinished({
  userEmail,
  bookId,
  user,
}: {
  userEmail: string;
  bookId: string;
  user: any;
}) {
  const [addToWishList] = useAddBookToWishListMutation();
  const [addToReading] = useAddBookToReadingMutation();
  const [addToFinishedReading] = useAddBookToFinishedReadingMutation();

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const existInWishlist = user.wishList.find((book) => book._id === bookId);
      const existInReading = user.booksReading.find(
        (book) => book._id === bookId
      );
      const existInFinishedReading = user.finishedReading.find(
        (book) => book._id === bookId
      );

      if (existInWishlist) {
        setStatus("WishList");
      } else if (existInReading) {
        setStatus("Reading");
      } else if (existInFinishedReading) {
        setStatus("Finished Reading");
      }

      setLoading(false);
    }
  }, [user, bookId]);

  const handleAddToWishList = async () => {
    try {
      const response = await addToWishList({ userEmail, bookId });

      const errorMessage = response?.data?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage as string);
      } else {
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      toast.error("Error occurred!");
    }
  };

  const handleAddToReading = async () => {
    try {
      const response = await addToReading({ userEmail, bookId });

      const errorMessage = response?.data?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage as string);
      } else {
        toast.success("Added to reading list!");
      }
    } catch (error) {
      toast.error("Error occurred!");
    }
  };

  const handleAddToFinishedReading = async () => {
    try {
      const response = await addToFinishedReading({ userEmail, bookId });

      const errorMessage = response?.data?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage as string);
      } else {
        toast.success("Added to finished reading book!");
      }
    } catch (error) {
      toast.error("Error occurred!");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-x-4">
        <p className="text-lg font-medium text-gray-700">Add To:</p>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => void handleAddToWishList()}
            className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Wishlist
          </button>
          <button
            onClick={() => void handleAddToReading()}
            className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Reading
          </button>
          <button
            onClick={() => void handleAddToFinishedReading()}
            className="px-3 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none"
          >
            Finished
          </button>
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700">
        My Current Status:{" "}
        <span className="text-red-400">{status || "N/A"}</span>
      </p>
    </div>
  );
}

export default AddToWishListReadingFinished;
