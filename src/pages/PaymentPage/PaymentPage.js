import React from 'react';
import PaymentMethod from '../Payment-method/Payment-method';
import Right from '../Checkout/Right/Right';

function PaymentPage() {
   return (
      <div className="w-[--default-layout-width]">
         <div className="grid grid-cols-12 mt-20 mb-20">
            <div className='col-span-6 mr-20'>
               <PaymentMethod />
            </div>
            <div className='col-span-6 ml-60'>
               <Right />
            </div>
         </div>
      </div>
   );
}

export default PaymentPage;
