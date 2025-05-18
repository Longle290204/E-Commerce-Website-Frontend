import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAxiosInstance } from '../../api/axiosInstance';
import images from '../../assets/images/image';
import styles from './CartPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CartPage() {
   const cart = useContext(CartContext);
   const [inputValues, setInputValues] = useState({});

   const [countCartItem, setCountCartItem] = useState(0);

   const axiosInstance = useAxiosInstance();

   // Get data cart
   useEffect(() => {
      const axiosProducts = async () => {
         const response = await axiosInstance.get(`/cart`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
         });

         console.log('data test', response.data);
         // Set data
         cart.setCartItems(response.data.cartItems);

         // Quantity total product
         cart.setQuantityProduct(response.data.quantityProduct);

         console.log('cartItems', cart.cartItems);

         // Đếm số phần tử trong mảng cartItems và set count
         const countItems = cart.cartItems.reduce((countItem) => countItem + 1, 0);
         setCountCartItem(countItems);
      };

      axiosProducts();
   }, [countCartItem]);

   // Update quantity
   const updateQuantity = (id, change, size) => {
      cart.setCartItems((prev) =>
         prev.map((item) =>
            item.product.id === id && item.size === size ? { ...item, quantity: item.quantity + change } : item,
         ),
      );
   };

   const handleIncrease = async (id, size) => {
      // Cập nhật state để hiển thị ngay lập tức khi click
      updateQuantity(id, 1, size);
      try {
         await axios.post(
            `http://localhost:3002/cart/increase-quantity`,
            { productId: id, size: size },
            {
               headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            },
         );
      } catch (error) {
         updateQuantity(id, 1, size);
      }

      // Cập nhật state để useEffect được gọi lại
   };

   const handleInputChange = (value, productId, size) => {
      const newQuantity = value;

      console.log('newQuantity', newQuantity);
      console.log('productId', productId);

      // Tạo key dạng "productId-size" để phân biệt từng sản phẩm theo size
      const key = `${productId}-${size}`;

      setInputValues((prev) => ({
         ...prev,
         [key]: newQuantity, // Cập nhật giá trị mới cho productId
      }));

      axios
         .post(
            'http://localhost:3002/cart/input-quantity',
            {
               productId,
               quantity: newQuantity,
               size: size,
            },
            {
               headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            },
         )
         .catch((error) => console.log(error.message));
   };

   const handleDecrease = async (id, size) => {
      // Cập nhật state để hiển thị ngay lập tức khi click
      updateQuantity(id, -1, size);

      try {
         await axios.post(
            `http://localhost:3002/cart/decrease-quantity`,
            { productId: id, size },
            {
               headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            },
         );
      } catch (error) {
         updateQuantity(id, 1, size);
      }
   };

   // Delete item
   const handleDeleteItemCart = async (productId) => {
      try {
         await axiosInstance.delete(`/cart/${productId}`);
         setCountCartItem((prevCount) => prevCount + 1);
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <div className="container mt-20">
         <div className="grid grid-cols-12">
            {/* Right */}
            <div className="col-span-7">
               <div className="mb-20">
                  <h1 className="text-[3.6rem] text-[#000] font-semibold mb-2">GIỎ HÀNG CỦA BẠN</h1>
                  <p className="font-sans text-[17px] mb-2">
                     TỔNG CỘNG (<strong>{cart.quantityProduct}</strong> sản phẩm) <strong>${cart.cartTotal}</strong>
                  </p>
                  <p className="font-sans text-[17px]">
                     Các mặt hàng trong giỏ hàng của bạn không được bảo lưu — hãy kiểm tra ngay để đặt hàng.
                  </p>
               </div>

               {/* Phần sản phẩm */}
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
                                    KÍCH CỠ: <span>{item.size}</span>
                                 </p>
                                 <span>{item.totalPrice.toLocaleString('vi-VN')}</span>
                              </div>

                              <div className="flex justify-between">
                                 {/* Increase and decrease Quantity */}
                                 <div className="flex">
                                    <button
                                       className="w-14 border-t border-b border-l border-[#808080]"
                                       data-type="minus"
                                       onClick={() => handleDecrease(item.product.id, item.size)}
                                    >
                                       -
                                    </button>
                                    <input
                                       type="text"
                                       id="quantity"
                                       name="quantity"
                                       value={inputValues[`${item.product.id}-${item.size}`] ?? item.quantity} // Kiểm tra nếu chưa nhập thì dùng giá trị từ item.quantity}
                                       className="w-16 text-center border outline-none [&::-webkit-inner-spin-button]:appearance-none 
                                  [&::-webkit-outer-spin-button]:appearance-none 
                                  [appearance:textfield]"
                                       min="1"
                                       onChange={(e) => {
                                          const value = Number(e.target.value);
                                          handleInputChange(value >= 1 ? value : '', item.product.id, item.size); // Không cho nhập số nhỏ hơn 1
                                       }}
                                    />
                                    <button
                                       className="w-14 border-t border-b border-r border-[#808080]"
                                       data-type="plus"
                                       onClick={() => handleIncrease(item.product.id, item.size)}
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

               <div>
                  <label className="block">Ghi chú</label>
                  <textarea
                     className="placeholder:font-sans placeholder:text-gray-600 placeholder:text-2xl w-full h-[150px] bg-[#f4f4f4] rounded-2xl p-6 mt-4 resize-y overflow-auto"
                     placeholder="Vui lòng nhập ghi chú của bạn..."
                  ></textarea>
               </div>
            </div>

            {/* Left */}
            <div className="col-span-5 ml-[70px]">
               <h2 className="text-[2.3rem] text-[#000000] font-semibold mb-2">THÔNG TIN ĐƠN HÀNG</h2>

               <div className="flex justify-between mt-7">
                  <p>{cart.quantityProduct} sản phẩm</p>
                  <span>{cart.cartTotal}₫</span>
               </div>
               <div className="flex justify-between mb-7">
                  <p>Giao hàng</p>
                  <span>Miễn phí</span>
               </div>

               <div className="flex justify-between items-start mt-7 mb-20">
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

               <Link
                  to="/checkout"
                  className="flex p-6 bg-black items-center justify-between mt-14 hover:bg-gray-900 cursor-pointer"
               >
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
               </Link>

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

export default CartPage;
