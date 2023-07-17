/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "../components/BookCard";
import { IBook } from "../interfaces/book";
import { useGetBooksQuery } from "../redux/features/book/bookApi";

function Home() {
  const { data } = useGetBooksQuery(undefined);
  const books: IBook[] = (data?.data || []) as IBook[];
  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-8 ml-12 text-center uppercase">
        Books
      </h2>

      <div className="mx-12">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {books?.map(
            (book: IBook) => book && <BookCard key={book._id} book={book} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
