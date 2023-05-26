import BookReview from "../../components/books/BookReview";
import Modal from "../../components/common/Modal";
import BookDetail from "../../components/books/BookDetail";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddReviewMutation,
  useFetchUsersQuery,
  useFetchReviewsQuery,
  useFetchAuthorsQuery,
  useFetchCategoriesQuery,
  useGetBookToViewQuery,
} from "../../store";

function BookDetailPage() {
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const [addReview] = useAddReviewMutation();
  const { data: users } = useFetchUsersQuery();
  const { data: reviews } = useFetchReviewsQuery();
  const { data: authors } = useFetchAuthorsQuery();
  const { data: categories } = useFetchCategoriesQuery();

  const [reviewWindow, setReviewWindow] = useState(false);

  const bookToViewId = window.location.pathname.split("/").pop();
  const { data: bookToView } = useGetBookToViewQuery(bookToViewId);

  return (
    <div>
      {/* // TODO: this will be moved to book details page. also create new modal for it with logic. */}
      <BookReview
        isOpen={reviewWindow}
        onCancel={() => setReviewWindow(false)}
        activeUser={activeUser}
        addReview={addReview}
        reviewedBookId
      />
      {/* // TODO: this will be moved to it's own page */}
      <BookDetail
        bookToView={bookToView}
        reviews={reviews}
        users={users}
        activeUser={activeUser}
        categories={categories}
        authors={authors}
        setReviewWindow={setReviewWindow}
      />
    </div>
  );
}

export default BookDetailPage;
