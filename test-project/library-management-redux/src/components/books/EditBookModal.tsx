import { useState } from 'react'
import Modal from '../common/Modal'
import Dropdown from '../common/Dropdown'
import { Formik, Form } from 'formik'
import Input from '../common/Input'
import { Author, TBook, TCategory } from '../../types'
import Button from '../common/Button'
import { Session } from '@ory/client'

type TEditBookModalProps = {
	bookToEditId: string
	editBook(value: { id: string; newBook: TBook }): void
	addBook(book: TBook): void
	isOpen: boolean
	onCancel(): void
	onOk(): void
	activeUser: Session
	setBookToEditId(bookId: string | null): void
	books: TBook[]
	authors: Author[]
	categories: TCategory[]
	setIsOpen(value: boolean): void
}

function EditBookModal({
	bookToEditId,
	editBook,
	addBook,
	isOpen,
	onCancel,
	onOk,
	activeUser,
	setBookToEditId,
	books,
	authors,
	categories,
}: TEditBookModalProps) {
	const bookToEdit = books?.find(book => book.id === bookToEditId)

	const [bookFormState, setBookFormState] = useState<{
		title: string
		selectedAuthor: Author | null
		description: string
		selectedCategory: TCategory | null
	}>({
		title: bookToEdit?.title || '',
		selectedAuthor: null,
		description: '',
		selectedCategory: null,
	})

	const handleAuthorChange = (value: Author) => {
		setBookFormState({ ...bookFormState, selectedAuthor: value })
	}

	const handleCategoryChange = (value: TCategory) => {
		setBookFormState({ ...bookFormState, selectedCategory: value })
	}

	const handleBookFormSubmit = (title: string, description: string) => {
		bookToEditId
			? editBook({
					id: bookToEditId,
					newBook: {
						title,
						authorId: bookFormState.selectedAuthor?.id!,
						author: bookFormState.selectedAuthor?.name!,
						description,
						categoryId: bookFormState.selectedCategory?.id!,
						createdById: activeUser?.identity?.id!,
					},
			  })
			: addBook({
					title,
					authorId: bookFormState.selectedAuthor?.id!,
					author: bookFormState.selectedAuthor?.name!,
					description,
					categoryId: bookFormState.selectedCategory?.id!,
					createdById: activeUser?.identity?.id!,
			  })

		setBookFormState({
			title: '',
			selectedAuthor: null,
			description: '',
			selectedCategory: null,
		})

		onOk()
		setBookToEditId(null)
	}

	const formInitialValues = {
		title: bookToEdit?.title || '',
		description: bookToEdit?.description || '',
	}

	return (
		<Modal
			isOpen={isOpen}
			onCancel={onCancel}
		>
			<Formik
				initialValues={formInitialValues}
				onSubmit={(values, actions) => {
					handleBookFormSubmit(values.title, values.description)
					actions.resetForm({
						values: {
							title: '',
							description: '',
						},
					})
				}}
			>
				{() => (
					<Form className='p-10 flex flex-col gap-5 items-center w-full'>
						<Input
							name='title'
							type='text'
							label='Book Title'
							placeholder='Book Title'
							className='border rounded border-slate-200 px-1 py-3'
						/>
						<Dropdown
							author
							options={authors}
							setSelectedAuthor={handleAuthorChange}
							label={'Choose an Author'}
						/>
						<Input
							name='description'
							type='text'
							label='Book Description'
							placeholder='Book Description'
							className={`border rounded border-slate-200 px-1 py-3`}
						/>
						<Dropdown
							category
							options={categories}
							setSelectedCategory={handleCategoryChange}
							label={'Choose a Category'}
						/>
						<Button
							danger
							onClick={onCancel}
							className='absolute -translate-x-2/4 -translate-y-2/4 bottom-0 right-12'
						>
							Cancel
						</Button>
						<Button
							className='absolute -translate-x-2/4 -translate-y-2/4 bottom-0 -right-3'
							type='submit'
						>
							Save
						</Button>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}

export default EditBookModal
