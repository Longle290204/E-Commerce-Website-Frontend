import { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CreateProductAdmin.module.scss';
import CategorySelector from '../CategorySelector/CategorySelector';
import Image from '../../../layouts/images/image';

const cx = classNames.bind(styles);

function CreateProductAdmin({ setCountProduct }) {
   const [imageURL, setImageURl] = useState(null);
   const [productName, setProductName] = useState('');
   const [productPrice, setProductPrice] = useState('');
   const [categoryIds, setCategoryIds] = useState([]);
   // Cập nhật sản phẩm ngay khi tạo phía admin

   const handleCreateProduct = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('image', imageURL);
      formData.append('name', productName);
      formData.append('price', productPrice);
      categoryIds.forEach((id) => formData.append('categoryId[]', id));
      // FormData là một đối tượng trong JavaScript được sử dụng để xây dựng dữ liệu dưới dạng multipart/form-data.
      //  Đây là một định dạng đặc biệt cần thiết khi bạn muốn gửi cả file và dữ liệu text qua HTTP
      try {
         await axios.post(`http://localhost:3002/products`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         //  const newProduct = response.data;
         //  setProducts((prevProduct) => [...prevProduct, newProduct]);
         //  setCountProduct((prevCount) => prevCount + 1);
         //  console.log(newProduct);
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <form className={cx('form-admin-edit')} onSubmit={handleCreateProduct}>
         <div data-testid="cypress-create_product">
            <label htmlFor="file">
               Upload hình ảnh <span style={{ color: 'red' }}>(*)</span>
            </label>
            <label
               htmlFor="file"
               style={{
                  cursor: 'pointer',
                  width: '150px',
                  height: '120px',
                  backgroundColor: '#ebedef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
               }}
            >
               <Image iconName="createImageAdmin" />
            </label>
            <input
               type="file"
               id="file"
               style={{ display: 'none' }}
               accept="image/*" // Chỉ cho phép tải lên ảnh
               onChange={(e) => setImageURl(e.target.files[0])}
               required
            />
         </div>

         <div>
            <label htmlFor="name-product">
               Tên sản phẩm<span style={{ color: 'red' }}>(*)</span>
            </label>
            <input
               type="text"
               id="name-product"
               onChange={(e) => setProductName(e.target.value)}
               placeholder="Tên sản phẩm"
               required
            />
         </div>

         <div>
            <label htmlFor="price-product">
               Giá bán sản phẩm <span style={{ color: 'red' }}>(*)</span>
            </label>
            <input
               type="text"
               id="price-product"
               onChange={(e) => setProductPrice(e.target.value)}
               placeholder="Giá bản sản phẩm"
               required
            />
         </div>

         {/* Select category product */}
         {/* <SelectProductCategory onCategoryChange={handleCategoryChange} /> */}

         <CategorySelector onChangeCategoryIds={setCategoryIds} />

         <button type="submit">Tạo sản phẩm</button>
      </form>
   );
}

export default CreateProductAdmin;
