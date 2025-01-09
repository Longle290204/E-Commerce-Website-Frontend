import axios from 'axios';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './shoppingCart.module.scss';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../../context/CartContext';

const cx = classNames.bind(styles);

function ShoppingCart() {
   // const [cartItems, setCartItems] = useState([]);
   const [countCartItem, setCountCartItem] = useState(0);
   const cart = useContext(CartContext);
   useEffect(() => {
      const axiosProducts = async () => {
         try {
            const response = await axios.get(`http://localhost:3002/cart`);
            cart.setCartItems(response.data);
            // Đếm số lần phần tử trong mảng cartItems và set count
            const countItems = cart.cartItems.reduce((countItem) => countItem + 1, 0);
            setCountCartItem(countItems);
            // setCartItems();
         } catch (error) {
            console.log(error.message);
         }
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
      <section className={cx('cart-mini')}>
         <p className={cx('cart_title')}>GIỎ HÀNG</p>
         <span className={cx('horizontal-line')}></span>
         <div className={cx('cart_item-wrap')}>
            {cart.cartItems.map((item) => (
               <article className={cx('cart_item')} key={item.id}>
                  <Link to="/">
                     <img className={cx('cart_item-image')} src={item.product.imageURL} alt={item.product.name} />
                  </Link>
                  <div className={cx('cart_item-details')}>
                     <Link to="/">
                        <p className={cx('cart_item-name')}>{item.product.name}</p>
                     </Link>
                     <div className={cx('cart_item-info')}>
                        <p className={cx('cart_item-quantity')}>{item.quantity}</p>
                        <p className={cx('cart_item-price')}>{item.product.price} ₫</p>
                        <span className={cx('delete-item')} onClick={() => handleDeleteItemCart(item.id)}>
                           XÓA
                        </span>
                     </div>
                  </div>
               </article>
            ))}
         </div>
         <span className={cx('horizontal-line')}></span>
         <div className={cx('cart-summary')}>
            <div className={cx('total-amount')}>
               <span className={cx('total-label')}>TỔNG TIỀN:</span>
               <span className={cx('total-price')}>{updateSubTotal.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className={cx('cart-actions')}>
               <Link to="/" className={cx('btn', 'cart-view')}>
                  XEM GIỎ HÀNG
               </Link>
               <Link to="/" className={cx('btn', 'checkout')}>
                  THANH TOÁN
               </Link>
            </div>
         </div>
      </section>
   );
}

export default ShoppingCart;
