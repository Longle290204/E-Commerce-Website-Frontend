import axios from 'axios';
import { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import classNames from 'classnames/bind';
import styles from './CategoryPage.module.scss';
import CategoryList from '../CategoryManagement/CategoryList';

const cx = classNames.bind(styles);

function CategoryPage() {
   const [value, setValue] = useState();
   const [treeData, setTreeData] = useState([]);

   const onChange = (newValue) => {
      setValue(newValue);
   };

   const transformData = (data) => {
      return data.map((item) => ({
         title: item.name,
         value: item.id,
         children: item.subcategories ? transformData(item.subcategories) : [],
      }));
   };

   useEffect(() => {
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

   return (
      <section className={cx('category-page', ' w-full')}>
         <CategoryList />
      </section>
   );
}

export default CategoryPage;
