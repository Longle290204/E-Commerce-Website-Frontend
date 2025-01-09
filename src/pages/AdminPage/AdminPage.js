import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faUsersGear } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AdminPage({ children }) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className={cx('w-screen overflow-hidden')}>
         <div className={cx('sidebar-header')}>
            <div className={cx('grid bg-[#1d597c] w-[280px] h-full place-items-center')}>
               <p className={cx('sidebar-header_Admin')}>Admin</p>
            </div>
         </div>
         <div className={cx('sidebar-body', 'overflow-auto')}>
            <div className={cx('bg-[#2c3e50]  h-screen w-[280px] overflow-auto')}>
               <ul className={cx('sidebar-menu_list')}>
                  <li>
                     <div className={cx('flex-col text-center mb-10')}>
                        <p className={cx('text-white text-4xl mt-3.6 mr-0 mb-6 ml-7 font-bold')}>Lê Việt Long</p>
                        <p className={cx('text-gray-400 -mt-[7px] mr-0 mb-6 ml-7 font-bold')}>longtk292@gmail.com</p>
                     </div>
                     <p className={cx('sidebar-menu_title', 'text-white mt-3.6 mr-0 mb-6 ml-7 font-bold')}>Trang chủ</p>
                     <ul className={cx('sidebar-menu_box')}>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="/admin" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faThLarge} />
                              Dashboard
                           </Link>
                        </li>
                     </ul>
                  </li>

                  <li>
                     <p className={cx('sidebar-menu_title', 'text-white', 'mt-3.6 mr-0 mb-6 ml-7 font-bold')}>Quản lý</p>
                     <ul className={cx('sidebar-menu_box')}>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="#" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faCircleUser} />
                              Tài khoản
                           </Link>
                        </li>
                        <li className={cx('sidebar-menu_item')}>
                           <div
                              className={cx('sidebar-menu_select', { open: isOpen })}
                              onClick={() => {
                                 setIsOpen(!isOpen);
                              }}
                           >
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faBookOpen} />
                              Sản phẩm
                           </div>

                           <ul
                              className={cx('sidebar-menu_sub-select', {
                                 open: isOpen,
                              })}
                           >
                              <li>
                                 <Link to="/admin/create-product" className={cx('sidebar-menu_sub-select-item')}>
                                    Thêm mới
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/admin/List-product" className={cx('sidebar-menu_sub-select-item')}>
                                    Danh sách
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="/admin/Category" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faLayerGroup} />
                              Danh mục
                           </Link>
                        </li>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="#" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faCartShopping} />
                              Đơn hàng
                           </Link>
                        </li>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="#" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faNewspaper} />
                              Bài viết
                           </Link>
                        </li>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="#" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faSliders} />
                              Slider
                           </Link>
                        </li>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="#" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faUsersGear} />
                              Nhân viên
                           </Link>
                        </li>
                        <li className={cx('slider-menu_item-underline')}></li>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="#" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faUser} />
                              Hồ sơ cá nhân
                           </Link>
                        </li>
                        <li className={cx('sidebar-menu_item')}>
                           <Link to="#" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faLock} />
                              Đổi mật khẩu
                           </Link>
                        </li>
                        <li className={cx('sidebar-menu_item', 'log-out')}>
                           <Link to="#" className={cx('sidebar-menu_item-text')}>
                              <FontAwesomeIcon className={cx('slider-menu_icon')} icon={faArrowRightFromBracket} />
                              Đăng xuất
                           </Link>
                        </li>
                     </ul>
                  </li>
               </ul>
            </div>
            <section className={cx('content', 'flex-grow bg-gray-100')}>{children}</section>
         </div>
      </div>
   );
}

export default AdminPage;
