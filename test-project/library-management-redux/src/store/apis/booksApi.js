import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const booksApi = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://645e200d12e0a87ac0e837cd.mockapi.io",
  }),
  endpoints(builder) {
    return {
      fetchBooks: builder.query({
        providesTags: (res) => [
          ...res.map((r) => ({ type: "Book", id: r.id })),
          { type: "Books", id: "BOOKS" },
        ],
        query: ({
          term = "",
          catId = "",
          sortBy = "",
          order = "asc",
          page = 1,
        } = {}) =>
          `/books?&search=${term}${
            catId ? "&categoryId=" + catId : ""
          }&sortBy=${sortBy}&order=${order}&page=${page}&limit=5`,
      }),

      addBooks: builder.mutation({
        invalidatesTags: [{ type: "Books", id: "BOOKS" }],
        query: (book) => {
          return {
            url: "/books",
            method: "POST",
            body: {
              ...book,
            },
          };
        },
      }),

      editBook: builder.mutation({
        invalidatesTags: (res, err, { id }) => [{ type: "Book", id }],
        query: ({ id, newBook }) => {
          return {
            url: `/books/${id}`,
            method: "PUT",
            body: {
              ...newBook,
            },
          };
        },
      }),

      deleteBook: builder.mutation({
        invalidatesTags: (res, err, id) => [
          { type: "Book", id },
          { type: "Books", id: "BOOKS" },
        ],
        query: (id) => {
          return {
            url: `/books/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchBooksQuery,
  useAddBooksMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = booksApi;
export { booksApi };
