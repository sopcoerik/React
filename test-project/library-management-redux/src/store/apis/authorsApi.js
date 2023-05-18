import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authorsApi = createApi({
  reducerPath: "authors",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://645e200d12e0a87ac0e837cd.mockapi.io",
  }),
  endpoints(builder) {
    return {
      fetchAuthors: builder.query({
        providesTags: (res) => [
          ...res.map((r) => ({ type: "Author", id: r.id })),
          { type: "Authors", id: "AUTHORS" },
        ],
        query: () => {
          return {
            url: "/authors",
            method: "GET",
          };
        },
      }),

      addAuthors: builder.mutation({
        invalidatesTags: [{ type: "Authors", id: "AUTHORS" }],
        query: (author) => {
          return {
            url: "/authors",
            method: "POST",
            body: {
              ...author,
            },
          };
        },
      }),

      editAuthor: builder.mutation({
        invalidatesTags: (res, err, { id }) => [{ type: "Author", id }],
        query: ({ id, newAuthor }) => {
          return {
            url: `/authors/${id}`,
            method: "PUT",
            body: {
              ...newAuthor,
            },
          };
        },
      }),

      deleteAuthors: builder.mutation({
        invalidatesTags: (res, err, id) => [{ type: "Author", id }],
        query: (id) => {
          return {
            url: `/authors/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAuthorsQuery,
  useAddAuthorsMutation,
  useEditAuthorMutation,
  useDeleteAuthorsMutation,
} = authorsApi;
export { authorsApi };
