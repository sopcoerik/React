import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchAuthorsResponse, Author } from '../../types'

export const authorsApi = createApi({
	reducerPath: 'authors',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://666c43f349dbc5d7145d5e5e.mockapi.io',
	}),
	tagTypes: ['Author', 'Authors'],
	endpoints(builder) {
		return {
			fetchAuthors: builder.query<FetchAuthorsResponse, void>({
				providesTags: result =>
					result
						? [
								...result.map(({ id }) => ({
									type: 'Author' as const,
									id,
								})),
								{ type: 'Authors', id: 'AUTHORS' },
						  ]
						: [{ type: 'Authors', id: 'AUTHORS' }],
				query: () => ({
					url: '/authors',
					method: 'GET',
				}),
			}),

			addAuthor: builder.mutation<Author, Partial<Author>>({
				invalidatesTags: [{ type: 'Authors', id: 'AUTHORS' }],
				query: author => ({
					url: '/authors',
					method: 'POST',
					body: author,
				}),
			}),

			editAuthor: builder.mutation<
				void,
				{ id: string; newAuthor: Partial<Author> }
			>({
				invalidatesTags: (result, error, { id }) => [
					{ type: 'Author', id },
				],
				query: ({ id, newAuthor }) => ({
					url: `/authors/${id}`,
					method: 'PUT',
					body: newAuthor,
				}),
			}),

			deleteAuthor: builder.mutation<void, { id: string }>({
				invalidatesTags: (result, error, { id }) => [
					{ type: 'Author', id },
				],
				query: ({ id }) => ({
					url: `/authors/${id}`,
					method: 'DELETE',
				}),
			}),
		}
	},
})

export const {
	useFetchAuthorsQuery,
	useAddAuthorMutation,
	useEditAuthorMutation,
	useDeleteAuthorMutation,
} = authorsApi
