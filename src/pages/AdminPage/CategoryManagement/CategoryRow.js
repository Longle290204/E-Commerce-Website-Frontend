import React from 'react';
import CategoryActions from './CategoryActions';

function CategoryRow({ category, allCategories, index, level, onView, onEdit, onDelete }) {
   const levelPadding = level * 1;

   // Tìm danh mục cha
   const getParentCategories = (currentCategory) => {
      const parentCategory = currentCategory.parent
         ? allCategories.find((c) => c.id === currentCategory.parent.id)
         : null;
      if (parentCategory) {
         return [...getParentCategories(parentCategory), parentCategory.name];
      }
      return [];
   };

   const parentNames = getParentCategories(category).join(' > ');

   return (
      <>
         <tr className={`pb-3 pt-3 border-b hover:bg-gray-50 ${level > 0 ? 'bg-blue-50/50' : ''}`}>
            {/* STT */}
            <td className="px-6 py-11">{index + 1}</td>

            {/* Name categories */}
            <td className="px-6 py-11">
               <div className="flex items-center" style={{ paddingLeft: `${levelPadding}px` }}>
                  <div className="flex flex-col">
                     <span className="font-medium">{category.name}</span>
                     {parentNames && (
                        <span className="text-sm text-gray-500">Thuộc danh mục: {parentNames}</span>
                     )}
                  </div>
               </div>
            </td>

            {/* createdAt */}
            <td className="px-6 py-11">{category.createdAt}</td>

            {/* updatedAt */}
            <td className="px-6 py-11">{category.updatedAt}</td>

            {/* Status */}
            <td className="px-6 py-11">
               <span
                  className={`px-3 py-1 rounded-full text-2xl font-medium ${
                     category.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
               >
                  {category.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
               </span>
            </td>
            <td className="px-6 py-11">
               <CategoryActions
                  onView={() => onView(category)}
                  onEdit={() => onEdit(category)}
                  onDelete={() => onDelete(category)}
               />
            </td>
         </tr>
         {category.subcategories?.length > 0 &&
            category.subcategories.map((child, childIndex) => (
               <CategoryRow
                  key={child.id}
                  category={child}
                  allCategories={allCategories}
                  index={childIndex}
                  level={level + 1}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
               />
            ))}
      </>
   );
}

export default CategoryRow;
