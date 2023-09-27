/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "../components/BookCard";
import { IBook } from "../interfaces/book";
import ErrorComponent from "./ErrorComponent";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  books: IBook[];
  isLoading: boolean;
  isError: boolean;
}

const BooksComponent = ({ books, isLoading, isError }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8 ml-12 text-center uppercase">
        Books
      </h2>
      {isLoading && !isError && <LoadingSpinner />}
      {!isLoading && !isError && (
        <div className="mx-12">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {books?.map(
              (book: IBook) => book && <BookCard key={book._id} book={book} />
            )}
          </div>
        </div>
      )}
      {!isLoading && isError && (
        <ErrorComponent message="Couldn't load books!" />
      )}
    </div>
  );
};

export default BooksComponent;
