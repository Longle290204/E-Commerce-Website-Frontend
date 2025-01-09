import React from 'react';
import CategoryRow from './CategoryRow';

function CategoryTable({ categories, onView, onEdit, onDelete }) {
   return (
      <div className="lg:max-h-[750px] overflow-hidden border rounded-lg ">
         <table className="min-w-full">
            <thead>
               <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xl font-semibold text-gray-500 uppercase tracking-wider">STT</th>
                  <th className="px-6 py-3 text-left text-xl font-semibold text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                  <th className="px-6 py-3 text-left text-xl font-semibold text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                  <th className="px-6 py-3 text-left text-xl font-semibold text-gray-500 uppercase tracking-wider">Ngày cập nhật</th>
                  <th className="px-6 py-3 text-left text-xl font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xl font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
               </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
               {categories.map((category, index) => (
                  <CategoryRow
                     key={category.id}
                     category={category}
                     allCategories={categories}
                     index={index}
                     level={0}
                     onView={onView}
                     onEdit={onEdit}
                     onDelete={onDelete}
                  />
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default CategoryTable;
