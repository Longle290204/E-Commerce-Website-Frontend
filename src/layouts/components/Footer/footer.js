import { useState } from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames/bind';
import Image from '../../images/image';
import images from '../../../assets/images/image';

const cx = classNames.bind(styles);

function Footer() {
   const [input, setInput] = useState('');

   return (
      <div className="bg-[#212026] text-white py-14 w-full">
         <div className={cx('default-layout', 'grid grid-cols-5 gap-4 p-4 text-white w-[1340px] mx-auto')}>
            <div className="grid grid-cols-2 col-span-3 gap-4 ">
               {/* column 1 */}
               <div className="col-span-1 border-r-2 border-[#fe5100] mr-[15px]">
                  <h1 className="inline-block text-7xl bg-[#fe5100] rounded-lg mb-9">LeVions</h1>
                  <h2 className="text-4xl">Shop giày số 1 Việt Nam</h2>
               </div>

               {/* column 2 */}
               <div className="grid col-span-1">
                  <h3>Bạn cần hỗ trợ gì?</h3>
                  <ul className="flex flex-col gap-8">
                     <li>Hotline: 0943418555</li>
                     <li>Địa chỉ: 449 Cổ Nhuế, phường Cổ Nhuế, Hà Nội</li>
                     <li>Email: Longtk292@gmail.com</li>
                  </ul>
                  <ul className={cx('social-list', 'flex gap-4')}>
                     <li>
                        <a href="https://facebook.com" aria-label="Facebook">
                           <Image iconName="facebookIcon" />
                        </a>
                     </li>
                     <li>
                        <a href="https://twitter.com" aria-label="Twitter">
                           <img className="w-[20px] h-[20px]" src={images.twiter} alt="Twitter" />
                        </a>
                     </li>
                     <li>
                        <a href="https://youtube.com" aria-label="YouTube">
                           <img className="w-[20px] h-[20px]" src={images.youtube} alt="YouTube" />
                        </a>
                     </li>
                     <li>
                        <a href="https://instagram.com" aria-label="Instagram">
                           <Image iconName="instagram" />
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
            <div className="grid grid-cols-2 col-span-2 gap-4 ">
               {/* column 3 */}
               <div className="grid col-span-1">
                  <h3 className="mb-12">Hướng dẫn mua hàng</h3>
                  <ul className="flex flex-col gap-4">
                     <li>
                        <a href="/home">Trang chủ</a>
                     </li>
                     <li>
                        <a href="/about">Giới thiệu</a>
                     </li>
                     <li>
                        <a href="/category">Danh mục</a>
                     </li>
                     <li>
                        <a href="/news">Tin tức</a>
                     </li>
                     <li>
                        <a href="/contact">Liên hệ</a>
                     </li>
                     <li>
                        <a href="/guide">Hướng dẫn sử dụng</a>
                     </li>
                  </ul>
               </div>

               {/* column 4 */}
               <div className="col-span-1">
                  <h3 className="mb-12">Đăng ký</h3>
                  <p className="mb-8">Tham giá vào cộng đồng của chúng tôi nhận những cập nhật mới</p>
                  <div className="flex flex-col gap-4">
                     <input
                        className="text-black p-2 rounded-md"
                        placeholder="Nhập email của bạn"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                     />
                     <button className="bg-[#fe5100] text-white py-2 px-4 rounded-md mt-4">Đăng ký</button>
                  </div>
               </div>
            </div>
         </div>

         <p className="text-center text-xl text-[#999] mt-16">
            © 2025 - All rights reserved by F1GENZ TECHNOLOGY CO., LTD. Powered by Haravan
         </p>
      </div>
   );
}

export default Footer;
