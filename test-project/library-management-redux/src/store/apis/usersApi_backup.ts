import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TUser, UserPayload, UpdateUserParams } from '../../types'

const apiBaseUrl = 'https://666c43f349dbc5d7145d5e5e.mockapi.io'

const usersApi = createApi({
	reducerPath: 'users',
	baseQuery: fetchBaseQuery({
		baseUrl: apiBaseUrl,
	}),
	tagTypes: ['User', 'Users'],
	endpoints: builder => ({
		fetchUsers: builder.query<TUser[], void>({
			providesTags: result =>
				result
					? [
							...result.map(r => ({
								type: 'User' as const,
								id: r.userId,
							})),
							{ type: 'Users', id: 'USERS' },
					  ]
					: [],
			query: () => ({
				url: '/users',
				method: 'GET',
			}),
		}),

		getActiveUser: builder.query<TUser, string>({
			query: activeUserId => ({
				url: `/users/${activeUserId}`,
				method: 'GET',
			}),
		}),

		createUser: builder.mutation<TUser, UserPayload>({
			invalidatesTags: [{ type: 'Users', id: 'USERS' }],
			query: user => ({
				url: '/users',
				method: 'POST',
				body: user,
			}),
		}),

		updateUser: builder.mutation<TUser, UpdateUserParams>({
			invalidatesTags: (_, __, { id }) => [{ type: 'User', id }],
			query: ({ id, updatedUser }) => ({
				url: `/users/${id}`,
				method: 'PUT',
				body: updatedUser,
			}),
		}),

		deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
			invalidatesTags: (_, __, id) => [{ type: 'User', id }],
			query: id => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export { usersApi }
export const {
	useFetchUsersQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useGetActiveUserQuery,
} = usersApi
