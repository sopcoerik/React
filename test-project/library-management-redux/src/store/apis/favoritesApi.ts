import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	TFavorite,
	FetchFavoritesParams,
	AddFavoritePayload,
	DeleteFavoriteParams,
} from '@types'

const favoritesApi = createApi({
	reducerPath: 'favorites',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://666c43f349dbc5d7145d5e5e.mockapi.io',
	}),
	tagTypes: ['Favorite', 'Favorites'],
	endpoints: builder => ({
		fetchFavorites: builder.query<TFavorite[], FetchFavoritesParams>({
			providesTags: (result = []) => [
				...result.map(r => ({ type: 'Favorite' as const, id: r.id })),
				{ type: 'Favorites', id: 'FAVORITES' },
			],
			query: ({ userId }) => ({
				url: `/favorites?userId=${userId}`,
				method: 'GET',
			}),
		}),

		addFavorite: builder.mutation<TFavorite, AddFavoritePayload>({
			invalidatesTags: () => [{ type: 'Favorites', id: 'FAVORITES' }],
			query: ({ userId, bookId }) => ({
				url: `/favorites`,
				method: 'POST',
				body: { userId, bookId },
			}),
		}),

		deleteFavorite: builder.mutation<
			{ success: boolean; id: string },
			DeleteFavoriteParams
		>({
			invalidatesTags: (_, __, { favoriteId }) => [
				{ type: 'Favorite', id: favoriteId },
			],
			query: ({ userId, favoriteId }) => ({
				url: `/favorites/${favoriteId}?userId=${userId}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useFetchFavoritesQuery,
	useAddFavoriteMutation,
	useDeleteFavoriteMutation,
} = favoritesApi

export { favoritesApi }
