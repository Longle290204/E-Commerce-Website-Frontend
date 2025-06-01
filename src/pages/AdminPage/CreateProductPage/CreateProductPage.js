import { useState, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CreateProductPage.module.scss';
import Image from '../../../layouts/images/image';
import CategorySelector from '../../../components/function/CategorySelector/CategorySelector';

const cx = classNames.bind(styles);

function CreateProductAdmin({ setCountProduct }) {
   const [imageURL, setImageURl] = useState(null);
   const [productName, setProductName] = useState('');
   const [productPrice, setProductPrice] = useState('');
   const [status, setStatus] = useState('ACTIVE');
   const [inputQuantity, setInputQuantity] = useState('');
   const [discount, setDiscount] = useState('');
   const [categoryIds, setCategoryIds] = useState([]);
   // Cập nhật sản phẩm ngay khi tạo phía admin

   const statusRef = useRef(null);

   const handleCreateProduct = async (e) => {
      setStatus('ACTIVE');

      console.log('categoryIds', categoryIds);
      e.preventDefault();
      const formData = new FormData();
      formData.append('images', imageURL);
      formData.append('name', productName);
      formData.append('price', Number(productPrice));
      formData.append('status', status);
      categoryIds.forEach((id, index) => formData.append(`categoryId[${index}]`, id));

      for (const pair of formData.entries()) {
         console.log(pair[0], pair[1]);
      }

      // categoryIds.forEach((id) => formData.append('categoryId[]', id));
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

   const handleLabelClick = () => {
      if (statusRef.current) {
         statusRef.current.focus(); // Đảm bảo focus trước
         const event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window,
         });
         statusRef.current.dispatchEvent(event); // Gửi sự kiện mousedown để mở dropdown
      }
   };

   return (
      <div className={cx('create-product-admin')}>
         <form className={cx('form-admin-edit', 'w-full')} onSubmit={handleCreateProduct}>
            <div className="flex flex-col justify-between w-full gap-10">
               {/* Tên sản phẩm  */}
               <div className="flex flex-col w-full">
                  <label htmlFor="name-product">
                     Tên sản phẩm<span style={{ color: 'red' }}>(*)</span>
                  </label>
                  <input
                     className="border border-gray-300 rounded-md p-2"
                     type="text"
                     id="name-product"
                     onChange={(e) => setProductName(e.target.value)}
                     placeholder="Tên sản phẩm"
                     required
                  />
               </div>

               <div className="flex justify-between  items-center w-full gap-10">
                  {/* Giá bán sản phẩm */}
                  <div className="flex flex-col w-1/3">
                     <label htmlFor="price-product" className="line">
                        Giá bán sản phẩm <span style={{ color: 'red' }}>(*)</span>
                     </label>
                     <input
                        className={cx('input-price', 'border border-gray-300 rounded-md p-2')}
                        type="text"
                        id="price-product"
                        name="price"
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Giá bản sản phẩm"
                        required
                        style={{
                           lineHeight: '1', // Không ảnh hưởng đến placeholder nhưng giúp đồng bộ input
                        }}
                     />
                  </div>

                  {/* Select category product */}
                  {/* <SelectProductCategory onCategoryChange={handleCategoryChange} /> */}

                  {/* Danh mục sản phẩm  */}
                  <div className="flex flex-col w-1/3">
                     <label htmlFor="category-select" className="font-medium text-gray-700 cursor-pointer">
                        Danh mục<span style={{ color: 'red' }}>(*)</span>
                     </label>

                     <CategorySelector id="category-select" onChangeCategoryIds={setCategoryIds} />
                  </div>

                  {/* Trạng thái */}
                  <div className="flex flex-col w-1/3">
                     <label
                        htmlFor="status-select"
                        className="font-medium text-gray-700 cursor-pointer"
                        onClick={handleLabelClick}
                     >
                        Trạng thái<span style={{ color: 'red' }}>(*)</span>
                     </label>
                     <select
                        ref={statusRef}
                        id="status-select" // ID phải trùng với htmlFor của label
                        className="z-10 h-14 rounded-md border border-gray-300 px-3 py-2 w-full"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                     >
                        <option value="ACTIVE">Hoạt động</option>
                        <option value="INACTIVE">Không hoạt động</option>
                     </select>
                  </div>
               </div>

               <div className="flex justify-between items-center w-full gap-10">
                  {/* Số lượng nhập */}
                  <div className="flex flex-col w-full">
                     <label htmlFor="quantity-product">
                        Số lượng nhập<span style={{ color: 'red' }}>(*)</span>
                     </label>
                     <input
                        className="border border-gray-300 rounded-md p-2"
                        type="text"
                        id="quantity-product"
                        onChange={(e) => setInputQuantity(e.target.value)}
                        placeholder="Tên sản phẩm"
                        required
                     />
                  </div>

                  {/* Giá tiền bán sản phẩm */}
                  <div className="flex flex-col w-full">
                     <label htmlFor="import-price">
                        Giá tiền nhập sản phẩm<span style={{ color: 'red' }}>(*)</span>
                     </label>
                     <input
                        className="border border-gray-300 rounded-md p-2"
                        type="text"
                        id="import-price"
                        onChange={(e) => setInputQuantity(e.target.value)}
                        placeholder="Tên sản phẩm"
                        required
                     />
                  </div>

                  <div className="flex flex-col w-full">
                     <label htmlFor="discount-price">
                        Giá tiền giảm sản phẩm<span style={{ color: 'red' }}>(*)</span>
                     </label>
                     <input
                        className="border border-gray-300 rounded-md p-2"
                        type="text"
                        id="discount-price"
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Tên sản phẩm"
                        required
                     />
                  </div>
               </div>
            </div>

            <div data-testid="cypress-create_product" className="mt-5">
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
            <button type="submit">Tạo sản phẩm</button>
         </form>
      </div>
   );
}

export default CreateProductAdmin;
