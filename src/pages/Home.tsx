/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BooksComponent from "../components/Books";
import { IBook } from "../interfaces/book";
import { useGetBooksQuery } from "../redux/features/book/bookApi";

function Home() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const books: IBook[] = (data?.data || []) as IBook[];
  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-8 ml-12 text-center uppercase">
        Books
      </h2>
      <BooksComponent
        books={books.slice(0, 10)}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default Home;
