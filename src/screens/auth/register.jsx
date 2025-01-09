import { useEffect } from "react";
import { ScreenWrapper } from "../../components/wrappers/screen-wrapper";
import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../store/context-provider";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiLoader } from "react-icons/fi";
import { signUpFields } from "../../constants/form-fields-context";
import FormControlFormik from "../../components/inputs/form-control-formik";
import { register } from "../../api/services/auth-services";

const Register = () => {
  const { setUser, setToken } = useContextProvider();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setErrors }) => {
    const { error, data } = await register(values);
    if (error) return setErrors(error.errors);
    setUser({ ...data.user });
    setToken(data.token);
    navigate("/workspace");
  };

  // Auto Focus
  useEffect(() => {
    document.getElementById("full_name")?.focus();
  }, []);

  // Yup Validation Schema
  const YubSchema = Yup.object({
    full_name: Yup.string()
      .required("Your full name is required!")
      .min(3, "Full name must be at least 5 letters")
      .max(30, "Full name is too long"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required!"),
    password: Yup.string()
      .required("Your Password is required!")
      .min(4, "Password is too short, Try somethings else!")
      .max(30, "Password is too long, Try somethings else!"),
  });
  return (
    <ScreenWrapper className="bg-dark text-white min-h-screen">
      <Link to={"/"} className="btn btn-primary rounded-full mb-2">
        Go Back
      </Link>
      {/* Panel Info */}
      <div className="mx-auto max-w-xl p-6 text-center shadow-md rounded-md mb-8">
        <h3 className="relative z-10 text-xl">Create Account</h3>
        <p className="text-sm mt-1">Create your account and start annotating</p>
      </div>
      {/* CODE(Form): */}
      <div className="mx-auto max-w-sm">
        {/* <RegisterForm /> */}
        <Formik
          initialValues={{
            full_name: "",
            email: "",
            phone: "",
            password: "",
          }}
          validationSchema={YubSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => {
            return (
              <div className="w-full">
                {/* // Creating Form Inputs */}
                <Form>
                  <div className="space-y-4">
                    {signUpFields.map((field, index) => (
                      <FormControlFormik
                        key={index}
                        {...field}
                        className="bg-muted/10 p-3 border border-muted/30"
                      />
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
                          Create Account
                        </span>
                      </button>
                    </div>
                  )}
                  <div
                    className={`text-center mt-4 space-y-3 text-sm ${
                      isSubmitting ? "opacity-50 pointer-events-none" : ""
                    }`}>
                    <p>
                      Already Have an Account?{" "}
                      <Link
                        to="/login"
                        className="text-blue-500 inline-block hover:opacity-80 font-bold underline underline-offset-4">
                        Login
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </ScreenWrapper>
  );
};

export default Register;
