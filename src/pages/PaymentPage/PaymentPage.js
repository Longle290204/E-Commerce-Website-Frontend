import React from 'react';
import CheckoutPage from '../Checkout/checkout';
import images from '../../assets/images/image';
import { Link } from 'react-router-dom';

function PaymentPage() {
   return (
      <>
         <header>
            <Link to="/">
               <img src={images.logoLevion} alt="Levion-logo" className="w-[95px] h-[60px] cursor-pointer" />
            </Link>
         </header>

         <CheckoutPage />
      </>
   );
}

export default PaymentPage;
