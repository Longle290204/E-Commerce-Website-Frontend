import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './sign-in.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; // Import icon cụ thể
import Image from '../../../layouts/images/image';

function SignIn() {
   const cx = classNames.bind(styles);

   // State cho Sign In
   const [signInUsername, setSignInUsername] = useState('');
   const [signInPassword, setSignInPassword] = useState('');
   const [signInErrors, setSignInErrors] = useState({});
   const [loading, setLoading] = useState(false);

   // useNavigate
   const navigate = useNavigate();

   // Validation rules cho Sign Up
   const newErrors = {};
   newErrors.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng';

   // Hàm xử lý Sign In
   const handleSignIn = async (e) => {
      e.preventDefault();
      // Xét loading
      setSignInErrors('');
      setLoading(true);
      try {
         const response = await axios.post('http://localhost:3002/auth/signIn', {
            username: signInUsername,
            password: signInPassword,
         });
         console.log(response);
         localStorage.setItem('accessToken', response.data.accessToken);
         localStorage.setItem('refreshToken', response.data.refreshToken);

         // Chuyển hướng đến trang home
         navigate('/');
      } catch (error) {
         setSignInErrors(newErrors);
         console.error('Đăng nhập thất bại:', error);
         alert('Đăng nhập không thành công. Vui lòng thử lại!');
         setLoading(false);
      } finally {
         setLoading(false);
      }
   };

   return (
      <form onSubmit={handleSignIn} className={cx('form-signIn')}>
         <h4>ĐĂNG NHẬP</h4>

         {loading && <span>Đang xử lý...</span>}
         {signInErrors.errorMessage && (
            <div className={cx('error-message')}>
               <span>{signInErrors.errorMessage}</span>
            </div>
         )}

         <div className={cx('box-info')}>
            <label htmlFor="signInUsername">
               Tên đăng nhập<span>*</span>
            </label>
            <input
               className={cx('input-form')}
               type="text"
               id="signInUsername"
               value={signInUsername}
               onChange={(e) => setSignInUsername(e.target.value)}
               required
            />
            {signInErrors.username && <span className="form-message">{signInErrors.username}</span>}
         </div>

         <div className={cx('box-info')}>
            <label htmlFor="signInPassword">
               Mật khẩu<span>*</span>
            </label>
            <input
               className={cx('input-form')}
               type="password"
               id="signInPassword"
               value={signInPassword}
               onChange={(e) => setSignInPassword(e.target.value)}
               required
            />
            {signInErrors.password && <span className="form-message">{signInErrors.password}</span>}
         </div>
         <button className={cx('form-button')} type="submit">
            Đăng Nhập
         </button>
         <a className={cx('forget-password')} href="#!">
            Quên mật khẩu?
         </a>

         <div className={cx('or-signIn-box')}>
            <div className={cx('or-signIn-line')}></div>
            <span className={cx('or-signIn-title')}>HOẶC</span>
            <div className={cx('or-signIn-line')}></div>
         </div>

         <div className={cx('social-network-login')}>
            <div className={cx('social-network-button')}>
               <FontAwesomeIcon className={cx('social-network-icon-facebook')} icon={faFacebook} />
               <a href="">Facebook</a>
            </div>
            <div className={cx('social-network-button')}>
               <Image iconName={'googleIcon'} />
               <a href="">Google</a>
            </div>
         </div>

         <div className={cx('note')}>
            <p>Nếu quý khách có vấn đề thắc mắc hoặc cần hỗ trợ có thể liên hệ:</p>
            <ul>
               <li>Hotline: 0943418555</li>

               <li>Hoặc inbox qua facebook</li>
            </ul>
         </div>
      </form>
   );
}

export default SignIn;
