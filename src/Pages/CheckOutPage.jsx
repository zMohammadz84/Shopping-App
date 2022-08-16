import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const { cart, total } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.signupOrLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (!cart.length) {
      navigate("/");
    }
  }, [user, cart]);

  return (
    <div className="sm:flex sm:p-5 gap-x-10">
      <div className="px-3 flex justify-between mt-2 sm:hidden">
        <p>Name : </p>
        <p>{user.name}</p>
      </div>
      <div className="p-4 flex-1 sm:p-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {cart.map((p) => {
          return (
            <div className="relative outline outline-violet-200 rounded-sm max-w-[150px] h-32">
              <img src={p.image} alt={p.name} className="w-full h-full" />
              <span className="absolute right-2 bottom-2 text-white bg-violet-400 w-5 h-5 rounded-full flex justify-center items-center">
                {p.quantity}
              </span>
            </div>
          );
        })}
      </div>
      <div className=" bg-violet-200 rounded-md w-full fixed sm:sticky bottom-0 gap-x-10 flex justify-between p-2  sm:right-0 sm:top-0 sm:flex-col sm:max-w-[250px] max-h-36 sm:min-h-[9rem]">
        <div className="text-sm sm:flex justify-between hidden">
          <p className="text-slate-500">Name : </p>
          <p> {user.name}</p>
        </div>
        <div className="text-sm sm:flex justify-between hidden">
          <p className="text-slate-500">Email : </p>
          <p> {user.email}</p>
        </div>
        <div className="text-sm sm:flex justify-between">
          <p className="text-slate-500">Total Price : </p>
          <p> {total}$</p>
        </div>
        <button className="bg-violet-500 rounded-md text-white w-2/4 sm:w-full sm:py-1">
          Buy
        </button>
      </div>
    </div>
  );
};

export default CheckOutPage;
