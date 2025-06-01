import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import makeAnimated from 'react-select/animated';

function CategorySelector({ onChangeCategoryIds }) {
   const [options, setOptions] = useState([]);
   const [selectedCategories, setSelectedCategories] = useState([]);

   const animatedComponents = makeAnimated();

   useEffect(() => {
      const axiosData = async () => {
         const response = await axios.get(`http://localhost:3002/category`);
         try {
            const categoryOptions = response.data.map((category) => ({
               label: category.name,
               value: category.id,
            }));

            setOptions(categoryOptions);
            console.log(response.data);
         } catch (error) {
            console.log(error.message);
         }
      };

      axiosData();
   }, []);

   const handleChange = (selectedOption) => {
      setSelectedCategories(selectedOption);
      const categoryIds = selectedOption.map((option) => option.value);
      onChangeCategoryIds(categoryIds);
   };

   return (
      <div>
         <Select
            isMulti
            closeMenuOnSelect={false}
            options={options} // Bảo vệ options
            components={animatedComponents}
            value={selectedCategories}
            onChange={handleChange}
            placeholder="Danh mục sản phẩm"
            styles={{
               control: (base, state) => ({
                  ...base,
                  borderColor: '#d1d5db', // tương đương border-gray-300
                  boxShadow: 'none',
                  '&:hover': {
                     borderColor: '#9ca3af', // hover nhẹ
                  },
                  minHeight: '38px',
                  fontSize: '14px',
                  borderRadius: '4px',
                  paddingLeft: '5px',
                  minHeight: '32px', // Chiều cao tổng thể
                  height: '34px', // Chiều cao chính xác (nếu muốn fix)
                  padding: '0 8px', // Khoảng cách trong
               }),
               dropdownIndicator: (base) => ({
                  ...base,
                  color: '#6b7280', // text-gray-500
                  padding: '2px',
               }),
               indicatorSeparator: () => ({
                  display: 'none', // bỏ đường gạch giữa
               }),
               placeholder: (base) => ({
                  ...base,
                  color: '#6b7280', // text-gray-500
               }),
               singleValue: (base) => ({
                  ...base,
                  color: '#111827', // text-gray-900
               }),
               option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                     ? '#3b82f6' // blue-500
                     : state.isFocused
                       ? '#e0e7ff' // blue-100
                       : '#fff',
                  color: state.isSelected ? '#fff' : '#111827',
                  fontSize: '14px',
                  padding: '10px',
               }),
            }}
         />
      </div>
   );
}

export default CategorySelector;
