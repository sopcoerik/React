import { useState } from 'react'
import CategoriesList from '../../components/categories/CategoriesList'

import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'

import {
	useFetchCategoriesQuery,
	useAddCategoryMutation,
	useEditCategoryMutation,
	useDeleteCategoryMutation,
} from '../../store'

import Loader from '../../components/common/Loader'
import Input from '../../components/common/Input'

import { Form, Formik } from 'formik'
import { TCategory } from '../../types'
import { useActiveUser } from '../../store/slices/activeUserSlice'

function CategoriesPage() {
	const { data: categories, isLoading: categoriesAreLoading } =
		useFetchCategoriesQuery()

	const [addCategory] = useAddCategoryMutation()

	const [editCategory] = useEditCategoryMutation()

	const [deleteCategory] = useDeleteCategoryMutation()

	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [categoryToEditId, setCategoryToEditId] = useState<string | null>(
		null
	)

	const { session } = useActiveUser()

	const handleModalClose = () => setModalIsOpen(false)

	const handleFormSubmit = (name: string) => {
		console.log(name)
		categoryToEditId
			? editCategory({
					id: categoryToEditId,
					newCategory: { name, createdById: session?.identity?.id! },
			  })
			: addCategory &&
			  addCategory({
					name,
					createdById: session?.identity?.id!,
			  })

		handleModalClose()
	}
	const categoryToEdit = categories?.find(
		(cat: TCategory) => cat.id === categoryToEditId
	)
	const formInitialValues = {
		category: categoryToEdit?.name || '',
	}

	return (
		<div>
			{categoriesAreLoading && (
				<div className='container mx-auto'>
					<div className='h-56 flex justify-center items-center'>
						Loading Data...
						<Loader />
					</div>
				</div>
			)}
			{!categoriesAreLoading && (
				<div className='container mx-auto'>
					<div>
						<CategoriesList
							setModal={setModalIsOpen}
							setCategoryToEditId={setCategoryToEditId}
							deleteCategory={deleteCategory}
							categories={categories!}
							activeUser={session!}
						/>
					</div>
				</div>
			)}

			<Modal
				isOpen={modalIsOpen}
				onCancel={handleModalClose}
			>
				<Formik
					initialValues={formInitialValues}
					onSubmit={(values, actions) => {
						handleFormSubmit(values.category)
						actions.resetForm({
							values: {
								category: '',
							},
						})
					}}
				>
					{() => {
						return (
							<Form className='px-6 mb-6 flex flex-col gap-5 items-center'>
								<Input
									name='category'
									type='text'
									label='Category Name'
									placeholder='Category Name'
									className={`border rounded border-slate-200 px-1 py-3 mt-2`}
								/>
								<Button
									danger
									onClick={() => setModalIsOpen(false)}
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
						)
					}}
				</Formik>
			</Modal>
		</div>
	)
}

export default CategoriesPage
