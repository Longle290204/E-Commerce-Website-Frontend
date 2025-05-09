import Cart from '../pages/Cart/cart';
import Home from '../pages/Home/home';
import LoginForm from '../pages/Login/login';
import AdminPage from '../pages/AdminPage/AdminPage';
import Dashboard from '../pages/AdminPage/Dashboard/Dashboard';
import CreateProductPage from '../pages/AdminPage/CreateProductPage/CreateProductPage';
import ListProductPage from '../pages/AdminPage/ListProductPage/ListProductPage';
import CategoryPage from '../pages/AdminPage/CategoryPage/CategoryPages';
import CheckoutPage from '../pages/Checkout/checkout';
import CartPage from '../pages/CartPage/CartPage';
import ProductsNewPage from '../pages/ProductsNewPage/ProductsNewPage';
import ProductDetail from '../pages/ProductDetailPage/ProductDetail';

const publicRoutes = [
   { path: '/', element: Home },
   { path: '/cart', element: Cart },
   { path: '/login', element: LoginForm },
   { path: '/admin', element: Dashboard, layout: AdminPage, protected: true },
   { path: '/checkout', element: CheckoutPage },
   { path: '/cartpage', element: CartPage, protected: true },
   { path: '/collection/:slug', element: ProductsNewPage },
   { path: '/products/:slug', element: ProductDetail },

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
