import { Formik, Form } from "formik";
import Modal from "../common/Modal";

function BookReview({
  isOpen,
  onCancel,
  activeUser,
  addReview,
  reviewedBookId,
}) {
  const handleReviewSubmit = (review) => {
    addReview({
      text: review,
      createdById: activeUser.id,
      bookId: reviewedBookId,
    });

    onCancel();
  };
  const formInitialValues = {
    review: "",
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values, actions) => {
          handleReviewSubmit(values.review);
          actions.resetForm({
            values: {
              review: "",
            },
          });
        }}
      >
        {({ handleSubmit }) => (
          <Modal
            isOpen={isOpen}
            onOk={handleSubmit}
            onCancel={onCancel}
            headerText={`Give Your Opinion`}
          >
            <Form className="flex flex-col gap-2 px-3 my-2">
              <label className="font-bold">Enter Review</label>
              <textarea
                className="border outline-none"
                name="review"
              ></textarea>
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
}

export default BookReview;
