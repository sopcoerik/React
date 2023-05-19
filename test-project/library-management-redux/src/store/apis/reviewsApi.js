import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewsApi = createApi({
  reducerPath: "reviews",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://645e200d12e0a87ac0e837cd.mockapi.io",
  }),
  endpoints(builder) {
    return {
      fetchReviews: builder.query({
        providesTags: (res) => [
          ...res.map((r) => ({ type: "Review", id: r.id })),
          { type: "Reviews", id: "REVIEWS" },
        ],
        query: () => {
          return {
            url: "/reviews",
            method: "GET",
          };
        },
      }),

      addReview: builder.mutation({
        invalidatesTags: [{ type: "Reviews", id: "REVIEWS" }],
        query: (review) => {
          return {
            url: "/reviews",
            method: "POST",
            body: {
              ...review,
            },
          };
        },
      }),

      editReview: builder.mutation({
        invalidatesTags: (res, err, { id }) => [{ type: "Review", id }],
        query: ({ id, newReview }) => {
          return {
            url: `/reviews/${id}`,
            method: "PUT",
            body: {
              ...newReview,
            },
          };
        },
      }),

      deleteReview: builder.mutation({
        invalidatesTags: (res, err, id) => [{ type: "Review", id }],
        query: (id) => {
          return {
            url: `/reviews/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchReviewsQuery,
  useAddReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
export { reviewsApi };
