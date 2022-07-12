import { useFormik } from "formik";
import Input from "../Common/Input";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser, reset } from "../Feature/SignupOrLogin/SignupOrLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const LoginPage = () => {
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
      toast.success(`welcome back ${user.name}`);
    }
    dispatch(reset());
  }, [user, error]);

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "must be at least 8 characters long"),
  });

  const onSubmit = (values) => {
    dispatch(loginUser(values));
  };

  const initialValues = {
    email: "",
    password: "",
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
        <h2 className="text-center text-2xl">Log In</h2>
        <Input label="Email " name="email" formik={formik} type="email" />
        <Input
          label="Password "
          name="password"
          formik={formik}
          type="password"
        />
        <button
          className="bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed py-1 rounded-sm text-white"
          disabled={!formik.isValid}
          type="submit"
        >
          LogIn
        </button>
        <Link className="text-blue-500 py-1" to="/signup">
          Still not registred ?
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
