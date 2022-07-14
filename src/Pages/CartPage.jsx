import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { AddToCart, RemoveProduct } from "../Feature/Cart/CartSlice";

const CartPage = () => {
  const { cart } = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  if (!cart.length) {
    return (
      <div className="p-5 text-center">
        <p className="mb-5">Your Card is empty</p>
        <Link to="/" className="text-blue-700 hover:text-blue-400">
          Go To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="sm:flex justify-between gap-x-5 sm:p-4">
      <div className="flex flex-1 flex-col sm:flex-row justify-between p-4 sm:p-0">
        <div className=" w-full space-y-5">
          {cart.map((p) => {
            return (
              <div
                key={p._id}
                className="bg-violet-100 rounded-md overflow-hidden sm:flex sm:justify-between items-center border border-slate-300 "
              >
                <div className="sm:h-24">
                  <img className="w-full h-full" src={p.image} alt={p.name} />
                </div>
                <div className="p-2 flex flex-col sm:flex-row sm:justify-evenly sm:flex-1 gap-5">
                  <div className="flex sm:justify-evenly flex-1">
                    <div className="flex-1 flex justify-center">
                      <p>{p.name}</p>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <p>{p.offPrice * p.quantity}$</p>
                    </div>
                  </div>
                  <div className=" flex flex-1 justify-center items-center gap-3">
                    <button
                      onClick={() => dispatch(RemoveProduct(p))}
                      className="bg-violet-500 rounded-full p-1 text-white"
                    >
                      {p.quantity === 1 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-xs"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      ) : (
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
                            d="M18 12H6"
                          />
                        </svg>
                      )}
                    </button>
                    <span className="bg-violet-400 p-1 text-white rounded-full w-6 h-6 flex justify-center items-center">
                      {p.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(AddToCart(p))}
                      className="bg-violet-500 p-1 rounded-full text-white"
                    >
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-violet-200 mt-5 sm:w-96 max-h-[230px] sticky w-full bottom-0 sm:m-0 rounded-md p-2">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;

const CartSummary = () => {
  const { cart, total } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.signupOrLogin);

  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0)
    : 0;

  return (
    <>
      <div className="flex justify-between sm:block">
        <h4 className="text-2xl mb-5 text-center hidden sm:block">
          Cart Summary
        </h4>
        <div className="hidden sm:flex sm:justify-between sm:my-3">
          <p>original total price : </p>
          <p>{originalTotalPrice}$</p>
        </div>
        <div className="hidden sm:flex sm:justify-between sm:my-3">
          <p>cart discount : </p>
          <p>{originalTotalPrice - total}$</p>
        </div>
        <hr className="bg-violet-400 h-1 rounded-xl" />
        <div className=" sm:flex flex-1 sm:my-3 text-sm sm:justify-between items-center ">
          <p className="text-slate-600">Total Cart : </p>
          <p>{total}$</p>
        </div>
        <Link
          to={user ? "/checkout" : "selectform"}
          className="bg-violet-500 block text-center rounded-md sm:w-full py-1.5 px-3 text-white"
        >
          Go to checkout
        </Link>
      </div>
      <Outlet />
    </>
  );
};
