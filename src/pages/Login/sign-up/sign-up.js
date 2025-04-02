import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './sign-up.module.scss';
import useDebounce from '../../../hooks/useDebounce';

function SignUp() {
   const cx = classNames.bind(styles);
   const [formData, setFormData] = useState({
      surName: '',
      name: '',
      username: '',
      phoneNumber: '',
      password: '',
      rePassword: '',
   });
   const [debouncedField, setDebouncedField] = useState({ name: '', value: '' });

   const debouncedValue = useDebounce(debouncedField, 500); // Debounce thời gian 500ms

   const [errors, setErrors] = useState({});

   const validationRules = {
      surName: {
         required: 'Vui lòng nhập trường này',
         pattern: {
            value: /^[A-Z]/,
            message: 'Sai định dạng',
         },
      },
      name: {
         required: 'Vui lòng nhập trường này',
         pattern: {
            value: /^[A-Z]/,
            message: 'Sai định dạng',
         },
      },
      username: {
         required: 'Vui lòng nhập đầy đủ tên',
         pattern: {
            value: /^(?=.*[A-Z])(?=.*\d).+$/,
            message: 'Tên phải có tối thiểu một chữ hoa và số',
         },
      },
      phoneNumber: {
         required: 'Vui lòng nhập số điện thoại',
         minLength: {
            value: 10,
            message: 'Số điện thoại phải có ít nhất 10 ký tự',
         },
      },
      password: {
         required: 'Vui lòng nhập mật khẩu',
         minLength: {
            value: 6,
            message: 'Mật khẩu phải có ít nhất 6 ký tự',
         },
      },
      rePassword: {
         required: 'Vui lòng nhập lại mật khẩu',
         custom: {
            isValid: (value) => value === formData.password,
            message: 'Mật khẩu nhập lại không chính xác',
         },
      },
   };

   const validateField = async (field, value) => {
      const rules = validationRules[field];
      if (!rules) return '';
      if (rules.required && !value.trim()) return rules.required;
      if (rules.pattern && !rules.pattern.value.test(value)) return rules.pattern.message;
      if (rules.minLength && value.length < rules.minLength.value) return rules.minLength.message;
      if (rules.custom && !rules.custom.isValid(value)) return rules.custom.message;

      if (field === 'username' || field === 'phoneNumber') {
         const existError = await checkIfExists(field, value);
         if (existError) return existError;
      }

      return '';
   };

   const checkIfExists = async (field, value) => {
      try {
         const response = await axios.post(`http://localhost:3002/auth/checkIfExist`, { [field]: value });
         console.log(response.data.exists);
         return response.data.exists ? (field === 'username' ? `Tên đăng nhập đã tồn tại` : `Số điện thoại đã tồn tại`) : '';
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

      // if (name === 'username' || name === 'phoneNumber') {
      //    // const existError = await checkIfExists(name, value);
      //    // setErrors((prev) => ({ ...prev, [name]: existError }));

      //    setDebouncedField({ name, value }); // Chỉ debounce với username và phoneNumber
      // }
   };

   // useEffect(() => {
   //    const checkDebouncedField = async () => {
   //       if (debouncedValue.name && debouncedValue.value) {
   //          const existError = await checkIfExists(debouncedValue.name, debouncedValue.value);
   //          setErrors((prev) => ({ ...prev, [debouncedValue.name]: existError }));
   //       }
   //    };

   //    checkDebouncedField();
   // }, debouncedField);

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
            surName: formData.surName,
            name: formData.name,
            gender: formData.gender,
            username: formData.username,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
         });
         alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
         console.log(response.data);
      } catch (error) {
         console.error(error.message);
      }
   };

   return (
      <form onSubmit={handleSubmit} noValidate className={cx('form-signUp')}>
         <h4>ĐĂNG KÝ</h4>
         {['surName', 'name', 'Female', 'Male', 'username', 'phoneNumber', 'password', 'rePassword'].map((field) => (
            <div
               className={cx('box-info', field === 'Female' || field === 'Male' ? 'inline-block mr-12 mt-7 mb-7' : '')}
               key={field}
            >
               <label htmlFor={field} className={field === 'Female' || field === 'Male' ? 'float-right' : ''}>
                  {field === 'surName' && 'Họ'}
                  {field === 'name' && 'Tên'}
                  {field === 'Female' && 'Nữ'}
                  {field === 'Male' && 'Nam'}
                  {field === 'username' && 'Tên đăng nhập'}
                  {field === 'phoneNumber' && 'Số điện thoại'}
                  {field === 'password' && 'Mật khẩu'}
                  {field === 'rePassword' && 'Nhắc lại mật khẩu'}
                  {field === 'Female' || field === 'Male' ? <span></span> : <span>*</span>}
               </label>
               {field === 'Female' || field === 'Male' ? (
                  <input
                     className={cx('w-auto mr-3', errors[field] ? 'input-form-wrong' : 'input-form-hover')}
                     type="radio"
                     id={field}
                     name="gender"
                     value={field === 'Female' ? 'Female' : 'Male'}
                     onChange={handleInputChange}
                     required
                  />
               ) : (
                  <input
                     className={cx('input-form', errors[field] ? 'input-form-wrong' : 'input-form-hover')}
                     type={field.includes('password') ? 'password' : 'text'}
                     id={field}
                     name={field}
                     value={formData[field]}
                     onChange={handleInputChange}
                     onBlur={(e) => handleBlur(e)}
                     required
                  />
               )}
               {errors[field] && <span className={cx('form-message')}>{errors[field]}</span>}
            </div>
         ))}
         <button className={cx('form-button')} type="submit">
            Đăng Ký
         </button>
         <div className={cx('note')}>
            <p>Thông tin cá nhân của bạn sẽ được dùng để điền vào hóa đơn, giúp bạn thanh toán nhanh chóng và dễ dàng</p>
         </div>
      </form>
   );
}

export default SignUp;
