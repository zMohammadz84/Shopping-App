import { Link } from "react-router-dom";
import imgNotFound from "../../assets/404.jpg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-y-5 justify-center items-center p-10">
      <Link to="/" className="text-blue-700 hover:text-blue-400">
        Go back home
      </Link>
      <div className="w-60 sm:w-96">
        <img src={imgNotFound} alt="imgNotFound" />
      </div>
      <p>Page not Found</p>
    </div>
  );
};

export default NotFoundPage;
