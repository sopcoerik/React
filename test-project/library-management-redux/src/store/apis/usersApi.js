import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://645e200d12e0a87ac0e837cd.mockapi.io",
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        providesTags: (res) => [
          ...res.map((r) => ({ type: "User", id: r.id })),
          { type: "Users", id: "USERS" },
        ],
        query: () => {
          return {
            url: "/users",
            method: "GET",
          };
        },
      }),

      createUser: builder.mutation({
        invalidatesTags: [{ type: "Users", id: "USERS" }],
        query: (user) => {
          return {
            url: "/users",
            method: "POST",
            body: {
              ...user,
            },
          };
        },
      }),

      updateUser: builder.mutation({
        invalidatesTags: (res, err, user) => [{ type: "User", id: user.id }],
        query: ({ id, updatedUser }) => {
          return {
            url: `/users/${id}`,
            method: "PUT",
            body: {
              ...updatedUser,
            },
          };
        },
      }),

      deleteUser: builder.mutation({
        invalidatesTags: (res, err, id) => [{ type: "User", id }],
        query: (id) => {
          return {
            url: `/users/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export { usersApi };
export const {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
