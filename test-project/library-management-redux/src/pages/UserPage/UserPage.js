import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../hooks/useTheme";
import { useUpdateUserMutation } from "../../store";
import { useNavigate } from "react-router-dom";
import { removeActiveUser } from "../../store/slices/activeUserSlice";
import Input from "../../components/utils/Input";

import { Formik, Form, Field, ErrorMessage } from "formik";
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

                navigate("/login");
                dispatch(removeActiveUser());

                resetForm({
                  values: {
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  },
                });
              }}
            >
              <Form className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <div>
                    <label className="text-xl font-bold">Name</label>
                  </div>
                  <Field type="text" name="name" className="py-1 px-2" />
                  <ErrorMessage name="name" />
                </div>

                <div className="flex flex-col">
                  <div>
                    <label className="text-xl font-bold">Email</label>
                  </div>
                  <Field type="email" name="email" className="py-1 px-2" />
                  <ErrorMessage name="email" />
                </div>

                <div className="flex flex-col">
                  <div>
                    <label className="text-xl font-bold">Password</label>
                  </div>
                  <Field
                    type="password"
                    name="password"
                    className="py-1 px-2"
                  />
                  <ErrorMessage name="password" />
                </div>

                <div className="flex flex-col">
                  <div>
                    <label className="text-xl font-bold">
                      Confirm Password
                    </label>
                  </div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="py-1 px-2"
                    component={Input}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    render={(message) => (
                      <p className="text-red-300">{message}</p>
                    )}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="border rounded py-1 px-3 hover:bg-slate-100"
                  >
                    Save Changes
                  </button>
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
