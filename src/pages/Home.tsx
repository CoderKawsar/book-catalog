/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BooksComponent from "../components/Books";
import { IBook } from "../interfaces/book";
import { useGetBooksQuery } from "../redux/features/book/bookApi";

function Home() {
  const { data } = useGetBooksQuery(undefined);
  const books: IBook[] = (data?.data || []) as IBook[];
  return (
    <div className="my-12">
      {books.length ? <BooksComponent books={books} /> : "No data found!"}
    </div>
  );
}

export default Home;
