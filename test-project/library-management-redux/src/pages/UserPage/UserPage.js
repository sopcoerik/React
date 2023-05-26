import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../hooks/useTheme";
import { useUpdateUserMutation } from "../../store";
import { useNavigate } from "react-router-dom";
import { removeActiveUser } from "../../store/slices/activeUserSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { HiCheck } from "react-icons/hi";
import { Formik, Form } from "formik";
import * as Yup from "yup";

function UserPage() {
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const theme = useTheme();

  const [updateUser] = useUpdateUserMutation();

  if (!activeUser) {
    return (
      <div className="container mx-auto text-center py-10 text-xl font-bold">
        Please Log In
      </div>
    );
  }

  const EditSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(12, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string("Passwords must match")
      .oneOf([Yup.ref("password"), null], "Passwords must match!")
      .required("Required"),
  });

  return (
    <div className={"container mx-auto"}>
      {activeUser && (
        <div
          className={`w-full p-3 ${theme === "dark" ? theme : "bg-slate-50"}`}
        >
          <div className="text-center border-b">
            <h1 className="font-bold text-2xl py-3">Your Profile</h1>
          </div>
          <div>
            <Formik
              initialValues={{
                name: activeUser.name,
                email: activeUser.email,
                password: activeUser.password,
                confirmPassword: "",
              }}
              validationSchema={EditSchema}
              onSubmit={(values, { resetForm }) => {
                updateUser({
                  id: activeUser.id,
                  updatedUser: { ...activeUser, ...values },
                });

                resetForm({
                  values: {
                    name: activeUser.name,
                    email: activeUser.email,
                    password: activeUser.password,
                    confirmPassword: "",
                  },
                });
              }}
            >
              <Form className="flex flex-col gap-5">
                <Input label="Name" name="name" type="text" />

                <Input label="Email" type="email" name="email" />

                <Input label="Password" type="password" name="password" />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                />

                <div>
                  <Button primary icon={<HiCheck />} type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
