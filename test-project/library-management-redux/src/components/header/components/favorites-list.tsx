import { useTheme } from '../../../hooks/useTheme'
import { useFetchAuthorsQuery, useFetchBooksQuery } from '../../../store'
import { Author, TBook, TFavorite } from '../../../types'
import FavoritesItem from './favorites-item'

type TFavoritesListProps = {
	favorites: TFavorite[]
}

export default function FavoritesList({ favorites }: TFavoritesListProps) {
	const theme = useTheme()

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
		<div
			className={`absolute right-0 -translate-x-3 translate-y-8 border rounded-lg border-gray-500 ${
				theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
			}`}
		>
			{renderedFavorites?.length ? (
				renderedFavorites
			) : (
				<p className='p-1 whitespace-nowrap'>
					Add a book to your favorites! {':)'}
				</p>
			)}
		</div>
	)
}
