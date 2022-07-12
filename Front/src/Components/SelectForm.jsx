import { Link } from "react-router-dom";

const SelectForm = () => {
  return (
    <div className="flex  justify-between mt-5">
      <Link
        className=" px-5 py-1.5 bg-violet-500 text-white rounded-md"
        to="/login?redirect=/checkout"
      >
        Log in{" "}
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
