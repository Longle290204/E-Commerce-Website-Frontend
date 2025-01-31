import axios from 'axios';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './shoppingCart.module.scss';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../../Context/CartContext';
import isTokenValid from '../../../../../guards/IsTokenValid';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const cx = classNames.bind(styles);

function MiniCart() {
   // const [cartItems, setCartItems] = useState([]);
   const [countCartItem, setCountCartItem] = useState(0);

   const navigate = useNavigate();

   const cart = useContext(CartContext);

   useEffect(() => {
      const axiosProducts = async () => {
         const accessToken = localStorage.getItem('accessToken');
         const currentTime = Date.now() / 1000;

         const response = await axiosInstance.get(`http://localhost:3002/cart`, {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         });
         console.log(response);

         console.log(currentTime);
         console.log(new Date(1738319163 * 1000).toLocaleString());

         cart.setCartItems(response.data);
         // Đếm số lần phần tử trong mảng cartItems và set count
         const countItems = cart.cartItems.reduce((countItem) => countItem + 1, 0);
         setCountCartItem(countItems);
         // setCartItems();
      };

      axiosProducts();
   }, [countCartItem]);

   const updateSubTotal = cart.cartItems.reduce((total, currentItem) => total + Number(currentItem.product.price), 0);

   const handleDeleteItemCart = async (productId) => {
      try {
         await axios.delete(`http://localhost:3002/cart/${productId}`);
         setCountCartItem((prevCount) => prevCount + 1);
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <section
         className="pt-7 pr-7 pl-7 pb-7"
         style={{ boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
         aria-label="Mini Cart"
      >
         <header className={cx('cart-header')}>
            <h2 className="font-medium text-[1.8rem]">GIỎ HÀNG</h2>
         </header>
         <hr className="flex w-full h-[2px] bg-[rgb(200,_200,_200)]" />
         <div className={cx('scroll-container', 'max-h-[363px] overflow-auto')} aria-label="Cart Items">
            {/* Product Items */}
            {cart.cartItems.map((item) => (
               <article
                  className="flex items-center px-[0] py-[15px] gap-7 h-auto border-b border-[rgb(172, 171, 171)]"
                  key={item.id}
                  aria-label="Cart Item"
               >
                  <Link to="/" className={cx('cart-item-image-link')}>
                     <img
                        className="w-[90px] h-[90px] object-cover"
                        src={item.product.imageURL}
                        alt={item.product.name}
                     />
                  </Link>
                  <div className="max-w-md">
                     <Link to="/" className={cx('cart-item-name-link')}>
                        <h3
                           className="font-normal text-2xl text-[#000] cursor-pointer hover:font-medium"
                           aria-label="Product Name"
                        >
                           {item.product.name}
                        </h3>
                     </Link>
                     <div className="flex justify-around">
                        <p className="px-[6px] py-px mr-[20px] bg-[#f1efef]" aria-label="Quantity">
                           {item.quantity}
                        </p>
                        <p className="text-[1.4rem] font-bold text-[#000]" aria-label="Price">
                           {item.product.price} ₫
                        </p>
                        <button
                           className="text-xl font-medium underline cursor-pointer ml-auto mr-[10px]"
                           onClick={() => handleDeleteItemCart(item.id)}
                           aria-label={`Remove ${item.product.name} from cart`}
                        >
                           Xóa
                        </button>
                     </div>
                  </div>
               </article>
            ))}
         </div>
         {/* <hr className={cx('horizontal-line', 'flex w-full h-[2px] bg-[rgb(200,_200,_200)]')} /> */}
         <footer className="mt-[15px]">
            <div className="flex justify-between">
               <span className="text-[1.6rem]">Tổng tiền:</span>
               <span className="text-[1.6rem] font-bold" aria-label="Total Amount">
                  {updateSubTotal.toLocaleString('vi-VN')} ₫
               </span>
            </div>
            <div className="flex justify-between mt-[10px]">
               <Link
                  to="/"
                  className="flex items-center px-[28px] py-[3px] bg-[#fff] text-[1.2rem] text-[#000] hover:bg-[#d4d4d4]"
                  aria-label="View Cart"
               >
                  XEM GIỎ HÀNG
               </Link>
               <Link
                  to="/"
                  className="flex items-center px-[28px] py-[3px] bg-[#000] text-[1.2rem] text-[#fff] hover:bg-[#424242] hover:border border-[1px] border-solid border-[#424242]"
                  aria-label="Checkout"
               >
                  THANH TOÁN
               </Link>
            </div>
         </footer>
      </section>
   );
}

export default MiniCart;
