import { useState } from 'react'

import AuthorsList from '../../components/authors/authors-list'

import Loader from '../../components/common/Loader'
import Modal from '../../components/common/Modal'
import { Formik, Form } from 'formik'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

import {
	useFetchAuthorsQuery,
	useAddAuthorMutation,
	useEditAuthorMutation,
	useDeleteAuthorMutation,
} from '../../store'
import { Author } from '@types'
import { useActiveUser } from '../../store/slices/activeUserSlice'

function AuthorsPage() {
	const { data: authors, isLoading, error } = useFetchAuthorsQuery()

	const [addNewAuthor] = useAddAuthorMutation()

	const [editAuthor] = useEditAuthorMutation()

	const [deleteAuthor] = useDeleteAuthorMutation()

	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [authorToEditId, setAuthorToEditId] = useState<string | null>(null)

	const authorToEdit = authors?.find(
		(auth: Author) => auth.id === authorToEditId
	)

	const { session } = useActiveUser()

	const handleModalClose = () => setModalIsOpen(false)

	const handleFormSubmit = (name: string) => {
		authorToEditId
			? editAuthor({
					id: authorToEditId,
					newAuthor: { name, createdById: session?.identity?.id! },
			  })
			: addNewAuthor({ name, createdById: session?.identity?.id! })

		setModalIsOpen(false)
	}

	const formInitialValues = {
		author: authorToEdit?.name || '',
	}

	let content

	if (isLoading) {
		content = (
			<div className='w-full h-56 flex justify-center items-center'>
				Loading Data...
				<Loader />
			</div>
		)
	} else if (error) {
		content = <div>Error Loading Authors...</div>
	} else {
		content = (
			<div>
				<div>
					<AuthorsList
						authors={authors!}
						setModal={setModalIsOpen}
						setAuthorToEditId={setAuthorToEditId}
						deleteAuthor={deleteAuthor}
						activeUser={session!}
					/>
				</div>
				<Modal
					isOpen={modalIsOpen}
					onCancel={handleModalClose}
				>
					<Formik
						initialValues={formInitialValues}
						onSubmit={(values, actions) => {
							handleFormSubmit(values.author)
							actions.resetForm({
								values: {
									author: '',
								},
							})
						}}
					>
						<Form className='p-10 flex flex-col gap-5 items-center'>
							<Input
								name='author'
								type='text'
								label='Author Name'
								placeholder='Author Name'
								className={`border rounded border-slate-200 px-1 py-3`}
							/>
							<Button
								danger
								onClick={handleModalClose}
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
					</Formik>
				</Modal>
			</div>
		)
	}

	return <div className='container mx-auto'>{content}</div>
}

export default AuthorsPage
