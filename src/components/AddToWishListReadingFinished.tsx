/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { toast } from "react-toastify";
import {
  useAddBookToFinishedReadingMutation,
  useAddBookToReadingMutation,
  useAddBookToWishListMutation,
} from "../redux/features/user/userApi";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { BookListResponse } from "../interfaces/book";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

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
      const existInWishlist = user.wishList.find(
        (book: any) => book._id === bookId
      );

      const existInReading = user.booksReading.find(
        (book: any) => book._id === bookId
      );

      const existInFinishedReading = user.finishedReading.find(
        (book: any) => book._id === bookId
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

  const showToastBasedOnResponse = (
    response:
      | { data: { data: BookListResponse } }
      | { error: FetchBaseQueryError | SerializedError }
  ) => {
    if ("data" in response) {
      const message = response?.data?.data?.message;

      if (response?.data?.data?.success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  const handleAddToWishList = async () => {
    try {
      const response:
        | { data: { data: BookListResponse } }
        | { error: FetchBaseQueryError | SerializedError } =
        await addToWishList({ userEmail, bookId });

      showToastBasedOnResponse(response);
    } catch (error) {
      toast.error("Error occurred!");
    }
  };

  const handleAddToReading = async () => {
    try {
      const response:
        | { data: { data: BookListResponse } }
        | { error: FetchBaseQueryError | SerializedError } = await addToReading(
        { userEmail, bookId }
      );

      showToastBasedOnResponse(response);
    } catch (error) {
      toast.error("Error occurred!");
    }
  };

  const handleAddToFinishedReading = async () => {
    try {
      const response:
        | { data: { data: BookListResponse } }
        | { error: FetchBaseQueryError | SerializedError } =
        await addToFinishedReading({ userEmail, bookId });

      showToastBasedOnResponse(response);
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
