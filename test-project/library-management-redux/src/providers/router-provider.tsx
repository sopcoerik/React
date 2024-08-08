import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from '../App'
import { ThemeProvider } from '@providers'
import AuthorsPage from '../pages/AuthorsPage/AuthorsPage'
import BookDetailPage from '../pages/BookDetailPage/BookDetailPage'
import BooksPage from '../pages/BooksPage/BooksPage'
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage'
import UserPage from '../pages/UserPage/UserPage'
import { useKratosAuth } from '@hooks'
import {
	updateActiveUserData,
	useActiveUser,
} from '../store/slices/activeUserSlice'

export function Router() {
	const { session, logoutUrl } = useKratosAuth()
	const dispatch = useDispatch()

	const activeUser = useActiveUser()

	if (session === 'loading') {
		return <h1>Loading...</h1>
	}

	if (session === 'error') {
		return <h1>Error</h1>
	}

	if (session && logoutUrl && !activeUser.session && !activeUser.logoutUrl) {
		dispatch(
			updateActiveUserData({
				session,
				logoutUrl,
			})
		)
	}

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<ThemeProvider>
					<App />
				</ThemeProvider>
			),

			children: [
				{
					path: '/',
					element: <BooksPage />,
				},
				{
					path: '/authors',
					element: <AuthorsPage />,
				},
				{
					path: '/categories',
					element: <CategoriesPage />,
				},
				{
					path: '/user',
					element: <UserPage />,
				},
				{
					path: '/detail/:bookId',
					element: <BookDetailPage />,
				},
			],
		},
	])

	// return <a href={logoutUrl!}>Log out</a>
	return <RouterProvider router={router} />
}
