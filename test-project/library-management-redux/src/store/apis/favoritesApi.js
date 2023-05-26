import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const favoritesApi = createApi({
  reducerPath: "favorites",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://645e200d12e0a87ac0e837cd.mockapi.io",
  }),
  endpoints(builder) {
    return {
      fetchFavorites: builder.query({
        providesTags: (res = []) => {
          return [
            ...res.map((r) => ({ type: "Favorite", id: r.id })),
            { type: "Favorites", id: "FAVORITES" },
          ];
        },
        query: (userId) => {
          return  {
                url: `/users/${userId}/favorites`,
                method: "GET",
              };
        },
      }),

      addFavorite: builder.mutation({
        invalidatesTags: () => [{ type: "Favorites", id: "FAVORITES" }],
        query: ({ userId, bookId }) => {
          return {
            url: `/users/${userId}/favorites`,
            method: "POST",
            body: {
              bookId,
            },
          };
        },
      }),

      deleteFavorite: builder.mutation({
        invalidatesTags: (res, err, { favoriteId }) => [
          { type: "Favorite", id: favoriteId },
        ],
        query: ({ userId, favoriteId }) => {
          return {
            url: `users/${userId}/favorites/${favoriteId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoritesApi;

export { favoritesApi };
