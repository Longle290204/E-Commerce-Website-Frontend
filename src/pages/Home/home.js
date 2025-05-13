import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductSlider from '../../components/Products/Product-slide/Product-slide';
import SlideBanner from '../../components/SlideBanner/SlideBannerImage/SlideBaner';
import ProductsNew from '../../components/Products/ProductsNew';
import CategoryBanner from '../../components/CategoryBanner/CategoryBanner';
import SlideBlogBanner from '../../components/SlideBlogBanner/SlideBlogBanner';

const cx = classNames.bind(styles);

function Home() {
   const [slideBanners, setSlideBanner] = useState([]);
   const [products, setProducts] = useState([]); // Sửa thành array destructuring
   useEffect(() => {
      // Slide Banner Image
      const fetchSlideBanner = async () => {
         try {
            const response = await axios.get('http://localhost:3002/slide-banner/slidebanners');
            setSlideBanner(response.data);
            console.log(response.data);
         } catch (error) {
            console.log(error.message);
         }
      };

      // Slide Product
      const fetchProducts = async () => {
         try {
            const response = await axios.get('http://localhost:3002/products');
            setProducts(response.data); // Đặt dữ liệu sản phẩm vào state
            console.log('product slide', response.data);
         } catch (error) {
            console.log(error.message);
         }
      };

      fetchSlideBanner();
      fetchProducts();
   }, []);

   return (
      <section className="max-w-[1912px]">
         <div className={cx('flex justify-items-start')}>
            <SlideBanner slideBanners={slideBanners} />
         </div>
         <div className={cx('flex flex-col items-center')}>
            <section className={cx('flex flex-col items-center w-full bg-[#f4f4f4]')}>
               <div className={cx('w-[var(--default-layout-width)] pb-10')}>
                  {/* ------------- */}
                  <div className={cx('category', 'flex flex-col align-middle items-center')}>
                     <span className={cx('mt-5 text-amber-400 font-semibold')}>LEVION</span>
                     <h2 className="text-3xl font-semibold mt-5">SẢN PHẨM BÁN CHẠY</h2>
                  </div>
                  {/* ------------- */}
                  <div>
                     <ProductSlider products={products} />
                  </div>
                  {/* ------------- */}
                  <div className={cx('text-center pt-8')}>
                     <span className={cx('cursor-pointer font-medium')}>XEM THÊM</span>
                  </div>
               </div>
            </section>
            <section className="max-w-[1340px]">
               <div className={cx('category', 'flex flex-col align-middle items-center')}>
                  <span className={cx('mt-5 text-amber-400 font-semibold')}>LEVION</span>
                  <h2 className="text-3xl font-semibold mt-5">SẢN PHẨM MỚI</h2>
               </div>
               <ProductsNew products={products} />
            </section>
            <section className="mt-10">
               <div className={cx('category', 'flex flex-col align-middle items-center')}>
                  <span className={cx('mt-5 text-amber-400 font-semibold')}>LEVION</span>
                  <h2 className="text-3xl font-semibold mt-5">PHÂN LOẠI SẢN PHẨM</h2>
               </div>
               <CategoryBanner />
            </section>
            <section className={cx('flex flex-col items-center w-full mt-20')}>
               <div className={cx('w-[var(--default-layout-width)] pb-10')}>
                  <div className={cx('category', 'flex flex-col align-middle items-center')}>
                     <span className={cx('mt-5 text-amber-400 font-semibold')}>LEVION</span>
                     <h2 className="text-3xl font-semibold mt-5">TIN TỨC MỚI</h2>
                  </div>
                  <div>
                     <SlideBlogBanner />
                  </div>
               </div>
            </section>
         </div>
      </section>
   );
}

export default Home;
