import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../Feature/Products/ProductsSlice";
import { AddToCart, RemoveProduct } from "../Feature/Cart/CartSlice";
import CheckInCart from "../utils/CheckInCart";
import { toast } from "react-toastify";
import getQuantity from "../utils/GetQuantity";
import Loading from "../Components/Loading";

const HomePage = () => {
  const { loading, products, error } = useSelector((store) => store.products);
  const productInCart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const notify = () => toast.success("Add To Cart !");

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const addToCartHandler = (p) => {
    dispatch(AddToCart(p));
    notify();
  };

  if (loading) return <Loading />;

  if (error) return <p className="p-5 text-center">{error}</p>;

  return (
    <div className="container m-auto  xl:max-w-screen-xl grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 p-5">
      {products.map((p, index) => {
        return (
          <div
            key={index}
            className="flex flex-col rounded-md overflow-hidden "
          >
            <div className="aspect-w-7 aspect-h-6 border border-slate-300 overflow-hidden">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="p-3 flex flex-col bg-violet-200">
              <div className="flex justify-between mb-2.5">
                <p className="">{p.name}</p>
                <p className="">{p.price}$</p>
              </div>
              <ProductStatus
                p={p}
                productInCart={productInCart}
                addToCartHandler={addToCartHandler}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;

const ProductStatus = ({ p, productInCart, addToCartHandler }) => {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <>
      {CheckInCart(p, productInCart) ? (
        <div className=" flex flex-1 justify-center items-center gap-3">
          <button
            onClick={() => dispatch(RemoveProduct(p))}
            className="bg-violet-500 p-1 rounded-full text-white"
          >
            {getQuantity(cart, p) === 1 ? (
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
          <span className="bg-violet-400 p-4 text-white rounded-full w-6 h-6 flex justify-center items-center">
            {getQuantity(cart, p)}
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
      ) : (
        <button
          className="bg-violet-500 text-white py-1 rounded-md"
          onClick={() => addToCartHandler(p)}
        >
          Add to cart
        </button>
      )}
    </>
  );
};
