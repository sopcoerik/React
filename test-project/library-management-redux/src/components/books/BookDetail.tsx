import { createPortal } from 'react-dom'
import { MdModeEditOutline } from 'react-icons/md'
import { BsTrashFill } from 'react-icons/bs'

import { useTheme } from '@hooks'

import {
	useDeleteReviewMutation,
	useEditReviewMutation,
} from '../../store/apis/reviewsApi'
import { ChangeEvent, FormEvent, useState } from 'react'
import Button from '../common/Button'
import { Author, TBook, TCategory, TReview } from '@types'
import { Session } from '@ory/client'
import { BookDetailCard } from './BookDetailCard'

type TBookDetailProps = {
	bookToView?: TBook
	reviews?: TReview[]
	activeUser: Session
	categories?: TCategory[]
	authors?: Author[]
	setReviewWindow(value: boolean): void
}

function BookDetail({
	bookToView,
	reviews,
	activeUser,
	categories,
	authors,
	setReviewWindow,
}: TBookDetailProps) {
	const theme = useTheme()

	const viewedBookReviews = reviews?.filter(review => {
		return Number(review.bookId) === Number(bookToView?.id)
	})

	const category = categories?.find(
		category => category.id === bookToView?.categoryId
	)

	const [reviewToEdit, setReviewToEdit] = useState<{
		id: string
		bookId: string
		text: string
		createdById: string
	} | null>(null)
	const [editedInput, setEditedInput] = useState('')

	const [deleteReview] = useDeleteReviewMutation()
	const [editReview] = useEditReviewMutation()

	const handleEditReview = (review: {
		id: string
		bookId: string
		text: string
		createdById: string
	}) => {
		if (!reviewToEdit) {
			setReviewToEdit(review)
			setEditedInput(review.text)
		} else {
			setReviewToEdit(null)
			setEditedInput('')
		}
	}

	const handleEditInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setEditedInput(e.target.value)
	}

	const handleEditFormSubmit = (e: FormEvent) => {
		e.preventDefault()
		editReview({
			id: reviewToEdit?.id!,
			newReview: {
				text: editedInput,
				createdById: activeUser?.identity?.id!,
				bookId: bookToView?.id!,
			},
		})
		setReviewToEdit(null)
		setEditedInput('')
	}

	const author = authors?.find(author => author.id === bookToView?.authorId)

	const renderedReviews = viewedBookReviews?.map(review => {
		return (
			<div
				key={review.id}
				className='w-full border py-1 px-1 h-28 overflow-auto'
			>
				<p className='font-bold'>
					{activeUser.identity?.traits?.email.split('@')[0]}
				</p>
				<div className='pl-2 relative'>
					<form onSubmit={handleEditFormSubmit}>
						<textarea
							className='w-full h-full bg-inherit overflow-auto'
							disabled={
								!reviewToEdit || reviewToEdit.id !== review.id
							}
							value={
								(reviewToEdit?.createdById ===
									review.createdById &&
									reviewToEdit.id === review.id &&
									editedInput) ||
								review.text
							}
							onChange={handleEditInputChange}
						></textarea>
						{reviewToEdit === review && editedInput && (
							<button className='border p-0.5 bg-white text-xs absolute -bottom-10 right-0 -translate-x-2/4 -translate-y-2/4'>
								Save
							</button>
						)}
					</form>
				</div>
				<div className='flex gap-1 mt-2'>
					{activeUser?.identity?.id! === review?.createdById && (
						<>
							<div className='flex justify-end'>
								<button
									className='border p-0.5'
									onClick={() => handleEditReview(review)}
								>
									<MdModeEditOutline />
								</button>
							</div>
							<div className='flex justify-end'>
								<button
									className='border p-0.5'
									onClick={() => deleteReview(review.id)}
								>
									<BsTrashFill />
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		)
	})

	const activeUserHasReview = viewedBookReviews?.some(
		review => review.createdById === activeUser?.identity?.id
	)

	return createPortal(
		<div
			className={`absolute w-5/6 h-4/6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 border border-gray-400 ${
				theme === 'dark' ? theme : 'bg-slate-50'
			} overflow-hidden`}
		>
			<div className='h-full flex items-center'>
				<div className='w-full h-5/6 flex justify-around items-center'>
					<div className='h-full w-2/4 p-12'>
						<BookDetailCard
							title={'Title'}
							value={bookToView?.title!}
						/>

						<BookDetailCard
							title={'Author'}
							value={author?.name!}
						/>

						<BookDetailCard
							title={'Category'}
							value={category?.name!}
						/>
						<BookDetailCard
							title={'Description'}
							value={bookToView?.description!}
						/>
					</div>
					<div className='vr h-full w-0.5 bg-gray-100' />
					<div className='h-full w-2/4 px-3  pb-10'>
						<div className='text-center'>
							<h1 className='text-xl'>Reviews On This Book</h1>
						</div>
						<div className='p-3 w-full h-full border flex flex-col gap-5 overflow-auto '>
							<>{renderedReviews}</>
							<div className='flex justify-end'>
								{activeUser && !activeUserHasReview && (
									<Button
										primary
										onClick={() => setReviewWindow(true)}
									>
										+ Add Review
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('review-root')!
	)
}

export default BookDetail
