import { useState, useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import ProductTemplate from '../../components/Products/ProductTemplate';
import Breadcrumb from '../../routers/Breadcrumb';
import { usePaginationProducts } from '../../hooks/usePaginationProducts';
import PaginationPage from '../../components/function/Pagination/PaginationPage';
import { useParams } from 'react-router-dom';
import FilterOption from '../../components/function/FilterOption/FilterOption';

function ProductsNewPage() {
   const { slug } = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   console.log('slug slug product new', slug);

   const type = 'category';

   const productsContext = useContext(CartContext);

   usePaginationProducts(`http://localhost:3002/products/collection?page=${currentPage}&limit=20`, (data) => {
      productsContext.setProducts(data.data); // Xử lý dữ liệu
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
   });

   const handlePageChange = (page) => {
      console.log('page', page);
      setCurrentPage(page);
   };
   // currentPage, totalPages, onPageChange;
   return (
      <div className="max-w-[1340px]">
         <div className="mb-20">
            <Breadcrumb type={type} />
         </div>
         <div className="mb-16">
            <FilterOption />
         </div>
         <ProductTemplate products={productsContext.products} />
         <div className="flex justify-center">
            <PaginationPage currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
         </div>
      </div>
   );
}

export default ProductsNewPage;
