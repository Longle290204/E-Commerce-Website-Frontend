import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../api/axiosInstance';
import images from '../../assets/images/image';
import PropTypes from 'prop-types';

function CartPage(props) {
   const cart = useContext(CartContext);

   const [countCartItem, setCountCartItem] = useState(0);

   // Input value quantity
   const [inputValue, setInputValue] = useState(1);

   useEffect(() => {
      const axiosProducts = async () => {
         const accessToken = localStorage.getItem('accessToken');

         const response = await axiosInstance.get(`http://localhost:3002/cart`, {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         });

         cart.setCartItems(response.data);
         // Đếm số phần tử trong mảng cartItems và set count
         const countItems = cart.cartItems.reduce((countItem) => countItem + 1, 0);
         setCountCartItem(countItems);
      };

      axiosProducts();
   }, [countCartItem]);

   const handleDeleteItemCart = async (productId) => {
      try {
         await axios.delete(`http://localhost:3002/cart/${productId}`);
         setCountCartItem((prevCount) => prevCount + 1);
      } catch (error) {
         console.log(error.message);
      }
   };

   // Quantity of products
   const handleQuantity = (method) => {
      setInputValue((prev) => {
         if (method === 'plus') return prev === '' ? 1 : prev + 1;
         if (method === 'minus') return prev > 1 ? prev - 1 : prev;
         return prev;
      });
   };

   return (
      <div className="container mt-20">
         {/* Right */}
         <div className="grid grid-cols-12">
            <div className="col-span-7">
               <div className="mb-20">
                  <h1 className="text-[3.6rem] text-[#000] font-semibold mb-2">GIỎ HÀNG CỦA BẠN</h1>
                  <p className="font-sans text-[17px] mb-2">
                     TỔNG CỘNG (2 các sản phẩm) <strong>4.100.000₫</strong>
                  </p>
                  <p className="font-sans text-[17px]">
                     Các mặt hàng trong giỏ hàng của bạn không được bảo lưu — hãy kiểm tra ngay để đặt hàng.
                  </p>
               </div>
               <div>
                  <div>
                     {cart.cartItems.map((item, key) => (
                        <article key={key} className="flex border border-solid border-[#808080] mb-10" aria-label="Cart Item">
                           <Link to="/">
                              <img
                                 className="w-[200px] h-[200px] object-cover"
                                 src={item.product.mainImage}
                                 alt={item.product.name}
                              />
                           </Link>
                           <div>
                              <div className="flex flex-col justify-between p-8 h-full">
                                 <div className="flex">
                                    <p>Giày Thể Thao Nam xanh Biti’s Hunter X LiteDash - Original Edition 2K24</p>
                                 </div>

                                 <div className="flex justify-between">
                                    <p>
                                       KÍCH CỠ: <span>7UK</span>
                                    </p>
                                    <span>1.200.000 VNĐ</span>
                                 </div>
                                 <div className="flex justify-between">
                                    <div className="flex">
                                       <button
                                          className="w-14 border-t border-b border-l border-[#808080]"
                                          data-type="minus"
                                          onClick={() => handleQuantity('minus')}
                                       >
                                          -
                                       </button>
                                       <input
                                          type="text"
                                          id="quantity"
                                          name="quantity"
                                          value={inputValue}
                                          min="1"
                                          onChange={(e) => {
                                             const value = Number(e.target.value);
                                             setInputValue(value >= 1 ? value : ''); // Không cho nhập số nhỏ hơn 1
                                          }}
                                          className="w-16 text-center border outline-none [&::-webkit-inner-spin-button]:appearance-none 
                                  [&::-webkit-outer-spin-button]:appearance-none 
                                  [appearance:textfield]"
                                       />
                                       <button
                                          className="w-14 border-t border-b border-r border-[#808080]"
                                          data-type="plus"
                                          onClick={() => handleQuantity('plus')}
                                       >
                                          +
                                       </button>
                                    </div>
                                    <button
                                       className="hover:underline transform transition-transform duration-200 hover:scale-105"
                                       onClick={() => handleDeleteItemCart(item.id)}
                                       aria-label={`Remove ${item.product.name} from cart`}
                                    >
                                       Xóa
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </article>
                     ))}
                  </div>
               </div>
            </div>

            {/* Left */}
            <div className="col-span-5 ml-[70px]">
               <h2 className="text-[2.3rem] text-[#000000] font-semibold mb-2">THÔNG TIN ĐƠN HÀNG</h2>

               <div className="flex justify-between mt-7">
                  <p>2 sản phẩm</p>
                  <span>16.500.000đ</span>
               </div>
               <div className="flex justify-between mb-7">
                  <p>Giao hàng</p>
                  <span>Miễn phí</span>
               </div>

               <div className="flex justify-between items-start mt-7 mb-20">
                  <div>
                     <strong>Tổng</strong>
                     <p className="text-gray-500 ">(Đã bao gồm thuế 1.225.926₫)</p>
                  </div>
                  <strong>16.550.000₫</strong>
               </div>

               <div className="flex items-center p-5 bg-white justify-between border border-solid border-[#808080]">
                  <input className="border-none outline-none" type="text" placeholder="Nhập mã khuyễn mãi" />
                  <img className="w-10 h-10 font-bold cursor-pointer" src={images.plus} alt="plus" />
               </div>

               <div className="flex p-6 bg-black items-center justify-between mt-14">
                  <button className="text-white text-2xl">THANH TOÁN</button>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="white"
                     className="size-12 cursor-pointer"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
               </div>

               <p className="text-[1.3rem] font-semibold mt-14 mb-8">PHƯƠNG THỨC THANH TOÁN ĐƯỢC CHẤP NHẬN</p>
               <div className="flex">
                  <img
                     width="42"
                     height="30"
                     alt="CASH_ON_DELIVERY"
                     src={
                        'https://www.adidas.com.vn/static/checkout/react/9876ada/assets/img/accepted-payment-methods/icon-adidas-cash_on_delivery.svg'
                     }
                     style={{ margin: '8px 8px 8px 0px' }}
                  ></img>
                  <img
                     width="42"
                     height="30"
                     alt="mastercard"
                     src="https://www.adidas.com.vn/static/checkout/react/9876ada/assets/img/accepted-payment-methods/icon-adidas-mastercard.svg"
                     style={{ margin: '8px 8px 8px 0px' }}
                  ></img>
                  <img
                     width="58"
                     height="30"
                     alt="visa"
                     src="https://www.adidas.com.vn/static/checkout/react/9876ada/assets/img/accepted-payment-methods/icon-adidas-visa.svg"
                     style={{ margin: '8px 8px 8px 0px' }}
                  ></img>
               </div>
            </div>
         </div>
      </div>
   );
}

CartPage.propTypes = {};

export default CartPage;
