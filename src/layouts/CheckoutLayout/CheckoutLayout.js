import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images/image';

function CheckoutLayout({ children }) {
   return (
      <div className="w-[--default-layout-width]">
         <Link to="/">
            <img src={images.logoLevion} alt="Levion" className="w-[95px] h-[60px]" />
         </Link>

         {children}
      </div>
   );
}

export default CheckoutLayout;
