import { createPortal } from "react-dom";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

function BookReview({
  setReviewWindow,
  activeUser,
  addReview,
  reviewedBookId,
}) {
  const [review, setReview] = useState("");

  const theme = useTheme();

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    addReview({
      text: review,
      createdById: activeUser.id,
      bookId: reviewedBookId,
    });

    setReviewWindow();
  };

  return createPortal(
    <div
      className={`absolute w-3/6 h-2/6 border border-gray-300 rounded-xl top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ${
        theme === "dark" ? theme : "bg-white"
      } flex flex-col items-center justify-around`}
    >
      <div className="header w-full border-b border-slate-300">
        <div
          className="flex justify-end"
          onClick={() => setReviewWindow(false)}
        >
          <div className="x-boss px-4 py-1 relative flex h-8 cursor-pointer">
            <div className="x absolute w-0.5 h-5 top-2/4 left-2/4 bg-gray-300 rotate-45 -translate-x-2/4 -translate-y-2/4" />
            <div className="x absolute w-0.5 h-5 top-2/4 left-2/4 bg-gray-300 -rotate-45 -translate-x-2/4 -translate-y-2/4" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h1 className="text-xl font-bold">Give Your Opinion</h1>
      </div>
      <div className="w-3/4 h-5/6">
        <form className="flex flex-col justify-around items-center w-full h-full">
          <div className="w-full h-2/4">
            <textarea
              className={`border ${
                theme === "dark" ? theme : "bg-slate-50"
              } rounded-lg w-full h-full p-4 outline-0`}
              value={review}
              onChange={handleReviewChange}
            ></textarea>
          </div>
          <div>
            <button
              className="border rounded py-1 px-3 mb-5 transition-all hover:bg-green-300 hover:text-white"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("review-root")
  );
}

export default BookReview;
