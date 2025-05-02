import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../Context/CartContext';
import axiosInstance from '../../../api/axiosInstance';
import images from '../../../assets/images/image';
import classNames from 'classnames/bind';
import styles from './Right.module.scss';

const cx = classNames.bind(styles);

function Right() {
   const cart = useContext(CartContext);

   const [countCartItem, setCountCartItem] = useState(0);

   useEffect(() => {
      const axiosProducts = async () => {
         const accessToken = localStorage.getItem('accessToken');

         const response = await axiosInstance.get(`/cart`, {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         });
         console.log('cartItem', response.data);

         // Set dữ liệu vào context
         cart.setCartItems(response.data.cartItems);
         cart.setCartTotal(response.data.cartTotal);

         // Set quantity total product
         cart.setQuantityProduct(response.data.quantityProduct);

         // Đếm số phần tử trong mảng cartItems và set count
         const countItems = cart.cartItems.reduce((countItem) => countItem + 1, 0);
         setCountCartItem(countItems);
      };

      console.log('cart total', cart.quantityTotalProduct);

      axiosProducts();
   }, [countCartItem]);

   return (
      <>
         {cart.cartItems.map((item, key) => (
            <article key={key} className="flex mb-5" aria-label="Cart Item">
               <div className="w-[120px] h-[120px] flex-none">
                  <img className="w-full h-full object-cover" src={item.product.mainImage} alt={item.product.name} />
               </div>

               <div className="flex flex-col items-stretch h-full p-1 pl-5 text-2xl gap-y-5">
                  <div className="flex">
                     <p>Giày Thể Thao Nam xanh Biti’s Hunter X LiteDash - Original Edition 2K24</p>
                  </div>

                  <div className="flex justify-between">
                     <p>
                        KÍCH CỠ: <span>7UK</span>
                     </p>
                     <span>{item.totalPrice} VNĐ</span>
                  </div>

                  <div>
                     SL: <span className={cx('quantity')}>{item.quantity}</span>
                  </div>
               </div>
            </article>
         ))}

         <hr className="border-t border-solid border-[#d3d7da] mt-9 mb-9"></hr>

         <div className="flex justify-between">
            <p>
               <span className={cx('quantity')}>{cart.quantityProduct}</span> sản phẩm
            </p>
            <span>{cart.cartTotal} đ</span>
         </div>
         <div className="flex justify-between mb-7">
            <p>Giao hàng</p>
            <span>Miễn phí</span>
         </div>

         <div className="flex justify-between items-start mt-7 mb-10">
            <div>
               <strong>Tổng</strong>
               <p className="text-gray-600 text-2xl">(Đã bao gồm thuế 1.225.926₫)</p>
            </div>
            <strong>{cart.cartTotal}₫</strong>
         </div>

         <div className="relative flex items-center bg-white justify-between">
            <input className="w-full border border-solid border-[#767677] p-5 mb-3" type="text" placeholder="" />
            <label className={cx('label-name', 'absolute block text-gray-600 text-2xl mb-1')}>Nhập mã khuyến mãi</label>

            <img className={cx('plus-icon', 'absolute w-10 h-10 font-bold cursor-pointer')} src={images.plus} alt="plus" />
         </div>
      </>
   );
}

export default Right;
