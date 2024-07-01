import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TCategory, CategoryPayload } from '../../types'

const categoriesApi = createApi({
	reducerPath: 'categories',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://666c43f349dbc5d7145d5e5e.mockapi.io',
	}),
	tagTypes: ['Category', 'Categories'], // Define the tag types
	endpoints: builder => ({
		fetchCategories: builder.query<TCategory[], void>({
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({
								type: 'Category' as const,
								id,
							})),
							{ type: 'Categories', id: 'CATEGORY' },
					  ]
					: [{ type: 'Categories', id: 'CATEGORY' }],
			query: () => ({
				url: '/categories',
				method: 'GET',
			}),
		}),

		addCategory: builder.mutation<TCategory, Partial<CategoryPayload>>({
			invalidatesTags: [{ type: 'Categories', id: 'CATEGORY' }],
			query: category => ({
				url: '/categories',
				method: 'POST',
				body: category,
			}),
		}),

		editCategory: builder.mutation<
			TCategory,
			{ id: string; newCategory: CategoryPayload }
		>({
			invalidatesTags: (_, __, { id }) => [{ type: 'Category', id }],
			query: ({ id, newCategory }) => ({
				url: `/categories/${id}`,
				method: 'PUT',
				body: newCategory,
			}),
		}),

		deleteCategory: builder.mutation<
			{ success: boolean; id: string },
			string
		>({
			invalidatesTags: (_, __, id) => [{ type: 'Category', id }],
			query: id => ({
				url: `/categories/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useFetchCategoriesQuery,
	useAddCategoryMutation,
	useEditCategoryMutation,
	useDeleteCategoryMutation,
} = categoriesApi
export { categoriesApi }
