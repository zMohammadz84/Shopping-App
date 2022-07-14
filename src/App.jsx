import Layout from "./Layout/Layout";
import { useRoutes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { Provider } from "react-redux";
import { Store } from "./Feature/Store";
import CartPage from "./Pages/CartPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./Pages/ProfilePage";
import CheckOutPage from "./Pages/CheckOutPage";
import SelectForm from "./Components/SelectForm";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    {
      path: "/cart",
      element: <CartPage />,
      children: [{ path: "selectform", element: <SelectForm /> }],
    },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/checkout", element: <CheckOutPage /> },
    { path: "*", element: <NotFoundPage /> },
  ]);
  return (
    <>
      <Provider store={Store}>
        <Layout>
          <div className=" container m-auto relative xl:max-w-screen-xl">
            {routes}
          </div>
        </Layout>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
