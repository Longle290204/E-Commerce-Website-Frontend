import { TreeSelect } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryForm({ formData, categories, imagePreview, onSubmit, onChange, onImageChange }) {
   const [treeData, setTreeData] = useState([]);
   const [value, setValue] = useState([]);

   // Lọc ra các danh mục gốc
   // const rootCategories = categories.filter((cat) => cat.parentId === null);

   useEffect(() => {
      const transformData = (data) => {
         return data.map((item) => ({
            title: item.name,
            value: item.id,
            children: item.subcategories ? transformData(item.subcategories) : [],
         }));
      };

      const axiosCategories = async () => {
         try {
            const response = await axios.get('http://localhost:3002/category');
            const formattedData = transformData(response.data);
            setTreeData(formattedData);
         } catch (error) {
            console.error('Error fetching categories:', error);
         }
      };

      axiosCategories();
   }, []);

   // const handleCreateCategory = (formData) => {
   //    try {
   //       const response = axios.post('http://localhost:3002/category', formData);
   //       setNewCategory(response.data);
   //    } catch (error) {
   //       console.error('Error creating category:', error);
   //    }
   // };

   // const handleChange = (newValue) => {
   //    console.log(newValue);
   //    setValue(newValue);
   // };

   return (
      <form onSubmit={onSubmit}>
         <div className="space-y-7">
            <div>
               <label className="block text-[13px] font-medium text-back">Tên danh mục</label>
               <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md px-3 py-2 !important"
                  style={{ border: '1px solid #d1d5db' }}
                  value={formData.name}
                  onChange={(e) => onChange({ name: e.target.value })}
               />
            </div>

            <div>
               <label className="block text-[13px] font-medium text-black">Danh mục cha</label>
               <TreeSelect
                  className="z-10 mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                  showSearch
                  value={value}
                  dropdownStyle={{
                     maxHeight: 400,
                     overflow: 'auto',
                  }}
                  placeholder="Danh mục gốc"
                  allowClear
                  multiple
                  treeDefaultExpandAll={false}
                  showCheckedStrategy={TreeSelect.SHOW_PARENT}
                  onChange={(newValue) => {
                     setValue(newValue);
                     onChange({ parentId: newValue });
                  }}
                  treeData={treeData} // Dữ liệu đã lọc
                  filterTreeNode={(inputValue, treeData) => treeData.title.toLowerCase().includes(inputValue.toLowerCase())}
               />
            </div>

            {/* <div>
               <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
               <input type="file" accept="image/*" onChange={onImageChange} className="mt-1 block w-full" />
               {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover rounded" />}
            </div> */}

            <div>
               <label className="block text-xl font-medium text-gray-700">Trạng thái</label>
               <select
                  className="z-10 mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.status}
                  onChange={(e) => onChange({ status: e.target.value })}
               >
                  <option value="ACTIVE">Hoạt động</option>
                  <option value="INACTIVE">Không hoạt động</option>
               </select>
            </div>
         </div>
      </form>
   );
}

export default CategoryForm;
