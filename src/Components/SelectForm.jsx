import { Link, useNavigate } from "react-router-dom";

const SelectForm = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex sm:justify-between justify-evenly items-center mt-5 sm:static sm:bg-transparent fixed -inset-5 bg-slate-300/50"
    >
      <Link
        className=" px-5 py-1.5 bg-violet-500 text-white rounded-md"
        to="/login?redirect=/checkout"
      >
        Log in
      </Link>
      <Link
        className=" px-5 py-1.5 bg-violet-500 text-white rounded-md"
        to="/signup?redirect=/checkout"
      >
        Sign up
      </Link>
    </div>
  );
};

export default SelectForm;
