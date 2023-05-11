import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => ({ type: "Photo", id: photo.id }));
          tags.push({ type: "AlbumPhotos", id: album.id });
          return tags;
        },
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),

      createPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => [
          {
            type: "AlbumPhotos",
            id: album.id,
          },
        ],
        query: (album) => {
          return {
            url: "/photos",
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
            method: "POST",
          };
        },
      }),

      deletePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => [
          {
            type: "Photo",
            id: photo.id,
          },
        ],

        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useCreatePhotoMutation,
  useDeletePhotoMutation,
} = photosApi;
export { photosApi };
