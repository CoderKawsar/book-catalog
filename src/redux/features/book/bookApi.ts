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
      providesTags: ["Book"],
    }),
    getSingleBook: build.query({
      query: (_id: string) => `/books/${_id}`,
    }),
    postBook: build.mutation({
      query: (data: BookPayload) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    editBook: build.mutation({
      query: ({ id, ...bookData }: { id: string; [key: string]: any }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: build.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  usePostBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
