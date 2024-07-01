import BookReview from '../../components/books/BookReview'
import BookDetail from '../../components/books/BookDetail'
import { useState } from 'react'

import {
	useFetchReviewsQuery,
	useFetchAuthorsQuery,
	useFetchCategoriesQuery,
	useGetBookToViewQuery,
} from '../../store'
import { useActiveUser } from '../../store/slices/activeUserSlice'

function BookDetailPage() {
	const { session } = useActiveUser()

	const { data: reviews } = useFetchReviewsQuery()
	const { data: authors } = useFetchAuthorsQuery()
	const { data: categories } = useFetchCategoriesQuery()

	const [reviewWindow, setReviewWindow] = useState(false)

	const bookToViewId = window.location.pathname.split('/').pop()!
	const { data: bookToView } = useGetBookToViewQuery(bookToViewId)

	return (
		<div>
			{/* // TODO: this will be moved to book details page. also create new modal for it with logic. */}
			<BookReview
				isOpen={reviewWindow}
				onCancel={() => setReviewWindow(false)}
				activeUser={session!}
				reviewedBookId={bookToViewId!}
			/>
			{/* // TODO: this will be moved to it's own page */}
			<BookDetail
				bookToView={bookToView}
				reviews={reviews}
				activeUser={session!}
				categories={categories}
				authors={authors}
				setReviewWindow={setReviewWindow}
			/>
		</div>
	)
}

export default BookDetailPage
