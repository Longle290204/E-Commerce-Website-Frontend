import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CardMedia, Typography, Button, Box, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function ProductInfo({ id }) {
   // Option color
   const [optionColor, setOptionColor] = useState('');

   // Input value quantity
   const [inputValue, setInputValue] = useState(1);

   // Sizes
   const [sizes, setSizes] = useState([]);
   const [stock, setStock] = useState(0);
   const [activeSize, setActiveSize] = useState();

   const [errorMessage, setErrorMessage] = useState('');

   const handleQuantity = (method) => {
      setInputValue((prev) => {
         if (method === 'plus') return prev === '' ? 1 : prev + 1;
         if (method === 'minus') return prev > 1 ? prev - 1 : prev;
         return prev;
      });
   };

   // Get option color
   useEffect(() => {
      const fetchAxios = async () => {
         const response = await axios.get(`http://localhost:3002/products/${id}`);
         console.log('option color', response.data);
         setOptionColor(response.data);
         setSizes(response.data.productSizes);
      };

      fetchAxios();
   }, []);

   const handleAddToCart = async (productId) => {
      const accessToken = localStorage.getItem('accessToken');

      try {
         const response = await axios.post(
            `http://localhost:3002/cart`,
            {
               productId,
               quantity: inputValue,
               sizeId: activeSize,
            },
            {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            },
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            console.log('Lỗi từ server:', error.response);
            if (error.response?.status === 400 && error.response?.data?.message === 'Out of stock') {
               setErrorMessage('Vượt quá số lượng có sẵn');
            } else {
               setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
            }
         } else {
            // Nếu không phải lỗi Axios (lỗi khác)
            setErrorMessage('Lỗi không xác định');
         }
      }
   };

   const handleClickSize = async (productId, sizeId) => {
      const response = await axios.get(`http://localhost:3002/product-size/getStock`, {
         params: { productId, sizeId },
      });

      setStock(response.data);
   };

   // Custom MUI theme
   const theme = createTheme({
      typography: {
         fontFamily: '"Noto Sans", sans-serif',
         h4: {
            display: 'flex',
            fontSize: '1.5rem',
            alignItems: 'center',
            marginBottom: '10px',
            marginRight: '60px',
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
            <Typography variant="h2" marginBottom={4} sx={{ fontSize: '2.8rem', fontWeight: '700' }}>
               Giày Sandal Nam NOVA SD-11012
            </Typography>

            {/* ============= Phần Giá ============= */}
            <Box
               marginBottom={4}
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  color: '#212529',
               }}
            >
               <Typography
                  variant="h3"
                  gap="15px"
                  sx={{ display: 'flex', alignItems: 'center', color: '#ff3D00', fontWeight: '700' }}
               >
                  327,750 VNĐ
               </Typography>
            </Box>

            {/* =============== Chọn màu sắc ===========*/}
            <Box variant="div" display="flex" marginBottom={6}>
               <Typography variant="h4" sx={{ marginTop: 3, fontWeight: '400' }}>
                  Màu sắc
               </Typography>
               <Box sx={{ display: 'flex', gap: 2 }}>
                  <figure style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <CardMedia
                        sx={{ width: 112, height: 112, objectFit: 'cover', borderRadius: '5px' }}
                        component="img"
                        src={optionColor.mainImage}
                        // image={optionColor.mainImage}
                        alt="Black shoes"
                     />
                  </figure>
               </Box>
            </Box>

            {/* =============== Chọn kích thước ================ */}
            <Box variant="div" marginBottom={6}>
               <Box variant="div" display="flex" alignItems="center">
                  <Typography variant="h4" sx={{ marginTop: 0, marginBottom: 0, fontWeight: '400' }}>
                     Kích thước
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                     {sizes.map((item) => (
                        <Button
                           variant="h4"
                           key={item.id}
                           onClick={() => {
                              setActiveSize(item.size.id);
                              handleClickSize(item.product.id, item.size.id);
                           }}
                           disabled={item.stock === 0} // <-- Vô hiệu hóa nếu hết hàng
                           sx={{
                              fontSize: '1.4rem',
                              width: '40px', // Tăng kích thước để vừa với chữ số
                              height: '30px', // Đảm bảo chiều cao bằng chiều rộng
                              minWidth: 0, // Loại bỏ minWidth mặc định của MUI
                              paddingTop: 2, // Loại bỏ padding thừa
                              paddingBottom: 2,
                              paddingLeft: 4,
                              paddingRight: 4,
                              border: activeSize === item.size.id ? '2px solid #000 !important ' : '1px solid #e1e1e1 !important',
                           }}
                        >
                           {item.size.size}
                        </Button>
                     ))}
                  </Box>
               </Box>

               <Typography
                  variant="h4"
                  sx={{
                     marginTop: 4,
                     marginBottom: 0,
                     fontWeight: '400',
                     ':hover': { textDecoration: 'underline', cursor: 'pointer' },
                  }}
               >
                  Hướng dẫn chọn size
               </Typography>
            </Box>

            {/* =============== Số lượng =============== */}

            <Box variant="div" marginBottom={6} sx={{ display: 'flex', alignItems: 'center' }}>
               <Typography variant="h4" sx={{ fontWeight: '400', marginBottom: 0 }}>
                  Số lượng
               </Typography>
               <Box variant="div" className="itemQuantity" sx={{ display: 'flex', alignItems: 'center', marginRight: 3 }}>
                  <button
                     className="qtyBtn minusQuan w-14 border-t border-b border-l border-[#808080]"
                     data-type="minus"
                     onClick={() => handleQuantity('minus')}
                  >
                     -
                  </button>
                  <input
                     type="text"
                     id="quantity"
                     name="quantity"
                     value={inputValue}
                     min="1"
                     onChange={(e) => {
                        const value = Number(e.target.value);
                        setInputValue(value >= 1 ? value : ''); // Không cho nhập số nhỏ hơn 1
                     }}
                     className="w-16 text-center border outline-none [&::-webkit-inner-spin-button]:appearance-none 
                                [&::-webkit-outer-spin-button]:appearance-none 
                                [appearance:textfield]"
                  />
                  <button
                     className="qtyBtn plusQuan w-14 border-t border-b border-r border-[#808080]"
                     data-type="plus"
                     onClick={() => handleQuantity('plus')}
                  >
                     +
                  </button>
               </Box>

               <Typography variant="h4" sx={{ fontWeight: '400', marginBottom: 0 }}>
                  {stock} sản phẩm có sẵn
               </Typography>
            </Box>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* =============== Nút mua hàng =============== */}
            <Box display="flex" gap="20px" sx={{ marginTop: 5 }}>
               <Button
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#fafafa', color: 'black' }}
                  onClick={() => handleAddToCart(id)}
               >
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
   id: PropTypes.node,
};

export default ProductInfo;
