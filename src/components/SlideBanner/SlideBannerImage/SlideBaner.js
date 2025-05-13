import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames/bind';
import { Navigation, Autoplay, Pagination, Scrollbar, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade'; // Import CSS cho hiệu ứng fade
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import styles from './SliderBanner.module.scss';

const cx = classNames.bind(styles);

function SlideBanner({ slideBanners }) {
   return (
      <div className='2xl:w-[1920px] xl:w-[1533px]'>
         <Swiper
            className={cx('slide-banner')}
            spaceBetween={0}
            slidesPerView={1} // Hiển thị 4 sản phẩm trên 1 slide
            autoplay={{ delay: 5000 }} // Tự động chạy sau 5 giây
            loop={true} // Lặp lại slider sau khi hết
            effect="fade" // Sử dụng hiệu ứng fade
            fadeEffect={{ crossFade: true }} // Tùy chọn cho hiệu ứng fade
            modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]} // Thêm modules cho Swiper
            navigation={true}
            speed={1000}
            pagination={{
               clickable: true, // Cho phép click vào pagination để chuyển slide
               hideOnClick: false, // Pagination vẫn hiển thị khi click vào
            }}
            onSlideChange={() => console.log('slide change')}
         >
            {slideBanners.map((sliderBanner, index) => (
               <SwiperSlide key={index} className={cx('slide-banner-wrapper-img')}>
                  <img className={cx('slide-banner-img')} src={sliderBanner.imageURL} alt="sliderBanner" />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
}

export default SlideBanner;
