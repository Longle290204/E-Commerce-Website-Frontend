import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import images from '../../assets/images/image';
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg';
import { useNavigate } from 'react-router-dom';
import useTokenValidation from '../../hooks/useTokenValidation';
import axiosInstance from '../../api/axiosInstance';
import isTokenValid from '../../guards/IsTokenValid';

function ProductBestseller({ products }) {
   const [isActive, setIsActive] = useState(false);
   const cart = useContext(CartContext);
   const navigate = useNavigate();
   const validateToken = useTokenValidation();

   const accessToken = localStorage.getItem('accessToken');
   const refreshToken = localStorage.getItem('refreshToken');
   console.log('accessToken: ', accessToken);
   console.log('refreshToken: ', refreshToken);

   const handleAddToCart = async (productId) => {
      try {
         const accessToken = localStorage.getItem('accessToken');
         if (!accessToken || !isTokenValid(accessToken)) {
            console.log('Product not added');
            // navigate('/login');
         } else {
            const response = await axiosInstance.post(
               `/cart`,
               {
                  productId,
                  quantity: 1,
               },
               {
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                  },
               },
            );
            cart.addToCart(response.data);
         }
      } catch (error) {
         console.log('Error fetching cart data:', error);
      }
   };

   const handleProductClick = async (id) => {
      const isTokenValid = await validateToken();
      if (!isTokenValid) {
         console.log('Fetch product details with ID:', id);
         navigate('/login');
         // Gọi API lấy chi tiết sản phẩm...
         return;
      } else {
         console.log('Lấy chi tiết sản phẩm với ID:', id);
         // Thực hiện hành động bảo vệ (ví dụ: gọi API lấy thông tin sản phẩm)
         navigate(`/products/${id}`);
      }
   };

   const toggleHeart = (productId) => {};

   return (
      <section>
         <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 bg-[white] p-3">
            {products.map((product, id) => (
               <article key={id} className="relative flex flex-col items-center group">
                  <HeartIcon
                     className="absolute right-4 top-4 cursor-pointer"
                     fill={isActive ? '#E35353' : '#000'}
                     onClick={() => toggleHeart(product.id)}
                  />
                  {/* <img className="absolute right-4 top-4 " src={images.heart} alt="heart" /> */}
                  <img
                     className="w-[320px] h-[320px] cursor-pointer object-cover pr-[-1px] pl-[-1px]"
                     src={product.mainImage}
                     alt={product.name}
                     onClick={() => handleProductClick(product.id)}
                  />
                  <p
                     className="text-[1.4rem] mt-4 ml-4 mr-4 font-medium  cursor-pointer hover:text-blue-500 [transition:ease-in-out_0.3s]"
                     onClick={() => handleProductClick(product.id)}
                  >
                     {product.name}
                  </p>
                  <p className="text-[1.4rem] font-medium text-[red] ml-[20px] mt-[10px]">{product.price}</p>
                  <section className="flex opacity-0 mt-6  mr-2  mb-2  ml-2 gap-[0.63rem] transition-opacity ease-linear duration-200 group-hover:opacity-100">
                     <button className="bg-[#dab900] w-[135px] h-[32px] rounded-[4px] cursor-pointer">Xem nhanh</button>
                     <button
                        className="bg-[#da0020] w-[135px] h-[32px] rounded-[4px] cursor-pointer active:bg-[#e4b2b9] [transition:ease-in-out_0.1s]"
                        onClick={() => handleAddToCart(product.id)}
                     >
                        Thêm vào giỏ
                     </button>
                  </section>
               </article>
            ))}
         </div>
      </section>
   );
}

export default ProductBestseller;
