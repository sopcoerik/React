import BookReview from "../../components/books/BookReview";
import Modal from "../../components/common/Modal";
import BookDetail from "../../components/books/BookDetail";
import { useSelector } from "react-redux";
import {
  useAddReviewMutation,
  useFetchUsersQuery,
  useFetchReviewsQuery,
  useFetchAuthorsQuery,
  useFetchCategoriesQuery,
} from "../../store";

function BookDetailPage({
  setReviewWindow,
  bookToView,
  handleReviewWindowState,
}) {
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const [addReview] = useAddReviewMutation();
  const { data: users } = useFetchUsersQuery();
  const { data: reviews } = useFetchReviewsQuery();
  const { data: authors } = useFetchAuthorsQuery();
  const { data: categories } = useFetchCategoriesQuery();

  return (
    <div>
      {/* // TODO: this will be moved to book details page. also create new modal for it with logic. */}
      <Modal>
        <BookReview
          setReviewWindow={setReviewWindow}
          activeUser={activeUser}
          addReview={addReview}
          reviewedBookId={bookToView?.id}
        />
      </Modal>
      {/* // TODO: this will be moved to it's own page */}
      <BookDetail
        bookToView={bookToView}
        reviews={reviews}
        users={users}
        activeUser={activeUser}
        categories={categories}
        authors={authors}
        addReviewModal={handleReviewWindowState}
      />
    </div>
  );
}

export default BookDetailPage;
