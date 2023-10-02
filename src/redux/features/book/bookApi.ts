import { api } from "../../api/apiSlice";

type BookPayload = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[];
  addedBy: string;
};

const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "/books",
    }),
    getSingleBook: build.query({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      query: (_id) => `/books/${_id}`,
    }),
    postBook: build.mutation({
      query: (data: BookPayload) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
    }),
    editBook: build.mutation({
      query: ({ id, ...bookData }: { id: string; [key: string]: any }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: bookData,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  usePostBookMutation,
  useEditBookMutation,
} = bookApi;
