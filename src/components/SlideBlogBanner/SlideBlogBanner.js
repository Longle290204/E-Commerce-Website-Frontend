import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Navigation, Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade'; // Import CSS cho hiệu ứng fade
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../Swiper/swiper-vars.scss';
import '../Swiper/swiper.css';
import '../Swiper/pagination.css';
import '../Swiper/navigation.css';
import styles from './SlideBlogBanner.module.scss';
import imageKid from '../../assets/images/3kids.jpg';
import imageRun from '../../assets/images/blog-image-2.webp';
import imageDiversity from '../../assets/images/image-blog-1.jpg';

const cx = classNames.bind(styles);

function SlideBlogBanner() {
   const BlogBanners = [
      {
         id: 1,
         title: 'ĐA DẠNG PHONG CÁCH VỚI GIÀY THỂ THAO LEVION',
         description:
            'Giày dép từ chất liệu da luôn là lựa chọn lý tưởng của các quý ông độ tuổi trung niên. Trong bài viết này, VenTo sẽ giới thiệu đến bạn đọc ba kiểu dép da nam thiết yếu mà mọi quý ông nên có trong tủ giày của mình. Từ những mẫu dép đơn giản dùng hàng ngày cho đến những thiết kế thời thượng trang trọng, hãy cùng khám phá để làm phong phú thêm bộ sưu tập dép da nam của bạn.',
         imageURL: imageDiversity,
      },
      {
         id: 2,
         title: 'CHINH PHỤC CHẠY BỘ VỚI GIÀY CHẠY BỘ LEVION',
         description:
            'Khi bước vào độ tuổi trung niên, việc chăm sóc sức khỏe và duy trì phong cách sống thoải mái là điều được đông đảo phái mạnh quan tâm. Một trong những món đồ không thể thiếu trong tủ giày của mỗi quý ông là dép da nam. Với chất liệu cao cấp, độ thoải mái và tính thời trang, dép da nam không chỉ thể hiện gu thẩm mỹ mà còn hỗ trợ độ thoải mái tuyệt đối cho đôi chân. Trong bài viết này, hãy cùng khám phá lý do tại sao dép da nam lại là lựa chọn hoàn hảo cho người trung tuổi, cùng với lưu ý bảo quản sản phẩm luôn bền đẹp theo thời gian.',
         imageURL: imageRun,
      },
      {
         id: 3,
         title: 'TOP 3 GIÀY CHẠY TỐT NHẤT CHO BÉ',
         description:
            'Chinh phục phái mạnh với thiết kế tối giản, lịch lãm và sang trọng, dép da nam từ thương hiệu Vento là lựa chọn được các chàng trai săn đón. Với uy tín 27 năm sản xuất và phân phối giày dép, các sản phẩm dép da nam Vento đã trải qua quá trình kiểm định gắt gao, đạt tiêu chuẩn về chất lượng để trao đến tay người tiêu dùng và xuất khẩu qua nhiều thị trường khó tính.',
         imageURL: imageKid,
      },
      {
         id: 4,
         title: 'TOP 3 GIÀY CHẠY TỐT NHẤT CHO BÉ',
         description:
            'Chinh phục phái mạnh với thiết kế tối giản, lịch lãm và sang trọng, dép da nam từ thương hiệu Vento là lựa chọn được các chàng trai săn đón. Với uy tín 27 năm sản xuất và phân phối giày dép, các sản phẩm dép da nam Vento đã trải qua quá trình kiểm định gắt gao, đạt tiêu chuẩn về chất lượng để trao đến tay người tiêu dùng và xuất khẩu qua nhiều thị trường khó tính.',
         imageURL: imageKid,
      },
   ];

   return (
      <Swiper
         className={cx('slide-banner')}
         slidesPerView={3} // Hiển thị 3 sản phẩm trên 1 slide
         spaceBetween={3} // Khoảng cách giữa các sản phẩm
         autoplay={{ delay: 5000 }} // Tự động chạy sau 5 giây
         loop={true} // Lặp lại slider sau khi hết
         fadeEffect={{ crossFade: true }} // Tùy chọn cho hiệu ứng fade
         modules={[Navigation, Pagination, Scrollbar, Autoplay]} // Thêm modules cho Swiper
         navigation={true}
         speed={1000}
         pagination={{
            clickable: true, // Cho phép click vào pagination để chuyển slide
            hideOnClick: false, // Pagination vẫn hiển thị khi click vào
         }}
         onSlideChange={() => console.log('slide change')}
      >
         {BlogBanners.map((blogBanner, index) => (
            <SwiperSlide key={index} className={cx('blog-banner-wrapper-img')}>
               <div className={cx('blog-card')}>
                  <div className={cx('blog-wrapper-img', 'relative overflow-hidden')}>
                     <Link to={`/blog/${blogBanner.id}`}>
                        <img className={cx('blog-banner-img')} src={blogBanner.imageURL} alt="blog" />
                     </Link>
                     <div className={cx('overlay')}></div>
                  </div>
                  <div className={cx('blog-info', 'bg-[#fff] rounded-lg pt-5 pl-2 pr-2 w-5/6 h-[80px]')}>
                     <h2 className={cx('blog-title')}>{blogBanner.title}</h2>
                     <div className="px-3 mt-4">
                        <p className={cx('blog-desc')}>{blogBanner.description}</p>
                     </div>
                  </div>
               </div>
            </SwiperSlide>
         ))}
      </Swiper>
   );
}

export default SlideBlogBanner;
