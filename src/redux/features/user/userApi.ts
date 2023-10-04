import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUpUser: build.mutation({
      query: (data: { email: string }) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
    }),
    getUserByEmail: build.query({
      query: (email: string) => `/users/${email}`,
      providesTags: ["User"],
    }),

    addBookToWishList: build.mutation({
      query: ({
        userEmail,
        bookId,
      }: {
        userEmail: string;
        bookId: string;
      }) => ({
        url: "/users/add-book-to-wishlist",
        method: "PATCH",
        body: { userEmail, bookId },
      }),
      invalidatesTags: ["User"],
    }),

    addBookToReading: build.mutation({
      query: ({
        userEmail,
        bookId,
      }: {
        userEmail: string;
        bookId: string;
      }) => ({
        url: "/users/add-book-to-reading",
        method: "PATCH",
        body: { userEmail, bookId },
      }),
      invalidatesTags: ["User"],
    }),

    addBookToFinishedReading: build.mutation({
      query: ({
        userEmail,
        bookId,
      }: {
        userEmail: string;
        bookId: string;
      }) => ({
        url: "/users/add-book-to-finished-reading",
        method: "PATCH",
        body: { userEmail, bookId },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useGetUserByEmailQuery,
  useAddBookToWishListMutation,
  useAddBookToReadingMutation,
  useAddBookToFinishedReadingMutation,
} = userApi;
