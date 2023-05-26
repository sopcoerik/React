import { createPortal } from "react-dom";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";

import { useTheme } from "../../hooks/useTheme";

import {
  useDeleteReviewMutation,
  useEditReviewMutation,
} from "../../store/apis/reviewsApi";
import { useState } from "react";
import Button from "../common/Button";

function BookDetail({
  handleBookDetailWindowState,
  bookToView,
  reviews,
  users,
  activeUser,
  categories,
  authors,
  addReviewModal,
}) {
  const theme = useTheme();

  const viewedBookReviews = reviews?.filter(
    (review) => review.bookId === bookToView?.id
  );

  const category = categories?.find(
    (category) => category.id === bookToView?.categoryId
  );

  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [editInput, setEditInput] = useState("");

  const [deleteReview] = useDeleteReviewMutation();
  const [editReview] = useEditReviewMutation();

  const handleEditReview = (review) => {
    if (!reviewToEdit) {
      setReviewToEdit(review);
      setEditInput(review.text);
    } else {
      setReviewToEdit(null);
      setEditInput(null);
    }
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    editReview({
      id: reviewToEdit.id,
      newReview: {
        text: editInput,
        createdById: activeUser.id,
        bookId: bookToView.id,
      },
    });
    setReviewToEdit(null);
    setEditInput(null);
  };

  const author = authors?.find((author) => author.id === bookToView?.authorId);

  const renderedReviews = viewedBookReviews?.map((review) => {
    const user = users?.find((user) => user.id === review.createdById);
    return (
      <div
        key={review.id}
        className="w-full border py-1 px-1 h-28 overflow-auto"
      >
        <p className="font-bold">{user.name}</p>
        <div className="pl-2 relative">
          <form onSubmit={handleEditFormSubmit}>
            <textarea
              className="w-full h-full bg-inherit overflow-auto"
              disabled={!reviewToEdit || reviewToEdit.id !== review.id}
              value={
                (reviewToEdit?.createdById === review.createdById &&
                  reviewToEdit.id === review.id &&
                  editInput) ||
                review.text
              }
              onChange={handleEditInputChange}
            ></textarea>
            {reviewToEdit === review && editInput && (
              <button className="border p-0.5 bg-white text-xs absolute -bottom-10 right-0 -translate-x-2/4 -translate-y-2/4">
                Save
              </button>
            )}
          </form>
        </div>
        {activeUser.id === user.id && (
          <div className="flex gap-1 mt-2">
            <div className="flex justify-end">
              <button
                className="border p-0.5"
                onClick={() => handleEditReview(review)}
              >
                <MdModeEditOutline />
              </button>
            </div>
            <div className="flex justify-end">
              <button
                className="border p-0.5"
                onClick={() => deleteReview(review.id)}
              >
                <BsTrashFill />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  });

  return createPortal(
    <div
      className={`absolute w-5/6 h-4/6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 border border-gray-400 ${
        theme === "dark" ? theme : "bg-slate-50"
      } overflow-hidden`}
    >
      <div className="header w-full border-b border-slate-300">
        <div className="flex justify-end">
          <div
            className="x-boss px-4 py-1 relative flex h-8 cursor-pointer"
            onClick={handleBookDetailWindowState}
          >
            <div className="x absolute w-0.5 h-5 top-2/4 left-2/4 bg-gray-300 rotate-45 -translate-x-2/4 -translate-y-2/4" />
            <div className="x absolute w-0.5 h-5 top-2/4 left-2/4 bg-gray-300 -rotate-45 -translate-x-2/4 -translate-y-2/4" />
          </div>
        </div>
      </div>

      <div className="h-full flex items-center">
        <div className="w-full h-5/6 flex justify-around items-center">
          <div className="h-full w-2/4 p-12">
            <div className="w-full h-1/6 border-b border-gray-300 mt-2">
              <h3 className="text-lg font-bold">
                Title: <p className="font-light italic">{bookToView?.title}</p>
              </h3>
            </div>
            <div className="w-full h-1/6 border-b border-gray-300 mt-2">
              <h3 className="text-lg font-bold">
                Author: <p className="font-light">{author?.name}</p>
              </h3>
            </div>
            <div className="w-full h-1/6 border-b border-gray-300 mt-2">
              <h3 className="text-lg font-bold">
                Category: <p className="font-light">{category?.name}</p>
              </h3>
            </div>
            <div className="w-full h-1/6 border-b border-gray-300 mt-2">
              <h3 className="text-lg font-bold">
                Description:
                <p className="pl-3 font-light">{bookToView?.description}</p>
              </h3>
            </div>
          </div>
          <div className="vr h-full w-0.5 bg-gray-100" />
          <div className="h-full w-2/4 px-3  pb-10">
            <div className="text-center">
              <h1 className="text-xl">Reviews On This Book</h1>
            </div>
            <div className="p-3 w-full h-full border flex flex-col gap-5 overflow-auto ">
              <>{renderedReviews}</>
              <div className="flex justify-end">
                <Button primary onClick={() => addReviewModal(bookToView?.id)}>
                  + Add Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("review-root")
  );
}

export default BookDetail;
