import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { IBook } from "../interfaces/book";
import { useEffect, useState } from "react";
import Reviews from "../components/Reviews";

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [averageRating, setAverageRating] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetSingleBookQuery(id);

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

  return (
    <div className="w-full bg-white p-6 my-12">
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
        {book && averageRating ? <Reviews reviews={book?.reviews} /> : <></>}
      </div>
    </div>
  );
}

export default BookDetails;
