import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function SuccessPayment() {
   return (
      <div className="flex flex-col items-center justify-center h-screen -translate-y-20">
         <h1>Mua hàng thành công</h1>
         <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-6xl mb-4" />
         <p className="text-center text-2xl">Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi!</p>
      </div>
   );
}

export default SuccessPayment;
