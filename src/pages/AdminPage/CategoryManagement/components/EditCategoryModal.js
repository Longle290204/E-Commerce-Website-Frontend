import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const EditCategoryModal = ({ isOpen, onClose, onSave, categoryId }) => {
   const [editedCategory, setEditedCategory] = useState({ id: '', name: '', status: 'ACTIVE' });

   // Cập nhật editedCategory khi categoryId thay đổi
   useEffect(() => {
      if (categoryId) {
         setEditedCategory({
            id: categoryId,
            name: categoryId.name || '',
            status: categoryId.status || 'ACTIVE',
         });
      }
   }, [categoryId]); // Chạy khi categoryId thay đổi

   const handleSubmit = (e) => {
      e.preventDefault();
      onSave(editedCategory);
      setEditedCategory({ id: '', name: '', status: 'ACTIVE' });
      onClose();
   };

   return (
      <Dialog open={isOpen} onClose={onClose}>
         {/* Overlay */}
         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

         {/* Dialog Container */}
         <div className="fixed inset-0 flex items-center justify-center">
            <DialogPanel className="bg-white rounded-lg p-6 shadow-lg">
               <div className="flex justify-between items-center mb-4">
                  <DialogTitle className="text-3xl font-medium my-6">Chỉnh sửa danh mục</DialogTitle>
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
               </div>

               <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                     <label className="block text-[13px] font-medium text-black mb-2">Tên danh mục</label>
                     <input
                        type="text"
                        value={editedCategory.name}
                        onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     />
                  </div>

                  <div className="mb-4">
                     <label className="block text-[13px] font-medium text-black mb-2">Trạng thái</label>
                     <select
                        value={editedCategory.status}
                        onChange={(e) => setEditedCategory({ ...editedCategory, status: e.target.value })}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     >
                        <option value="ACTIVE">Hoạt động</option>
                        <option value="INACTIVE">Không hoạt động</option>
                     </select>
                  </div>

                  <div className="flex justify-end gap-2">
                     <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 mr-1 text-2xl font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                     >
                        Hủy
                     </button>
                     <button
                        type="submit"
                        className="px-4 py-2 text-2xl font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                     >
                        Lưu
                     </button>
                  </div>
               </form>
            </DialogPanel>
         </div>
      </Dialog>
   );
};

export default EditCategoryModal;
