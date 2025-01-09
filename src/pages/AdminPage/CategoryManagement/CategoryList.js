import React, { useState, useEffect } from 'react';
import CategoryTable from './CategoryTable';
import CategoryModal from './CategoryModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import EditCategoryModal from './components/EditCategoryModal';
import { ToastContainer } from 'react-toastify';

function CategoryList() {
   const [isModalOpenCategories, setIsModalOpenCategories] = useState(false);
   const [isModalOpenEditCategory, setIsModalOpenEditCategory] = useState(false);
   const [idToEdit, setIdToEdit] = useState(null);
   const [categories, setCategories] = useState([]);

   // CREATE CATEGORY
   const handleCreateCategory = async (formData) => {
      if (!formData.name || !formData.status) {
         console.error('Name and status are required!');
         return;
      }

      //  Method 1: Send data as JSON
      // const dataToSend = {
      //    name: formData.name,
      //    status: formData.status,
      //    parentId: Array.isArray(formData.parentId) ? formData.parentId[0] : formData.parentId,
      // };

      // Method 2: Send data as FormData
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('status', formData.status);
      if (formData.parentId) {
         const parentId = Array.isArray(formData.parentId) ? formData.parentId[0] : formData.parentId;
         formDataToSend.append('parentId', parentId);
      }

      try {
         await axios.post(`http://localhost:3002/category`, formDataToSend, {
            headers: {
               'Content-Type': 'application/json',
            },
         });
      } catch (error) {
         console.error('Error creating category:', error);
      }
   };

   // Recive data from server
   useEffect(() => {
      const axiosCategories = async () => {
         try {
            const response = await axios.get('http://localhost:3002/category');
            console.log(response.data);

            setCategories(response.data);
         } catch (error) {
            console.error('Error fetching categories:', error);
         }
      };

      axiosCategories();
   }, []);

   // VIEW CATEGORY
   const handleView = (category) => {
      console.log('View category:', category);
   };

   // OPEN EDIT MODAL
   const handleOpenEditModal = (categoryId) => {
      setIdToEdit(categoryId);
      setIsModalOpenEditCategory(true);
   };

   // EDIT CATEGORY
   const handleEdit = async (category) => {
      console.log('Get category', idToEdit);
      console.log('Get id', category);

      try {
         await axios.patch(`http://localhost:3002/category/${category.id}/updateCategory`, {
            status: category.status,
            name: category.name,
         });
      } catch (error) {
         console.error('Error updating category:', error);
      }

      setCategories((prevCategories) =>
         prevCategories.map((item) => (item.id === category.id ? { ...item, ...category } : item)),
      );

      toast.success('Updated!', {
         position: 'top-right',
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: true,
         draggable: true,
         theme: 'dark',
         transition: Bounce,
      });
   };

   // DELETE CATEGORY
   const handleDelete = async (category) => {
      await axios.delete(`http://localhost:3002/category/${category.id}`);

      setCategories((prevCategories) => prevCategories.filter((item) => item.id !== category.id));

      toast.success('Deleted!', {
         position: 'top-right',
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: true,
         draggable: true,
         theme: 'dark',
         transition: Bounce,
      });
   };

   return (
      <div className="pl-16 pr-16 pb-16 pt-5">
         <div className="flex justify-between">
            <h1 className="font-nunito text-5xl text-[#364b83] font-bold">Quản lý danh mục</h1>
            <span className="text-gray-500">Dashboard / Quản lý danh mục</span>
         </div>

         <div className="bg-white rounded-lg max-h-full p-10 pt-4 mt-8">
            <div className="flex justify-between items-center mb-6">
               <p className="font-nunito text-[15px] text-gray-500">Danh sách các danh mục</p>
               <button
                  onClick={() => setIsModalOpenCategories(true)}
                  className="px-9 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
               >
                  Tạo mới
               </button>
            </div>
            <div className="bg-white rounded-lg shadow flex flex-col h-full overflow-hidden">
               <CategoryTable
                  categories={categories}
                  onView={handleView}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDelete}
               />
            </div>

            <CategoryModal
               isOpen={isModalOpenCategories}
               onClose={() => setIsModalOpenCategories(false)}
               onSubmit={handleCreateCategory}
               categories={categories}
            />

            <EditCategoryModal
               isOpen={isModalOpenEditCategory}
               onSave={handleEdit}
               onClose={() => setIsModalOpenEditCategory(false)}
               categoryId={idToEdit ? idToEdit.id : ''} // idToEdit
            />
         </div>

         <ToastContainer />
      </div>
   );
}

export default CategoryList;
