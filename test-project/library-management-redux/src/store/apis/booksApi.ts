import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchBooksParams, TBook } from '@types'

const booksApi = createApi({
	reducerPath: 'books',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://666c43f349dbc5d7145d5e5e.mockapi.io',
	}),
	tagTypes: ['Book', 'Books'],
	endpoints: builder => ({
		fetchBooks: builder.query<TBook[], FetchBooksParams>({
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({
								type: 'Book' as const,
								id,
							})),
							{ type: 'Books', id: 'BOOKS' },
					  ]
					: [{ type: 'Books', id: 'BOOKS' }],
			query: ({
				term = '',
				catId = '',
				sortBy = '',
				order = 'asc',
				page = 1,
			}) =>
				`/books?&search=${term}${
					catId ? '&categoryId=' + catId : ''
				}&sortBy=${sortBy}&order=${order}&page=${page}&limit=5`,
		}),

		getBookToView: builder.query<TBook, string>({
			query: bookId => ({ url: `/books/${bookId}`, method: 'GET' }),
		}),

		addBooks: builder.mutation<TBook, Partial<TBook>>({
			invalidatesTags: [{ type: 'Books', id: 'BOOKS' }],
			query: book => ({
				url: '/books',
				method: 'POST',
				body: book,
			}),
		}),

		editBook: builder.mutation<TBook, { id: string; newBook: TBook }>({
			invalidatesTags: (_, __, { id }) => [
				{ type: 'Book', id },
				{ type: 'Books', id: 'BOOKS' },
			],
			query: ({ id, newBook }) => ({
				url: `/books/${id}`,
				method: 'PUT',
				body: newBook,
			}),
		}),

		deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
			invalidatesTags: (_, __, id) => [
				{ type: 'Book', id },
				{ type: 'Books', id: 'BOOKS' },
			],
			query: id => ({
				url: `/books/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useFetchBooksQuery,
	useGetBookToViewQuery,
	useAddBooksMutation,
	useEditBookMutation,
	useDeleteBookMutation,
} = booksApi
export { booksApi }
