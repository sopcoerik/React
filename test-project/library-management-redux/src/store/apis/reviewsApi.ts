import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { EditReviewParams, ReviewPayload, TReview } from '../../types'

const reviewsApi = createApi({
	reducerPath: 'reviews',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://666c43f349dbc5d7145d5e5e.mockapi.io',
	}),
	tagTypes: ['Review', 'Reviews'],
	endpoints: builder => ({
		fetchReviews: builder.query<TReview[], void>({
			providesTags: result =>
				result
					? [
							...result.map(r => ({
								type: 'Review' as const,
								id: r.id,
							})),
							{ type: 'Reviews', id: 'REVIEWS' },
					  ]
					: [],
			query: () => ({
				url: '/reviews',
				method: 'GET',
			}),
		}),

		addReview: builder.mutation<TReview, Partial<ReviewPayload>>({
			invalidatesTags: [{ type: 'Reviews', id: 'REVIEWS' }],
			query: review => ({
				url: '/reviews',
				method: 'POST',
				body: review,
			}),
		}),

		editReview: builder.mutation<TReview, EditReviewParams>({
			invalidatesTags: (_, __, { id }) => [{ type: 'Review', id }],
			query: ({ id, newReview }) => ({
				url: `/reviews/${id}`,
				method: 'PUT',
				body: newReview,
			}),
		}),

		deleteReview: builder.mutation<
			{ success: boolean; id: string },
			string
		>({
			invalidatesTags: (_, __, id) => [{ type: 'Review', id }],
			query: id => ({
				url: `/reviews/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useFetchReviewsQuery,
	useAddReviewMutation,
	useEditReviewMutation,
	useDeleteReviewMutation,
} = reviewsApi

export { reviewsApi }
