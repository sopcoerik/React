import { Formik, Form, Field } from "formik";
import Modal from "../common/Modal";
import { useAddReviewMutation } from "../../store";

function BookReview({ isOpen, onCancel, activeUser, reviewedBookId }) {
  const [addReview] = useAddReviewMutation();

  const handleReviewSubmit = (review) => {
    console.log(review);
    addReview({
      text: review,
      createdById: Number(activeUser.id),
      bookId: Number(reviewedBookId),
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
          console.log(values);
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
              <Field as="textarea" name="review" className="border m-2 p-2" />
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
}

export default BookReview;
