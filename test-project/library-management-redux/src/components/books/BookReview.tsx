import { Formik, Form, Field } from 'formik'
import Modal from '../common/Modal'
import { useAddReviewMutation } from '../../store'
import Button from '../common/Button'
import { Session } from '@ory/client'

type TBookReview = {
	isOpen: boolean
	onCancel(): void
	activeUser: Session
	reviewedBookId: string
}

function BookReview({
	isOpen,
	onCancel,
	activeUser,
	reviewedBookId,
}: TBookReview) {
	const [addReview] = useAddReviewMutation()

	const handleReviewSubmit = (review: string) => {
		addReview({
			text: review,
			createdById: activeUser?.identity?.id!,
			bookId: reviewedBookId,
		})

		onCancel()
	}
	const formInitialValues = {
		review: '',
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onCancel={onCancel}
			>
				<Formik
					initialValues={formInitialValues}
					onSubmit={(values, actions) => {
						handleReviewSubmit(values.review)
						actions.resetForm({
							values: {
								review: '',
							},
						})
					}}
				>
					{() => (
						<Form className='flex flex-col gap-2 px-3 my-2'>
							<label className='font-bold'>Enter Review</label>
							<Field
								as='textarea'
								name='review'
								className='border m-2 p-2'
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
		</>
	)
}

export default BookReview
