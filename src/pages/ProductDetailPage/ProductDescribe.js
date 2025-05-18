import React from 'react';

function ProductDescribe() {
   return (
      <div>
         <div>
            <h3 className="text-3xl font-semibold">Mô tả sản phẩm</h3>
            <hr className="mt-7 mb-16"></hr>
            <p className="text-2xl font-medium mb-2 sm:mb-3 md:mb-4 lg:mb-5">
               Dép sandal bé trai Biti’s BPB001600DEN màu đen xám – Quai dán tiện lợi, đế chống trượt, bền bỉ, thoải mái
            </p>
            <p className="text-2xl font-medium">
               Sản phẩm nổi bật với thiết kế thể thao hiện đại, phối màu đen xám mạnh mẽ, dễ dàng kết hợp với nhiều trang phục
               thường ngày.
            </p>
         </div>
         <div>
            <h3>Tham khảo thêm</h3>
         </div>
         <div>
            <h3>Sản phẩm đã xem</h3>
         </div>
      </div>
   );
}

export default ProductDescribe;
