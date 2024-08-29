import DefaultLayout from "../layouts/DefaultLayout/defaultLayout";
import Cart from "../pages/Cart/cart";
import Home from "../pages/Home/home";

const publicRoutes = [
    { path: "/", element: DefaultLayout },
    { path: "/home", element: Home },
    { path: "/cart", element: Cart },
];

export { publicRoutes };
