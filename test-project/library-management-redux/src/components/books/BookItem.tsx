import Button from '../common/Button'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Author, TBook, TCategory, TFavorite } from '@types'
import { Session } from '@ory/client'

type TBookItemProps = {
	book: TBook
	handleEditBook(bookId: string): void
	bookAuthor?: Author
	bookCategory: TCategory
	activeUser: Session
	deleteMessage(book: TBook): void
	handleFavoriteClick(
		bookId: string,
		favoriteBook: TFavorite,
		favorite: boolean,
		setFavorite: (value: boolean) => void
	): void
	favorites: TFavorite[]
	isDeleted: boolean
	setIsDeleted(value: boolean): void
}

function BookItem({
	book,
	handleEditBook,
	bookAuthor,
	bookCategory,
	activeUser,
	deleteMessage,
	handleFavoriteClick,
	favorites,
}: TBookItemProps) {
	const [isFavorite, setIsFavorite] = useState(false)

	const favoriteBook = activeUser
		? favorites?.find(
				favorite =>
					favorite.bookId === book.id &&
					activeUser?.identity?.id! === favorite.userId
		  )
		: null

	return (
		<>
			<tr className='border-b border-slate-300 h-24'>
				<td className='h-24 flex gap-3 items-center'>
					{activeUser && (
						<button
							onClick={() =>
								handleFavoriteClick(
									book.id!,
									favoriteBook!,
									isFavorite,
									setIsFavorite
								)
							}
						>
							{isFavorite || favoriteBook ? (
								<MdFavorite className='text-lg' />
							) : (
								<MdFavoriteBorder className='text-lg' />
							)}
						</button>
					)}
					<Link
						to={activeUser ? `/detail/${book.id}` : ''}
						target={activeUser ? '_blank' : ''}
					>
						<p className='cursor-pointer'>{book.title}</p>
					</Link>
				</td>
				<td>{bookAuthor?.name}</td>
				<td>{book.description}</td>
				<td>{bookCategory?.name}</td>
				<td>
					{activeUser?.identity?.id! === book.createdById && (
						<>
							<Button
								rounded
								onClick={() => handleEditBook(book.id!)}
							>
								Edit Book
							</Button>

							<Button
								rounded
								danger
								onClick={() => deleteMessage(book)}
							>
								Delete
							</Button>
						</>
					)}
				</td>
			</tr>
		</>
	)
}

export default BookItem
