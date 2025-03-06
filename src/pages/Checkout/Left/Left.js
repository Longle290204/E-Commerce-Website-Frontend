import { useEffect, useState } from 'react';
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

   // State to save city, district, and ward list
   const [cities, setCities] = useState([]);
   const [districts, setDistricts] = useState([]);
   const [wards, setWards] = useState([]);

   // State to save the selected value
   const [selectedCity, setSelectedCity] = useState('');
   const [selectedDistrict, setSelectedDistrict] = useState('');
   const [selectedWard, setSelectedWard] = useState('');

   // Get a list of cities
   useEffect(() => {
      const fetchCities = async () => {
         try {
            const response = await axios.get(`https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1`);
            setCities(response.data.data.data);
            console.log(response.data.data.data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchCities();
   }, []);

   // Get a list of districts when a city is selected
   useEffect(() => {
      if (!selectedCity) return;

      const fetchDistricts = async () => {
         try {
            const response = await axios.get(
               `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${selectedCity}&limit=-1`,
            );
            setDistricts(response.data.data.data);
            setSelectedDistrict('');
         } catch (error) {
            console.log(error);
         }
      };

      fetchDistricts();
   }, [selectedCity]);

   // Get a wards list when a district is selected
   useEffect(() => {
      if (!selectedDistrict) return;

      const fetchWards = async () => {
         try {
            const response = await axios.get(
               `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${selectedDistrict}&limit=-1`,
            );
            setWards(response.data.data.data);
            setSelectedWard('');
         } catch (error) {
            console.log(error);
         }
      };

      fetchWards();
   }, [selectedDistrict]);

   useEffect(() => {}, []);

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
         required: 'Vui lòng chọn TP/Tỉnh',
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

   // Chủ yếu để thay đổi trang thái lỗi khi người dùng nhập dữ liệu
   const handleInputChange = async (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' })); // Reset lỗi của field hiện tại
   };

   // Chủ yếu để xét xem có lỗi hiện ra không khi blur
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
                     'w-full border border-solid border-[#767677] p-5 mb-3',
                     errors['email'] ? 'input-form-wrong' : 'input-form-correct',
                  )}
                  placeholder=""
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={(e) => handleBlur(e)}
                  required
               />
               <label htmlFor="email" className={cx('label-name', 'absolute block text-gray-600 text-2xl mb-1')}>
                  Email
               </label>
            </div>
            {errors['email'] && <span className={cx('form-message')}>{errors['email']}</span>}
         </div>

         <hr className="border-t border-solid border-[#d3d7da] mb-10"></hr>

         <h2 className="text-3xl font-semibold mb-10">ĐỊA CHỈ</h2>
         {['fullName', 'phoneNumber', 'address'].map((field, index) => (
            <div key={index} className="mb-10">
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
                  </label>
               </div>
               {errors[field] && <span className={cx('form-message')}>{errors[field]}</span>}
            </div>
         ))}

         <div className="flex gap-x-4">
            {/* Dropdown Thành phố */}
            <div className=" flex-col w-1/3">
               <select
                  className={cx(
                     'w-full border border-solid border-[#767677] p-5 mb-3',
                     errors['city'] ? 'input-form-wrong' : '',
                  )}
                  name="city"
                  value={selectedCity}
                  onChange={(e) => {
                     setSelectedCity(e.target.value);
                     setErrors((prev) => ({ ...prev, city: '' }));
                  }}
                  // onChange={handleInputChange}
                  onBlur={(e) => handleBlur(e)}
               >
                  <option value="">Chọn Thành phố</option>
                  {cities.map((city) => (
                     <option key={city.code} value={city.code}>
                        {city.name_with_type}
                     </option>
                  ))}
               </select>
               {errors['city'] && <span className={cx('form-message')}>{errors['city']}</span>}
            </div>

            {/* Dropdown Quận */}

            <div className=" flex-col w-1/3">
               <select
                  className={cx(
                     'w-full border border-solid border-[#767677] p-5 mb-3',
                     errors['district'] ? 'input-form-wrong' : '',
                  )}
                  name="district"
                  value={selectedDistrict}
                  onChange={(e) => {
                     setSelectedDistrict(e.target.value);
                     setErrors((prev) => ({ ...prev, district: '' }));
                  }}
                  onBlur={(e) => handleBlur(e)}
               >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((district) => (
                     <option key={district.code} value={district.code}>
                        {district.name_with_type}
                     </option>
                  ))}
               </select>
               {errors['district'] && <span className={cx('form-message')}>{errors['district']}</span>}
            </div>

            {/* Dropdown ward */}
            <div className=" flex-col w-1/3">
               <select
                  className={cx(
                     'w-full border border-solid border-[#767677] p-5 mb-3',
                     errors['ward'] ? 'input-form-wrong' : '',
                  )}
                  name="ward"
                  value={selectedWard}
                  onChange={(e) => {
                     setSelectedWard(e.target.value);
                     setErrors((prev) => ({ ...prev, ward: '' }));
                  }}
                  onBlur={(e) => handleBlur(e)}
               >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((ward) => (
                     <option key={ward.code} value={ward.code}>
                        {ward.name_with_type}
                     </option>
                  ))}
               </select>
               {errors['ward'] && <span className={cx('form-message')}>{errors['ward']}</span>}
            </div>
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
