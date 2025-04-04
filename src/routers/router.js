import Cart from '../pages/Cart/cart';
import Home from '../pages/Home/home';
import LoginForm from '../pages/Login/login';
import AdminPage from '../pages/AdminPage/AdminPage';
import ProductAdminPage from '../pages/AdminPage/ProductAdminPage/ProductAdminPage';
import Dashboard from '../pages/AdminPage/Dashboard/Dashboard';
import CreateProductPage from '../pages/AdminPage/CreateProductPage/CreateProductPage';
import ListProductPage from '../pages/AdminPage/ListProductPage/ListProductPage';
import CategoryPage from '../pages/AdminPage/CategoryPage/CategoryPages';
import CheckoutPage from '../pages/Checkout/checkout';
import CartPage from '../pages/CartPage/CartPage';
import ProductsNewPage from '../pages/ProductsNewPage/ProductsNewPage';

const publicRoutes = [
   { path: '/', element: Home },
   { path: '/cart', element: Cart },
   { path: '/login', element: LoginForm },
   { path: '/collection/nam', element: NamCategory },
   { path: '/collection/nu', element: NuCategory },
   { path: '/admin', element: Dashboard, layout: AdminPage },
   { path: '/checkout', element: CheckoutPage },
   { path: '/cartpage', element: CartPage },
   { path: '/collection/:slug', element: ProductsNewPage },
   {
      path: '/admin/products',
      element: ProductAdminPage,
      layout: AdminPage,
   },
   {
      path: '/admin/create-product',
      element: CreateProductPage,
      layout: AdminPage,
   },
   {
      path: '/admin/list-product',
      element: ListProductPage,
      layout: AdminPage,
   },
   {
      path: '/admin/category',
      element: CategoryPage,
      layout: AdminPage,
   },
];

export { publicRoutes };
