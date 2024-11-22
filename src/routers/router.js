import Cart from "../pages/Cart/cart";
import Home from "../pages/Home/home";
import LoginForm from "../pages/Login/login";
import NamCategory from "../pages/Category/Nam/Nam";
import NuCategory from "../pages/Category/Nu/Nu";
import SandalNam from "../pages/Category/Sandal/Sandal Nam/SandalNam";
import SandalNu from "../pages/Category/Sandal/Sandal Nu/SandalNu";
import SportNam from "../pages/Category/Sport Shoes/Sport Nam/SportNam";
import SportNu from "../pages/Category/Sport Shoes/Sport Nu/SportNu";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProductAdminPage from "../pages/AdminPage/ProductAdminPage/ProductAdminPage";
import Dashboard from "../pages/AdminPage/Dashboard/Dashboard";
import CreateProductPage from "../pages/AdminPage/CreateProductPage/CreateProductPage";
import ListProductPage from "../pages/AdminPage/ListProductPage/ListProductPage";

const publicRoutes = [
    { path: "/", element: Home },
    { path: "/cart", element: Cart },
    { path: "/login", element: LoginForm },
    { path: "/collection/nam", element: NamCategory },
    { path: "/collection/nu", element: NuCategory },
    { path: "/collection/Sandal-Nam", element: SandalNam },
    { path: "/collection/Sandal-Nu", element: SandalNu },
    { path: "/collection/Sport-Nam", element: SportNam },
    { path: "/collection/Sport-Nu", element: SportNu },
    { path: "/admin", element: Dashboard, layout: AdminPage },
    {
        path: "/admin/Products",
        element: ProductAdminPage,
        layout: AdminPage,
    },
    {
        path: "/admin/create-product",
        element: CreateProductPage,
        layout: AdminPage,
    },
    {
        path: "/admin/list-product",
        element: ListProductPage,
        layout: AdminPage,
    },
];

export { publicRoutes };
