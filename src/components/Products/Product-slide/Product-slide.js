import React from "react";
import classNames from "classnames/bind";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../Swiper/swiper.js";
import "../../Swiper/swiper-vars.scss";
import "swiper/css/autoplay"; // Import CSS cho Autoplay nếu cần (nếu có styling riêng)
import "../../Swiper/swiper.css";
import "../../Swiper/pagination.css";
import styles from "./Product-slide.module.scss";
import "../../Swiper/navigation.css";

const cx = classNames.bind(styles);

const ProductSlider = ({ products }) => {
  // const [showNavigation, setShowNavigation] = useState(false);

  return (
    <div
      className={cx("product-slider")}
      // onMouseEnter={() => setShowNavigation(true)} // Khi hover vào
      // onMouseLeave={() => setShowNavigation(false)} // Khi rời khỏi
    >
      <Swiper
        className={cx("swiper-hover")}
        slidesPerView={4} // Hiển thị 4 sản phẩm trên 1 slide
        spaceBetween={18} // Khoảng cách giữa các sản phẩm
        autoplay={{ delay: 5000 }} // Tự động chạy sau 5 giây
        loop={true} // Lặp lại slider sau khi hết
        modules={[Navigation, Pagination, Scrollbar, Autoplay]} // Thêm modules cho Swiper
        navigation={true}
        speed={1000}
        pagination={{
          clickable: true, // Cho phép click vào pagination để chuyển slide
          hideOnClick: false, // Pagination vẫn hiển thị khi click vào
        }}
        onSlideChange={() => console.log("slide change")}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className={cx("product-card")}>
              <img
                src={product.imageURL}
                alt={product.name}
                className={cx("product-image")}
              />
              <h3>{product.name}</h3>
              <p className={cx("price")}>
                <span className={cx("current-price")}>{product.price}</span>
              </p>
            </div>
            <div className="swiper-pagination"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
