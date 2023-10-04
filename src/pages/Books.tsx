/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IBook } from "../interfaces/book";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import BooksComponent from "../components/Books";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const books: IBook[] = (data?.data || []) as IBook[];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<string[]>([]);
  const [publicationYears, setPublicationYears] = useState<number[]>([]);

  useEffect(() => {
    if (!isLoading && !isError) {
      // Extract years from publicationDate and make them unique
      const years = [
        ...new Set(
          books.map((book: IBook) => {
            const publicationDate = new Date(book.publicationDate);
            return publicationDate.getFullYear();
          })
        ),
      ].sort((a, b) => b - a);

      setPublicationYears(years);

      // Extract unique genres
      const uniqueGenres = [...new Set(books.map((book) => book.genre))];
      setGenres(uniqueGenres);

      setLoading(false);
    }
  }, [books, isLoading, isError]);

  // Filter books based on search term
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Filter books based on selected genre
  const genreFilteredBooks = selectedGenre
    ? filteredBooks.filter((book) => book.genre === selectedGenre)
    : filteredBooks;

  // Filter books based on selected year
  const yearFilteredBooks = selectedYear
    ? genreFilteredBooks.filter((book) => {
        const publicationDate = new Date(book.publicationDate);
        return publicationDate.getFullYear() === parseInt(selectedYear);
      })
    : genreFilteredBooks;

  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold ml-12 text-center uppercase">
        All Books
      </h2>
      <div className="flex items-center gap-x-4 mx-72 my-8">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by title, author, or genre"
          className="w-full p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Genre filter */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="block p-2 border rounded-md"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Publication year filter */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="block p-2 border rounded-md"
        >
          <option value="">All Years</option>
          {publicationYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <BooksComponent
          books={yearFilteredBooks}
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </div>
  );
};

export default Books;
