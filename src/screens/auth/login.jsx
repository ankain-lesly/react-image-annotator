import { ScreenWrapper } from "../../components/wrappers/screen-wrapper";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useContextProvider } from "../../store/context-provider";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiLoader } from "react-icons/fi";
import { loginFields } from "../../constants/form-fields-context";
import FormControlFormik from "../../components/inputs/form-control-formik";
import toast from "react-hot-toast";
import { login } from "../../api/services/auth-services";
import { useContextProvider } from "../../store/context-provider";

const Login = () => {
  const { setUser, setToken, user } = useContextProvider();
  const navigate = useNavigate();

  if (user) return <Navigate to={"/workspace"} />;

  const handleSubmit = async (values, { setErrors }) => {
    const { error, data } = await login(values);
    if (error) return setErrors(error.errors);
    setUser({ ...data.user });
    setToken(data.token);
    const name = data.user.name;
    toast.success("Welcome back " + name.split(" ").pop());
    navigate("/workspace");
  };

  // Yup Validation Schema
  const YubSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(4, "Password is too short, Try somethings else!")
      .max(30, "Password is too long, Try somethings else!"),
  });
  return (
    <ScreenWrapper className="bg-dark text-white min-h-screen">
      <Link to={"/"} className="btn btn-primary rounded-full mb-2">
        Go Back
      </Link>
      <div className="mx-auto max-w-xl p-6 text-center shadow-md rounded-md mb-8">
        <h3 className="relative z-10 text-2xl">Log In</h3>
        <p className="text-sm mt-1">Please login to continue..</p>
      </div>
      {/* CODE(Form): */}
      <div className="mx-auto max-w-sm">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={YubSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => {
            return (
              <Form>
                <div className="space-y-3">
                  {loginFields.map((field, index) => (
                    <FormControlFormik key={index} {...field} />
                  ))}
                </div>
                {/* <FormControl /> */}
                {/* Actions */}
                {isSubmitting && (
                  <div className="flex items-center  justify-center text-danger mt-4">
                    <FiLoader className="text-3xl animate-spin" />
                  </div>
                )}
                {!isSubmitting && (
                  <div className="control mt-10 text-center">
                    <button
                      className="btn flex-center btn-blue mx-auto w-full p-3 rounded-md text-white font-bold"
                      type="submit">
                      <span className="inline-block flex-shrink-0 text-wrap">
                        Login
                      </span>
                    </button>
                  </div>
                )}

                <div
                  className={`text-center mt-4 space-y-3 text-sm ${
                    isSubmitting ? "opacity-50 pointer-events-none" : ""
                  }`}>
                  <p>
                    Don't have an account{" "}
                    <Link
                      to="/register"
                      className="text-blue-500 inline-block hover:opacity-80 font-bold underline underline-offset-4">
                      Sign Up
                    </Link>
                  </p>
                  <p>
                    Forgot Your Password?{" "}
                    <Link
                      to={`#`}
                      className="text-blue-500 inline-block hover:opacity-80 font-bold underline underline-offset-4">
                      Reset here
                    </Link>
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ScreenWrapper>
  );
};

export default Login;
