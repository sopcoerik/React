import { useState } from 'react'

import SearchBooks from '../../components/books/SearchBooks'
import BooksList from '../../components/books/BooksList'
import FilterBooks from '../../components/books/FilterBooks'
import {
	useFetchBooksQuery,
	useDeleteBookMutation,
	useAddBooksMutation,
	useEditBookMutation,
	useFetchFavoritesQuery,
	useFetchCategoriesQuery,
	useFetchAuthorsQuery,
	useAddFavoriteMutation,
	useDeleteFavoriteMutation,
} from '../../store'

import BookItem from '../../components/books/BookItem'
import EditBookModal from '../../components/books/EditBookModal'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import { Author, TBook, TCategory, TFavorite, TSortingState } from '../../types'
import { useActiveUser } from '../../store/slices/activeUserSlice'

function BooksPage() {
	const { session } = useActiveUser()

	const [page, setPage] = useState(1)

	// Search
	const [searchTerm, setSearchTerm] = useState('')

	// Filter
	const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<
		string[]
	>([])
	const { data: categories } = useFetchCategoriesQuery()

	// Sorting
	const [sorting, setSorting] = useState<TSortingState>({
		title: 'asc',
	})

	const { data: books, isLoading: booksAreLoading } = useFetchBooksQuery({
		term: searchTerm,
		catId: selectedCategoriesIds[0],
		sortBy: Object.keys(sorting)[0],
		order: sorting[Object.keys(sorting)[0]],
		page,
	})

	// Other
	const [deleteBook] = useDeleteBookMutation()

	// TODO: move these to EditBookModal
	const [addBook] = useAddBooksMutation()
	const [editBook] = useEditBookMutation()

	const [bookToEditId, setBookToEditId] = useState<string | null>('')

	const { data: authors } = useFetchAuthorsQuery()

	const [modalIsOpen, setModalIsOpen] = useState(false)

	const { data: favorites } = useFetchFavoritesQuery(
		{ userId: session?.identity?.id! },
		{
			skip: !session,
		}
	)

	const [addFavorite] = useAddFavoriteMutation()
	const [deleteFavorite] = useDeleteFavoriteMutation()

	const [isDeleted, setIsDeleted] = useState(false)
	const [bookToDelete, setBookToDelete] = useState<TBook | null>(null)

	const handleEditBook = (id: string) => {
		setModalIsOpen(true)
		setBookToEditId(id)
	}

	const deleteMessage = (book: TBook) => {
		setBookToDelete(book)
		setIsDeleted(true)
	}

	const handleDeleteBook = (book: TBook) => {
		setIsDeleted(false)
		deleteBook(book.id!)
	}

	const handleFavoriteClick = (
		bookId: string,
		favoriteBook: TFavorite,
		favorite: boolean,
		setFavorite: (value: boolean) => void
	) => {
		if (favorite || favoriteBook) {
			deleteFavorite({
				userId: session?.identity?.id!,
				favoriteId: favoriteBook?.id,
			})
			setFavorite(false)
			return
		} else {
			addFavorite({
				userId: session?.identity?.id!,
				bookId: bookId,
			})
			setFavorite(true)
		}
	}

	const mappingFunction = (array: TBook[] = []) => {
		return array?.map((book: TBook) => {
			const bookAuthor = authors?.find(
				(author: Author) => book.authorId === author.id
			)
			const bookCategory = categories?.find(
				(category: TCategory) => book.categoryId === category.id
			)
			return (
				<BookItem
					key={book.id}
					book={book}
					handleEditBook={handleEditBook}
					bookAuthor={bookAuthor}
					bookCategory={bookCategory!}
					activeUser={session!}
					deleteMessage={deleteMessage}
					isDeleted={isDeleted}
					setIsDeleted={setIsDeleted}
					handleFavoriteClick={handleFavoriteClick}
					favorites={favorites!}
				/>
			)
		})
	}

	const renderedBooks = mappingFunction(books)

	return (
		<div className='container mx-auto'>
			<div>
				<SearchBooks setTerm={setSearchTerm} />
			</div>
			<div>
				<FilterBooks
					categories={categories!}
					setSelectedCategoriesIds={setSelectedCategoriesIds}
				/>
			</div>
			<div>
				{booksAreLoading && (
					<div className='w-full h-36 flex justify-center items-center'>
						<Loader />
					</div>
				)}
				{!booksAreLoading && (
					<BooksList
						books={books!}
						setModal={setModalIsOpen}
						setBookToEditId={setBookToEditId}
						sorting={sorting}
						setSorting={setSorting}
						activeUser={session!}
						page={page}
						setPage={setPage}
						renderedBooks={renderedBooks}
					/>
				)}
			</div>

			{isDeleted && (
				<Modal
					headerText={`Are you sure you want to delete ${bookToDelete?.title} book?`}
					isOpen={isDeleted}
					onOk={() => handleDeleteBook(bookToDelete!)}
					onCancel={() => setIsDeleted(false)}
					confirmMessage='Yes'
					cancelMessage='No'
				></Modal>
			)}

			<EditBookModal
				bookToEditId={bookToEditId!}
				setBookToEditId={setBookToEditId}
				editBook={editBook}
				addBook={addBook}
				isOpen={modalIsOpen}
				onCancel={() => setModalIsOpen(false)}
				onOk={() => setModalIsOpen(false)}
				setIsOpen={setModalIsOpen}
				activeUser={session!}
				books={books!}
				authors={authors!}
				categories={categories!}
			/>
		</div>
	)
}

export default BooksPage
