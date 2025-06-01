import { useState, useEffect } from 'react';
import ProductList from '../../../components/Products/ProductList/ProductList';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ListProductPage.module.scss';

const cx = classNames.bind(styles);

function ListProductPage() {
   const [products, setProducts] = useState([]);
   useEffect(() => {
      const axiosProducts = async () => {
         const response = await axios.get('http://localhost:3002/products');
         setProducts(response.data);
      };

      axiosProducts();
   });

   // Delete Product
   const handleDeleteProduct = (productId) => {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
   };

   //  Update Product
   const handleUpdateProduct = (updateProduct) => {
      setProducts((prevProducts) => prevProducts.map((product) => (product.id === updateProduct.id ? updateProduct : product)));
   };
   return (
      <div className='p-10'>
         <ProductList products={products} onDelete={handleDeleteProduct} onUpdate={handleUpdateProduct} />
      </div>
   );
}

export default ListProductPage;
