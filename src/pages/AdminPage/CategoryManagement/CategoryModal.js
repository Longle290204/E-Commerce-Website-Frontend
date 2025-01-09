import React from 'react';
import CategoryForm from './CategoryForm';
import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

function CategoryModal({ isOpen, categories, onClose, onSubmit }) {
   const [formData, setFormData] = useState({
      name: '',
      // image: null,
      status: 'ACTIVE',
      parentId: null,
   });

   // const [imagePreview, setImagePreview] = useState('');

   // const handleImageChange = (e) => {
   //    const file = e.target.files?.[0];
   //    if (file) {
   //       setFormData({ ...formData, image: file });
   //       setImagePreview(URL.createObjectURL(file));
   //    }
   // };

   const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      // console.log(formData);

      // Reset form
      setFormData({
         name: '',
         // image: null,
         status: 'ACTIVE',
         parentId: null,
      });
      // setImagePreview('');
      onClose();
   };

   const handleChange = (data) => {
      setFormData({ ...formData, ...data });
   };

   return (
      <Dialog open={isOpen} onClose={onClose}>
         {/* Overlay */}
         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

         {/* Dialog Container */}
         <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="rounded bg-white p-6 shadow-lg">
               {/* Title */}
               <DialogTitle className="text-3xl font-medium my-6">Tạo Danh Mục Mới</DialogTitle>
               {/* <div className="text-3xl font-medium my-6">Tạo Danh Mục Mới</div> */}
               {/* Form */}
               <CategoryForm
                  formData={formData}
                  categories={categories}
                  // imagePreview={imagePreview}
                  onSubmit={handleSubmit}
                  onChange={handleChange}
               />
               {/* onImageChange={handleImageChange} */}

               {/* Footer */}
               <div className="mt-6 flex justify-end space-x-3">
                  <button
                     type="button"
                     onClick={onClose}
                     className="px-4 py-2 text-2xl font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                     Hủy
                  </button>
                  <button onClick={handleSubmit} className="px-4 py-2 text-2xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                     Tạo mới
                  </button>
               </div>
            </DialogPanel>
         </div>
      </Dialog>
   );
}

export default CategoryModal;
