/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IBook } from "../interfaces/book";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import BooksComponent from "../components/Books";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const books: IBook[] = (data?.data || []) as IBook[];

  return (
    <div className="my-12">
      {books && (
        <BooksComponent books={books} isLoading={isLoading} isError={isError} />
      )}
    </div>
  );
};

export default Books;
