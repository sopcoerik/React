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
        query: (name) => {
          return {
            url: "/authors",
            method: "POST",
            body: {
              name,
            },
          };
        },
      }),

      editAuthor: builder.mutation({
        invalidatesTags: (res, err, { authorToEdit }) => [
          { type: "Author", id: authorToEdit.id },
        ],
        query: ({ authorToEdit, newName }) => {
          return {
            url: `/authors/${authorToEdit.id}`,
            method: "PUT",
            body: {
              ...authorToEdit,
              name: newName,
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
