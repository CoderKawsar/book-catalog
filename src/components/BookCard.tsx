import { IBook } from "../interfaces/book";

const BookCard = ({ book }: { book: IBook }) => {
  const { title, author, genre, publicationDate } = book;
  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">Author: {author}</p>
      <p className="text-gray-600 mb-2">Genre: {genre}</p>
      <p className="text-gray-600 mb-2">Publication Date: {publicationDate}</p>
      <div className="flex items-center">
        <p className="text-gray-600 mr-2">Review Rating:</p>
        {/* <div className="flex">
          {Array.from({ length: reviewRating }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.928 1.072a.25.25 0 0 0-.345 0L5.47 2.94l-1.933.28a.25.25 0 0 0-.14.427l1.393 1.36-.328 1.908a.25.25 0 0 0 .363.263L5 7.773l1.716.903a.25.25 0 0 0 .29-.133L8 7.088l1.994 1.454a.25.25 0 0 0 .29.027l1.793-.945 1.167 1.064a.25.25 0 0 0 .36-.078l1.29-1.828 1.27-.155a.25.25 0 0 0 .139-.427l-1.705-1.69.438-2.009a.25.25 0 0 0-.363-.263L14.5 1.827l-1.716-.903a.25.25 0 0 0-.29.133L11 2.912l-1.994-1.454zM8 3.833a.25.25 0 0 0-.36 0L5.11 5.188 3.494 4.64a.25.25 0 0 0-.139.427l1.705 1.69-.438 2.01a.25.25 0 0 0 .363.263L5 10.172l-1.715.902a.25.25 0 0 0-.29.134l-.347.773 1.328-.194a.25.25 0 0 0 .14-.427L5 10.354l1.932-.28a.25.25 0 0 0 .139-.427L6.638 8.564l.347-.773A.25.25 0 0 0 7 7.356l1.715-.902L8.69 5.52a.25.25 0 0 0-.29-.133L8 5.643V3.833z"
              />
            </svg>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default BookCard;
