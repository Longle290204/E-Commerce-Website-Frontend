import React, { useState } from 'react';
import { Card, CardMedia, Typography, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import hunterwhite4 from '../../assets/images/hunterwhite4.webp';
import hunterpink1 from '../../assets/images/hunterpink1.webp';
import star from '../../assets/images/star.svg';

function ProductInfo(props) {
   // Sizes
   const sizes = [36, 37, 38, 39, 40, 41, 42, 43];
   const [activeSize, setActiveSize] = useState(sizes[0]);

   const images = [
      { image: hunterwhite4, title: 'Trắng' },
      { image: hunterpink1, title: 'Hồng' },
   ];

   // Custom MUI theme
   const theme = createTheme({
      typography: {
         fontFamily: '"Noto Sans", sans-serif',
         h5: {
            display: 'flex',
            fontSize: '1.5rem',
            alignItems: 'center',
            marginBottom: '10px',
            gap: '5px',
            // color: '#212529',
            color: '#000',
            fontWeight: '700',
         },
      },

      components: {
         MuiButton: {
            styleOverrides: {
               root: {
                  variants: [
                     {
                        props: { variant: 'contained' },
                        style: {
                           color: '#fff',
                           backgroundColor: 'black',
                           fontSize: '1.5rem',
                           padding: '13px',
                           boxShadow: 'none',
                           border: '1px solid #dadada',
                           ':hover': { boxShadow: 'none' },
                        },
                     },
                  ],
               },
            },
         },
      },
   });

   const BoldText = ({ children }) => <span style={{ fontWeight: 600, fontSize: '16px' }}>{children}</span>;

   return (
      <ThemeProvider theme={theme}>
         <Box>
            <Typography variant="h5" marginBottom={4} sx={{ fontSize: '2.8rem', fontWeight: '700' }}>
               Giày Sandal Nam NOVA SD-11012
            </Typography>
            {/* ============= Đánh Giá ============= */}
            {/* <Box display="flex" gap="15px">
               <Typography variant="h5">
                  <span>4.5</span>
                  {Array.from({ length: 5 }).map((_, index) => (
                     <img key={index} src={star} alt="star" />
                  ))}
               </Typography>
               <span>|</span>
               <Typography variant="h5">
                  <BoldText>20</BoldText>Đánh Giá
               </Typography>
            </Box> */}

            {/* ============= Phần Giá ============= */}
            <Box
               marginBottom={4}
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: '#212529',
                  // backgroundColor: '#fafafa',
                  padding: '20px',
                  borderTop: '1px solid #dee2e6',
                  borderBottom: '1px solid #dee2e6',
               }}
            >
               <Typography
                  variant="h3"
                  color="error"
                  gap="15px"
                  sx={{ display: 'flex', alignItems: 'center', fontWeight: '700' }}
               >
                  327,750đ
               </Typography>
               <Typography
                  variant="h5"
                  sx={{
                     padding: '5px',
                     backgroundColor: '#990000',
                     borderRadius: '5px',
                     marginBottom: '0px',
                     color: '#fff',
                  }}
               >
                  Tiết kiệm 5%
               </Typography>
            </Box>

            {/* =============== Chọn màu sắc ===========*/}
            <Box marginBottom={3}>
               <Typography variant="h5" sx={{ marginTop: 3, fontWeight: '400' }}>
                  Màu sắc
               </Typography>
               <Box sx={{ display: 'flex', gap: 2 }}>
                  {images.map((src, index) => (
                     <figure key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CardMedia
                           sx={{ width: 112, height: 112, objectFit: 'cover', borderRadius: '5px' }}
                           component="img"
                           image={src.image}
                           alt={`hunterpink${index + 1}`}
                        />
                     </figure>
                  ))}
               </Box>
            </Box>

            {/* =============== Chọn kích thước ================ */}
            <Box variant="div" display="flex" justifyContent="space-between">
               <Typography variant="h5" sx={{ marginTop: 3, fontWeight: '400' }}>
                  Kích thước
               </Typography>
               <Typography
                  variant="h5"
                  sx={{ marginTop: 3, fontWeight: '400', ':hover': { textDecoration: 'underline', cursor: 'pointer' } }}
               >
                  Hướng dẫn chọn size
               </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
               {sizes.map((size) => (
                  <Button
                     variant="h5"
                     key={size}
                     onClick={() => setActiveSize(size)}
                     sx={{
                        fontSize: '1.5rem',
                        width: '40px', // Tăng kích thước để vừa với chữ số
                        height: '30px', // Đảm bảo chiều cao bằng chiều rộng
                        minWidth: 0, // Loại bỏ minWidth mặc định của MUI
                        paddingTop: 2, // Loại bỏ padding thừa
                        paddingBottom: 2,
                        paddingLeft: 4,
                        paddingRight: 4,
                        border: activeSize === size ? '2px solid #000 !important ' : '1px solid #e1e1e1 !important',
                        borderRadius: '2',
                     }}
                  >
                     {size}
                  </Button>
               ))}
            </Box>

            {/* =============== Nút mua hàng =============== */}
            <Box display="flex" gap="20px" sx={{ marginTop: 5 }}>
               <Button variant="contained" fullWidth sx={{ backgroundColor: '#fafafa', color: 'black' }}>
                  THÊM VÀO GIỎ HÀNG
               </Button>
               <Button variant="contained" fullWidth>
                  MUA NGAY
               </Button>
            </Box>
         </Box>
      </ThemeProvider>
   );
}

ProductInfo.propTypes = {
   optionalNode: PropTypes.node,
};

export default ProductInfo;

