import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserByEmail: build.query({
      query: (email: string) => `/users/${email}`,
      providesTags: ["User"],
    }),

    addBookToWishList: build.mutation({
      query: ({ email, bookId }: { email: string; bookId: string }) => ({
        url: "/users/add-book-to-wishlist",
        method: "PATCH",
        body: { email, bookId },
      }),
      invalidatesTags: ["User"],
    }),

    addBookToReading: build.mutation({
      query: ({ email, bookId }: { email: string; bookId: string }) => ({
        url: "/users/add-book-to-reading",
        method: "PATCH",
        body: { email, bookId },
      }),
      invalidatesTags: ["User"],
    }),

    addBookToFinishedReading: build.mutation({
      query: ({ email, bookId }: { email: string; bookId: string }) => ({
        url: "/users/add-to-book-finished-reading",
        method: "PATCH",
        body: { email, bookId },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByEmailQuery,
  useAddBookToWishListMutation,
  useAddBookToReadingMutation,
  useAddBookToFinishedReadingMutation,
} = userApi;
