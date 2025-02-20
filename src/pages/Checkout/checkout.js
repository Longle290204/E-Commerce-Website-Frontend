import React from 'react';
import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import Left from './Left/Left';
import Right from './Right/Right';

const cx = classNames.bind(styles);

function CheckoutPage() {
   return (
      <div className="container mt-20 mb-20">
         <h1 className="text-5xl font-semibold text-center mb-32">THANH TOÁN</h1>
         <div className="grid grid-cols-12">
            {/* Left */}
            <div className="col-span-6 mr-24">
               <Left />
            </div>

            {/* Right */}
            <div className="col-span-6 ml-60">
               <Right />
            </div>
         </div>
      </div>
   );
}

export default CheckoutPage;
