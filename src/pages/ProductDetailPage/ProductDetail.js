import React from 'react';
import { Card, CardMedia, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ProductThumbnail from './ProductThumbnail';
import ProductInfo from './ProductInfo';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import hunterwhite2 from '../../assets/images/hunterwhite2.webp';

const ProductPage = () => {
   const theme = createTheme({
      typography: {
         h5: {
            display: 'flex',
            fontSize: '1.4rem',
            alignItems: 'center',
            marginBottom: '10px',
            gap: '5px',
         },
      },

      breakpoints: {
         values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1350,
            xl: 1536,
         },
      },

      components: {
         MuiContainer: {
            defaultProps: {
               maxWidth: 'xl', // Mặc định là xl
            },
            styleOverrides: {
               maxWidthXl: {
                  maxWidth: '1350px !important', // Khi maxWidth="xl", nó sẽ dùng 1400px
               },
            },
         },
      },
   });

   return (
      <ThemeProvider theme={theme}>
         <Container maxWidth="xl" disableGutters>
            <Grid container spacing={5} sx={{ padding: 2 }}>
               {/* Cột bên trái */}
               <Grid item xl={6}>
                  <ProductThumbnail />
               </Grid>

               {/* Cột bên phải (Thông tin sản phẩm) */}
               <Grid item xl={6} sx={{ flexGrow: 1 }}>
                  <ProductInfo />
               </Grid>
            </Grid>
         </Container>
      </ThemeProvider>
   );
};

export default ProductPage;
