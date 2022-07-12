import { useFormik } from "formik";
import Input from "../Common/Input";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { reset, signupUser } from "../Feature/SignupOrLogin/SignupOrLogin";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SignupPage = () => {
  const { error, user, isSuccess } = useSelector(
    (store) => store.signupOrLogin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
    if (error) {
      toast.error(error);
    }
    if (isSuccess) {
      toast.success(`welcome ${user.name}`);
    }
    dispatch(reset());
  }, [user, error]);

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordconfirmation: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "must be at least 8 characters long"),
    passwordconfirmation: Yup.string()
      .required("Password Confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const onSubmit = (values) => {
    const { name, email, phoneNumber, password } = values;

    const user = {
      name,
      email,
      password,
      phoneNumber,
    };

    dispatch(signupUser(user));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="p-5">
      <form
        onSubmit={formik.handleSubmit}
        className=" rounded-lg flex flex-col justify-between gap-y-5 sm:p-5 sm:max-w-xl m-auto sm:border sm:shadow-xl "
      >
        <h2 className="text-center text-2xl">Sign Up</h2>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Email " name="email" formik={formik} type="email" />
        <Input
          label="Phone Number "
          name="phoneNumber"
          formik={formik}
          type="tel"
        />
        <Input
          label="Password "
          name="password"
          formik={formik}
          type="password"
        />
        <Input
          label="Password Confirmation"
          name="passwordconfirmation"
          formik={formik}
          type="password"
        />
        <button
          className="bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed py-1 rounded-sm text-white"
          disabled={!formik.isValid}
          type="submit"
        >
          SignUp
        </button>
        <Link className="text-blue-500 py-1" to="/login">
          You are already logged in ?
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
