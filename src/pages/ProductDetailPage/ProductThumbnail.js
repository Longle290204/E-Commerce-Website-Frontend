import React from 'react';
import { useState, useRef } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './ProductThumbnail.module.scss';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Scrollbar, EffectFade, Thumbs, FreeMode } from 'swiper/modules';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import hunterwhite1 from '../../assets/images/hunterwhite1.webp';
import hunterwhite2 from '../../assets/images/hunterwhite2.webp';
import hunterwhite3 from '../../assets/images/hunterwhite3.webp';
import hunterwhite4 from '../../assets/images/hunterwhite4.webp';
import hunterwhite5 from '../../assets/images/hunterwhite5.jpg';
import { color } from '@mui/system';

const cx = classNames.bind(styles);

function ProductThumbnail() {
   const [thumbsSwiper, setThumbsSwiper] = useState(null);

   const swiperRef = useRef(null); // Tạo ref cho Swiper

   const images = [hunterwhite1, hunterwhite2, hunterwhite3, hunterwhite4, hunterwhite5];

   const theme = createTheme({
      components: {
         MuiIconButton: {
            styleOverrides: {
               root: {
                  variants: [
                     {
                        props: { color: 'primary' },
                        style: {
                           color: '#000',
                           backgroundColor: '#fff',
                           ':hover': {
                              backgroundColor: '#fff',
                           },
                        },
                     },
                  ],
               },
            },
         },
      },
   });

   return (
      <ThemeProvider theme={theme}>
         <Box sx={{ display: 'flex', gap: '10px' }}>
            {/* =================== THUMBNAIL BEN TRÁI ==================== */}
            <Swiper
               spaceBetween={10}
               slidesPerView={4}
               direction="vertical"
               loop={true}
               observer={true} // Cập nhật Swiper khi component thay đổi
               observeParents={true} // Cập nhật Swiper nếu container thay đổi
               watchSlidesProgress={true}
               watchSlidesVisibility={true} // 🔹 Giúp Swiper nhận diện slide nào đang hiển thị
               modules={[Scrollbar, FreeMode]}
               freeMode={{ enabled: false, momentumBounce: false }} // Giảm hiện tượng đứng nửa vời
               speed={500}
               onSwiper={setThumbsSwiper}
               className={cx('thumbnail-slider')}
            >
               {images.map((src, index) => (
                  <SwiperSlide key={index}>
                     <img src={src} alt={`Thumbnail ${index + 1}`} />
                  </SwiperSlide>
               ))}
            </Swiper>

            {/* =================== SLIDE CHÍNH ==================== */}
            <Swiper
               onSwiper={(swiper) => (swiperRef.current = swiper)}
               ref={swiperRef} // Gán ref vào Swiper
               modules={[Navigation, Thumbs, EffectFade]}
               // navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
               // navigation={true}
               observer={true} // Cập nhật Swiper khi component thay đổi
               observeParents={true}
               loop={true}
               thumbs={{ swiper: thumbsSwiper }}
               speed={500}
               watchOverflow={true}
               allowTouchMove={true} // Đảm bảo có thể kéo
               resistanceRatio={0} // Giảm lực cản khi kéo
               onSlideChange={(swiper) => {
                  const activeIndex = swiper.realIndex; // 🔹 Dùng realIndex để đồng bộ
                  thumbsSwiper?.slideToLoop(activeIndex); // 🔹 Dùng slideToLoop để giữ đồng bộ
               }}
               className={cx('main-slider')}
            >
               {images.map((src, index) => (
                  <SwiperSlide key={index}>
                     <img src={src} alt={`Product ${index + 1}`} className={cx('main-image')} />
                  </SwiperSlide>
               ))}

               {/* =================== NÚT ĐIỀU HƯỚNG ==================== */}
               <IconButton
                  color="primary"
                  onClick={() => {
                     swiperRef.current?.slidePrev();
                     const activeIndex = swiperRef.current?.realIndex;
                     thumbsSwiper?.slideToLoop(activeIndex);
                  }}
                  sx={{ position: 'absolute', transform: 'translateY(-50%)' }}
                  className={cx('prev-btn')}
               >
                  <ArrowBackIosNewIcon />
               </IconButton>
               <IconButton
                  color="primary"
                  onClick={() => {
                     swiperRef.current?.slideNext();
                     const activeIndex = swiperRef.current?.realIndex;
                     thumbsSwiper?.slideToLoop(activeIndex);
                  }}
                  sx={{ position: 'absolute', transform: 'translateY(-50%)' }}
                  className={cx('next-btn')}
               >
                  <ArrowForwardIosIcon />
               </IconButton>
            </Swiper>
         </Box>
      </ThemeProvider>
   );
}

export default ProductThumbnail;
