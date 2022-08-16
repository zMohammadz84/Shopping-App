import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../Feature/SignupOrLogin/SignupOrLogin";
import { toast } from "react-toastify";

const Navbar = () => {
  const { cart } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.signupOrLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/login");
    toast.success("Logout was successful");
  };

  return (
    <header className="bg-slate-500 sticky top-0 z-50">
      <nav className="flex justify-between text-white container m-auto xl:max-w-screen-xl ">
        <div className="flex justify-center items-center">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white p-3 relative"
                : "text-slate-400 p-3 relative"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white p-3 relative"
                : "text-slate-400 p-3 relative"
            }
            to="/cart"
          >
            <span className="rounded-full w-5 h-5 font-bold text-xs flex justify-center items-center bg-violet-600 text-white absolute top-1 right-1">
              {cart.length}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </NavLink>
        </div>
        {user ? (
          <div className="flex justify-center items-center">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white p-3 relative"
                  : "text-slate-400 p-3 relative"
              }
              to="/profile"
            >
              Profile
            </NavLink>
            <button
              className="text-slate-400 p-3 relative"
              onClick={() => logoutHandler()}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white p-3 relative"
                  : "text-slate-400 p-3 relative"
              }
              to="/login"
            >
              Log in
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white p-3 relative"
                  : "text-slate-400 p-3 relative"
              }
              to="/signup"
            >
              Sign up
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
