import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Left.module.scss';

function Left() {
   const cx = classNames.bind(styles);
   const [formData, setFormData] = useState({
      email: '',
      fullName: '',
      phoneNumber: '',
      address: '',
      city: '',
      district: '',
      ward: '',
   });

   const [errors, setErrors] = useState({});

   const validationRules = {
      email: {
         required: 'Vui lòng nhập địa chỉ email của bạn.',
         pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Định dạng email không đúng',
         },
      },
      fullName: {
         required: 'Vui lòng nhập đầy đủ họ và tên của bạn.',
         pattern: {
            value: /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)+$/,
            message: 'Họ và tên không hợp lệ',
         },
      },
      phoneNumber: {
         required: 'Vui lòng nhập số điện thoại',
         minLength: {
            value: 10,
            message: 'Số điện thoại phải có ít nhất 10 ký tự',
         },
      },
      address: {
         required: 'Vui lòng nhập địa chỉ giao hàng của bạn',
      },
      city: {
         required: 'Vui lòng chọn Thành phố/Tinh',
      },
      district: {
         required: 'Vui lòng chọn Quận/Huyện',
      },
      ward: {
         required: 'Vui lòng chọn Phường/Xã',
      },
   };

   // Sửa/thêm dữ liệu tại đây
   const validateField = async (field, value) => {
      const rules = validationRules[field];
      if (!rules) return '';

      if (rules.required && !value.trim()) return rules.required;
      if (rules.pattern && !rules.pattern.value.test(value)) return rules.pattern.message;
      if (rules.minLength && value.length < rules.minLength.value) return rules.minLength.message;
      if (rules.custom && !rules.custom.isValid(value)) return rules.custom.message;

      if (field === 'fullName' || field === 'phoneNumber') {
         const existError = await checkIfExists(field, value);
         if (existError) return existError;
      }

      return '';
   };

   const checkIfExists = async (field, value) => {
      try {
         const response = await axios.post(`http://localhost:3002/auth/checkIfExist`, { [field]: value });
         console.log(response.data.exists);
         return response.data.exists
            ? field === 'fullName'
               ? `Tên đăng nhập đã tồn tại`
               : `Số điện thoại đã tồn tại`
            : '';
      } catch (error) {
         console.error('Lỗi kiểm tra tồn tại:', error);
         return 'Lỗi kết nối, vui lòng thử lại';
      }
   };

   const validateAll = () => {
      const newErrors = {};
      Object.keys(formData).forEach(async (field) => {
         const error = await validateField(field, formData[field]);
         if (error) newErrors[field] = error;
      });
      return newErrors;
   };

   const handleInputChange = async (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' })); // Reset lỗi của field hiện tại
   };

   const handleBlur = async (e) => {
      const { name, value } = e.target;
      const error = await validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = validateAll();
      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      try {
         const response = await axios.post('http://localhost:3002/auth/signUp', {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
         });
         alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
         console.log(response.data);
      } catch (error) {
         console.error(error.message);
      }
   };

   return (
      <form onSubmit={handleSubmit} noValidate className={cx('form-signUp', 'col-span-6 w-full')}>
         <div className="w-2/4 mb-10">
            <h2 className="text-3xl font-semibold mb-10">LIÊN HỆ</h2>
            <div className="relative">
               <input
                  className={cx(
                     'w-full border border-solid border-[#767677] p-5',
                     errors['email'] ? 'input-form-wrong' : 'input-form-correct',
                  )}
                  placeholder=""
                  type="email"
                  id="email"
                  name="email"
                  // value="email"
                  onChange={handleInputChange}
                  onBlur={(e) => handleBlur(e)}
                  required
               />
               <label htmlFor="email" className={cx('label-name', 'absolute block text-gray-600 text-2xl mb-1')}>
                  Email
                  <span>*</span>
               </label>
            </div>
            {errors['email'] && <span className={cx('form-message')}>{errors['email']}</span>}
         </div>

         <hr className="border-t border-solid border-[#d3d7da] mb-10"></hr>

         <h2 className="text-3xl font-semibold mb-10">ĐỊA CHỈ</h2>
         {['fullName', 'phoneNumber', 'address'].map((field) => (
            <div key={field} className="mb-10">
               <div className={cx('box-info', 'relative')}>
                  <input
                     className={cx(
                        'w-full border border-solid border-[#767677] p-5 mb-3',
                        errors[field] ? 'input-form-wrong' : 'input-form-correct',
                     )}
                     placeholder=""
                     type={field.includes('phoneNumber') ? 'number' : 'text'}
                     id={field}
                     name={field}
                     value={formData[field]}
                     onChange={handleInputChange}
                     onBlur={(e) => handleBlur(e)}
                     required
                  />
                  <label htmlFor={field} className={cx('label-name', 'absolute block text-gray-600 text-2xl mb-1')}>
                     {field === 'fullName' && 'Họ và tên'}
                     {field === 'phoneNumber' && 'Số điện thoại'}
                     {field === 'address' && 'Địa chỉ'}
                     <span>*</span>
                  </label>
               </div>
               {errors[field] && <span className={cx('form-message')}>{errors[field]}</span>}
            </div>
         ))}

         <div className="flex gap-x-4">
            {['city', 'district', 'ward'].map((field) => (
               <div className="flex flex-col w-full">
                  <select
                     className={cx(
                        'w-full border border-solid border-[#767677] p-5',
                        errors[field] ? 'input-form-wrong' : 'input-form-correct',
                     )}
                     name={field}
                     value={formData[field]}
                     onChange={handleInputChange}
                     id={field}
                     onBlur={(e) => handleBlur(e)}
                     required
                  >
                     <option>
                        {field === 'city' && 'Thành phố/Tỉnh'}
                        {field === 'district' && 'Quận'}
                        {field === 'ward' && 'Phường'}
                     </option>
                  </select>
                  {errors[field] && <span className={cx('form-message')}>{errors[field]}</span>}
               </div>
            ))}
         </div>

         <div className="flex items-center justify-between mt-14">
            <Link to="/cart" className="whitespace-nowrap hover:text-[#fac02b] transition-colors duration-200">
               Giỏ hàng
            </Link>
            <button className="w-2/3 bg-[#000] text-white p-6 rounded text-center font-semibold hover:bg-slate-800">
               THANH TOÁN
            </button>
         </div>
      </form>
   );
}

export default Left;
