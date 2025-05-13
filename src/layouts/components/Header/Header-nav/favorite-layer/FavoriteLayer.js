import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FavoriteLayer.module.scss';
import { useAxiosInstance } from '../../../../../api/axiosInstance';

const cx = classNames.bind(styles);

function FavoriteLayer() {
   const [favoriteProducts, setFavoriteProducts] = useState([]);
   // const [countCartItem, setCountCartItem] = useState(0);

   const axiosInstance = useAxiosInstance();

   useEffect(() => {
      const axiosFavoriteProduct = async () => {
         const response = await axiosInstance.get(`/favorites-product`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
         });

         if (response) {
            setFavoriteProducts(response.data);
         }
      };

      axiosFavoriteProduct();
   }, []);

   const handleDeleteItemCart = async (productId) => {
      if (!productId) {
         console.warn('Cannot delete item from cart: productId is null or undefined');
         return;
      }

      try {
         const response = await axiosInstance.delete(`/favorites-product/${productId}`);
         if (response.status !== 200) {
            console.error(`Failed to delete item from cart: ${response.status} ${response.statusText}`);
            return;
         }

         // setCountCartItem((prevCount) => prevCount + 1);
      } catch (error) {
         console.error('Failed to delete item from cart:', error);
      }
   };

   return (
      <div>
         {favoriteProducts.map((item, id) => (
            <article
               className="flex items-center px-[0] py-[15px] gap-7 h-auto border-b border-[rgb(172, 171, 171)]"
               key={id}
               aria-label="favorite_Product Item"
            >
               <Link to="/" className={cx('cart-item-image-link')}>
                  <img className="w-[90px] h-[90px] object-cover" src={item.product.mainImage} alt={item.product.name} />
               </Link>
               <div className="max-w-3xl">
                  <Link to="/" className={cx('cart-item-name-link')}>
                     <h3 className="font-normal text-2xl text-[#000] cursor-pointer hover:font-medium" aria-label="Product Name">
                        {item.product.name}
                     </h3>
                  </Link>
                  <div className="flex justify-around">
                     <p className="text-[1.4rem] font-bold text-[#000]" aria-label="Price">
                        {item.product.price} ₫
                     </p>
                     <button
                        className="text-xl font-medium underline cursor-pointer ml-auto mr-[10px]"
                        onClick={() => handleDeleteItemCart(item.product.id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                     >
                        Xóa
                     </button>
                  </div>
               </div>
            </article>
         ))}
      </div>
   );
}

export default FavoriteLayer;
