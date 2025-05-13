import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg';
import { Link } from 'react-router-dom';
import useTokenValidation from '../../hooks/useTokenValidation';
import { useAxiosInstance } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductList/ProductsNew.module.scss';

const cx = classNames.bind(styles);

function ProductsNew({ products }) {
   const cart = useContext(CartContext);
   const navigate = useNavigate();
   const validateToken = useTokenValidation();

   const axiosInstance = useAxiosInstance();

   const accessToken = localStorage.getItem('accessToken');
   const refreshToken = localStorage.getItem('refreshToken');
   console.log('accessToken: ', accessToken);
   console.log('refreshToken: ', refreshToken);

   const handleProductClick = async (slug, id) => {
      console.log('Product slug:', slug);

      const isTokenValid = await validateToken();
      if (!isTokenValid) {
         console.log('Fetch product details with ID:', slug);
         navigate('/login');
         // Gọi API lấy chi tiết sản phẩm...
         return;
      } else {
         console.log('Lấy chi tiết sản phẩm với ID:', slug);
         // Thực hiện hành động bảo vệ (ví dụ: gọi API lấy thông tin sản phẩm)
         navigate(`/products/${slug}`, { state: { id } });
      }
   };

   const [favoriteStatus, setFavoriteStatus] = useState({});

   useEffect(() => {
      const axiosFavoriteProduct = async () => {
         try {
            const response = await axiosInstance.get(`/favorites-product`);

            // Giả sử response.data là mảng các favoriteProduct và mỗi phần tử có dạng:
            // { id, product: { id, ... } }
            const favoriteMapping = {};

            if (response) {
               response.data.forEach((favoriteProduct) => {
                  // Lưu trạng thái yêu thích cho productId tương ứng
                  favoriteMapping[favoriteProduct.product.id] = true;
               });
            }

            setFavoriteStatus(favoriteMapping);
         } catch (error) {
            console.error('Error fetching favorite products:', error);
         }
      };

      axiosFavoriteProduct();
   }, []);

   const toggleFavorite = async (productId) => {
      // Xác định trạng thái hiện tại của sản phẩm
      const isFavorite = favoriteStatus[productId];

      // Cập nhật trạng thái cục bộ
      setFavoriteStatus((prev) => ({ ...prev, [productId]: !isFavorite }));

      try {
         if (!isFavorite) {
            // Nếu sản phẩm chưa yêu thích, gọi API để thêm vào danh sách yêu thích
            await axiosInstance.post('/favorites-product', { productId });
         } else {
            // Nếu sản phẩm đã yêu thích, gọi API để xóa khỏi danh sách yêu thích
            await axiosInstance.delete(`/favorites-product/${productId}`);
         }
      } catch (error) {
         console.error('Có lỗi khi cập nhật favorite:', error);
         // Nếu có lỗi, bạn có thể quay lại trạng thái cũ
         setFavoriteStatus((prev) => ({ ...prev, [productId]: isFavorite }));
      }
   };

   return (
      <section>
         <div className="h-[469px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 bg-[white] p-3 mb-4">
            {products.map((product, id) => (
               <article
                  key={id}
                  className="relative flex flex-col items-center group border border-solid border-[rgb(172, 171, 171)]"
               >
                  <HeartIcon
                     className="absolute right-4 top-4 cursor-pointer z-50"
                     fill={favoriteStatus[product.id] ? '#E35353' : '#000'}
                     onClick={() => toggleFavorite(product.id)}
                  />
                  {/* <img className="absolute right-4 top-4 " src={images.heart} alt="heart" /> */}
                  <div className={cx('image-container')}>
                     <img
                        className={cx('main-image', 'bg-gray-100')}
                        src={product.mainImage}
                        alt={product.name}
                        onClick={() => {
                           handleProductClick(product.slug, product.id);
                        }}
                     />
                     <img
                        className={cx('hover-image', 'bg-gray-100')}
                        src={product.hoverImage}
                        alt={product.name}
                        onClick={() => {
                           handleProductClick(product.slug, product.id);
                        }}
                     />
                  </div>
                  <p
                     className="text-[1.4rem] mt-4 ml-4 mr-4 font-medium  cursor-pointer hover:text-blue-500 [transition:ease-in-out_0.3s]"
                     onClick={() => handleProductClick(product.slug, product.id)}
                  >
                     {product.name}
                  </p>
                  <p className="text-[1.4rem] font-medium text-[red] ml-[20px] mt-[10px]">{product.price}</p>
               </article>
            ))}
         </div>

         <Link to="collection/san-pham-moi">
            <div className="flex items-center gap-[0.63rem] transition-opacity ease-linear duration-200 group-hover:opacity-100">
               <button className="mx-auto text-2xl font-semibold underline">XEM THÊM</button>
            </div>
         </Link>
      </section>
   );
}

export default ProductsNew;
