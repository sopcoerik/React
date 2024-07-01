import { GrFavorite } from 'react-icons/gr'
import { useState } from 'react'
import FavoritesItem from './FavoritesItem'

import {
	useFetchFavoritesQuery,
	useFetchAuthorsQuery,
	useFetchBooksQuery,
} from '../../store'
import { Author, TBook, TFavorite } from '../../types'
import { useTheme } from '../../hooks/useTheme'
import { Session } from '@ory/client'

type TFavoritesProps = {
	activeUser: Session
}

function Favorites({ activeUser }: TFavoritesProps) {
	const [favOpen, setFavOpen] = useState(false)
	const theme = useTheme()

	const handleFavoritesState = () => {
		setFavOpen(!favOpen)
	}

	const { data: favorites } = useFetchFavoritesQuery(
		{ userId: activeUser?.identity?.id! },
		{
			skip: !activeUser,
		}
	)

	const { data: authors } = useFetchAuthorsQuery()
	const { data: books } = useFetchBooksQuery({})

	const renderedFavorites = favorites?.map((fav: TFavorite) => {
		const favBook = books?.find((book: TBook) => book.id === fav.bookId)!
		const favAuthor = authors?.find(
			(author: Author) => author.id === favBook?.authorId
		)!
		return (
			<FavoritesItem
				favorite={favBook}
				author={favAuthor}
				key={fav.id}
			/>
		)
	})

	return (
		<div className='relative'>
			<div
				onClick={handleFavoritesState}
				className='hover:cursor-pointer'
			>
				<GrFavorite className='text-3xl' />
			</div>
			{favOpen && (
				<div
					className={`absolute w-44 top-3/4 right-2/4 border rounded-lg border-gray-500 ${
						theme === 'dark'
							? 'bg-black text-white'
							: 'bg-white text-black'
					}`}
				>
					<div>
						{favOpen &&
						renderedFavorites?.length &&
						renderedFavorites.length > 0 ? (
							renderedFavorites
						) : (
							<p className='p-1'>
								Add a book to your favorites! :{')'}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Favorites
