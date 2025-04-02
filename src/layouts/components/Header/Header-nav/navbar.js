import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import images from '../../../../assets/images/image';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import Image from '../../../images/image';
import MiniCart from './Mini-cart/MiniCart';
import Search from '../../../../components/function/Search/Search';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../../components/Popper';

const cx = classNames.bind(styles);

function Navbar({ children }) {
   const [isVisible, setIsVisible] = useState(true);
   const [lastScrollTop, setLastScrollTop] = useState(0);
   const [isSticky, setIsSticky] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         const currentScroll = window.scrollY || document.documentElement.scrollTop;

         if (currentScroll > 300) {
            setIsSticky(true);
         }
         // Loại bỏ trạng thái sticky khi cuộn ngược lại ít hơn 150px
         else if (currentScroll < 150) {
            setIsSticky(false);
         }

         // Kiểm tra nếu cuộn xuống và đủ xa thì ẩn navbar
         if (currentScroll > lastScrollTop && currentScroll > 200) {
            setIsVisible(false); // Ẩn khi cuộn xuống
         }

         // Nếu cuộn lên thì hiển thị lại navbar
         if (currentScroll < lastScrollTop) {
            setIsVisible(true); // Hiển thị khi cuộn lên
         }

         // Cập nhật giá trị cuộn cuối cùng
         setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [lastScrollTop]);

   return (
      <div className={cx('wrapper', 'w-screen')}>
         <div
            className={cx('header-nav', {
               'header-nav-up': isVisible,
               'header-nav-down': !isVisible,
            })}
            style={{
               position: isSticky ? 'sticky' : 'relative',
               top: isSticky ? '0' : '',
               opacity: isVisible
                  ? 'opacity 0.4s ease-in-out'
                  : {
                       transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
                    }, // Nếu transformNav đúng, thì chỉ thay đổi opacity
            }}
         >
            <nav className={cx('inner-nav')}>
               <logo className={cx('header-wrap-logo')}>
                  <Link to="/">
                     <img src={images.logoLevion} alt="Levion" className="w-[95px] h-[60px]" />
                  </Link>
               </logo>

               <div className="flex flex-col items-center justify-between w-full">
                  <Search />

                  <div className={cx('header-wrap-menu')}>
                     <div className={cx('navbar-menu')}>
                        <ul className={cx('menu-list')}>
                           {/* Nam */}
                           <li className={cx('dropdown')}>
                              <Link to="/collection/nam" className={cx('menu-list-title')}>
                                 NAM
                              </Link>
                              <ul className={cx('dropdown-content')}>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Giày thể thao nam</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Sandal</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Dép</Link>
                                 </li>
                              </ul>
                           </li>
                           {/* Nữ */}
                           <li className={cx('dropdown')}>
                              <Link to="/collection/nu" className={cx('menu-list-title')}>
                                 NỮ
                              </Link>
                              <ul className={cx('dropdown-content')}>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Giày Thể Thao</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Sandal</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Giày Cao Gót</Link>
                                 </li>
                              </ul>
                           </li>
                           <li className={cx('dropdown')}>
                              <Link to="/" className={cx('menu-list-title')}>
                                 BÉ TRAI
                              </Link>
                              <ul className={cx('dropdown-content')}>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Giày Thể Thao</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Sandal</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Dép Bé Trai</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Giày tập đi</Link>
                                 </li>
                              </ul>
                           </li>
                           <li className={cx('dropdown')}>
                              <Link to="/" className={cx('menu-list-title')}>
                                 BÉ GÁI
                              </Link>
                              <ul className={cx('dropdown-content')}>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Giày Thể Thao</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Sandal</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Dép Bé Gái</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Giày Tập Đi</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Giày Búp Bê</Link>
                                 </li>
                              </ul>
                           </li>
                           <li className={cx('dropdown')}>
                              <Link to="/" className={cx('menu-list-title')}>
                                 PHỤ KIỆN
                              </Link>
                              <ul className={cx('dropdown-content')}>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Balo</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Balo Trẻ Em</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Túi Xách</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Ví</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Vớ Người Lớn</Link>
                                 </li>
                                 <li>
                                    <Link className={cx('menu-list-subtitle')}>Vớ Trẻ Em</Link>
                                 </li>
                              </ul>
                           </li>
                           <li className={cx('dropdown')}>
                              <Link to="/" className={cx('menu-list-title')}>
                                 MỚI & RESTOCK
                              </Link>
                           </li>
                           <li className={cx('dropdown')}>
                              <Link to="/" className={cx('menu-list-title')}>
                                 GIỚI THIỆU
                              </Link>
                           </li>
                           <li className={cx('dropdown')}>
                              <Link to="/" className={cx('menu-list-title')}>
                                 TIN TỨC
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>

               <div className={cx('profile-menu')}>
                  <div>
                     <Image iconName={'profileIcon'} />
                  </div>

                  <div>
                     <Image iconName={'heartIcon'} />
                  </div>

                  {/* <---- Cart btn ----> */}

                  <div className={cx('cart-btn')}>
                     <Image iconName={'shoppingCartIcon'} />
                     <div className={cx('cart-preview')}>
                        <MiniCart />
                     </div>
                  </div>
               </div>
            </nav>
         </div>

         <div className="flex flex-col justify-center items-center">{children}</div>
      </div>
   );
}

export default Navbar;
