import React, { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Payment-method.module.scss';
import images from '../../assets/images/image';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';

const cx = classNames.bind(styles);
const PaymentMethods = () => {
   const [selectedMethod, setSelectedMethod] = useState('cod');
   const cart = useContext(CartContext); // Assuming you have a CartContext to manage cart state

   const paymentOptions = [
      { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: images.cash_On_delivery },
      { value: 'momo', label: 'Ví MoMo', icon: images.momo },
      { value: 'zalo', label: 'Ví ZaloPay', icon: images.zalo_pay },
      { value: 'zalo_atm', label: 'Thẻ ATM nội địa qua cổng ZaloPay' },
      { value: 'onepay_atm', label: 'Thẻ ATM nội địa qua cổng OnePay' },
      { value: 'onepay_card', label: 'Thẻ Visa/Master/JCB/Amex/CUP qua cổng OnePay' },
      { value: 'vietqr', label: 'Chuyển khoản ngân hàng qua mã VietQR' },
   ];

   const handlePayment = async () => {
      if (selectedMethod === 'cod') {
         const response = window.confirm('Bạn có chắc chắn muốn thanh toán khi nhận hàng?');
         if (response) {

            // Handle COD payment logic here
            const orders = cart.cartItems.map((item) => ({
               productId: item.product.id,
               size: item.size,
               quantity: item.quantity,
            }));
            try {
               await axios.post('http://localhost:3002/order', { orders });
            } catch (error) {
               console.error('Error creating order:', error);
            }

            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
         }

         // Redirect to success payment page
         window.location.href = '/checkout/success-payment';
      }
   };

   return (
      <div className={cx('payment-methods')}>
         <h1 className="mb-10">Phương thức thanh toán</h1>
         {paymentOptions.map((option) => (
            <label key={option.value} className={cx('payment-option', { selected: selectedMethod === option.value })}>
               <input
                  type="radio"
                  name="payment"
                  value={option.value}
                  checked={selectedMethod === option.value}
                  onChange={(e) => setSelectedMethod(e.target.value)}
               />
               <img src={option.icon} alt={option.value} className={cx('payment-icon')} width="30px" height="30px" />
               <span>{option.label}</span>
            </label>
         ))}

         <div className="w-full">
            <div className="ml-auto w-2/3 flex items-center justify-between mt-14">
               <button
                  className="w-full bg-[#000] text-white p-6 rounded text-center font-semibold hover:bg-slate-800"
                  onClick={() => {
                     handlePayment();
                  }}
               >
                  Thanh toán
               </button>
            </div>
         </div>
      </div>
   );
};

export default PaymentMethods;
