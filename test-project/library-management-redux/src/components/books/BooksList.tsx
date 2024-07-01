import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import { useTheme } from '../../hooks/useTheme'
import Button from '../common/Button'
import { ReactNode } from 'react'
import { TBook, TSortingState } from '../../types'
import { Session } from '@ory/client'

type TBooksListProps = {
	books: TBook[]
	setModal(value: boolean): void
	setBookToEditId(bookId: string | null): void
	sorting: TSortingState
	setSorting(value: TSortingState): void
	activeUser: Session
	setPage(value: number): void
	page: number
	renderedBooks: ReactNode
}

function BooksList({
	books,
	setModal,
	setBookToEditId,
	sorting,
	setSorting,
	activeUser,
	setPage,
	page,
	renderedBooks,
}: TBooksListProps) {
	const theme = useTheme()

	const handleAddBook = () => {
		setBookToEditId(null)
		setModal(true)
	}

	return (
		<div
			className={`${
				theme === 'dark' ? 'bg-black text-white' : 'bg-slate-200'
			} my-3 px-5 py-7`}
		>
			<table className='table-fixed w-full'>
				<thead className='border-b border-gray-900'>
					<tr>
						<th>
							<button
								onClick={() => {
									if (sorting['title']) {
										setSorting(
											sorting['title'] === 'asc'
												? { title: 'desc' }
												: { title: 'asc' }
										)
									} else {
										setSorting({
											title:
												sorting[
													Object.keys(sorting)[0]
												] === 'asc'
													? 'desc'
													: 'asc',
										})
									}
								}}
								className='flex'
							>
								{sorting?.['title'] === 'desc' ? (
									<GoChevronDown />
								) : (
									<GoChevronUp />
								)}
								Title
							</button>
						</th>
						<th>
							<button
								onClick={() => {
									if (sorting['author']) {
										setSorting(
											sorting['author'] === 'asc'
												? { author: 'desc' }
												: { author: 'asc' }
										)
									} else {
										setSorting({
											author:
												sorting[
													Object.keys(sorting)[0]
												] === 'asc'
													? 'desc'
													: 'asc',
										})
									}
								}}
								className='flex'
							>
								{sorting?.['author'] === 'desc' ? (
									<GoChevronDown />
								) : (
									<GoChevronUp />
								)}
								Author
							</button>
						</th>
						<th>Description</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>{renderedBooks}</tbody>
			</table>
			<div className='flex justify-center items-center gap-2'>
				<Button
					onClick={() => setPage(page > 1 ? page - 1 : 1)}
					rounded
				>
					Previous Page
				</Button>
				{books.length > 5 && (
					<Button
						onClick={() => setPage(page + 1)}
						rounded
					>
						Next Page
					</Button>
				)}
			</div>
			<div className='flex flex-col m-3'>
				<div className='flex justify-end'>
					{activeUser && (
						<Button
							primary
							rounded
							onClick={handleAddBook}
						>
							+ Add Book
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default BooksList
