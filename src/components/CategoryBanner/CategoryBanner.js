import React from 'react';
import classNames from 'classnames/bind';
import syles from './CategoryBanner.module.scss';
import Link from 'antd/es/typography/Link';
import imgMale from '../../assets/images/image-category-male.webp';
import imgFemale from '../../assets/images/image-category-female.webp';
import imgKid from '../../assets/images/image-category-kid.jpg';

const cx = classNames.bind(syles);

function CategoryBanner() {
   return (
      <div>
         <div className={cx('layout', 'grid grid-cols-3 gap-10')}>
            <div className={cx('image', 'col-span-1')}>
               <img src={imgMale} alt="Giày nam" className="w-[436px] h-[440px] object-cover" />
               <p className={cx('title-category')}>Nam</p>
               <Link className={cx('title-category_redirect')}>Sản phẩm cho nam</Link>
            </div>

            <div className={cx('image', 'col-span-1')}>
               <img src={imgFemale} alt="Giày nữ" className="w-[436px] h-[440px] object-cover" />
               <p className={cx('title-category')}>Nữ</p>
               <Link className={cx('title-category_redirect')}>Sản phẩm cho nữ</Link>
            </div>

            <div className={cx('image', 'col-span-1')}>
               <img src={imgKid} alt="Giày bé" className="w-[436px] h-[440px] object-cover object-bottom" />
               <p className={cx('title-category')}>Trẻ em</p>
               <Link className={cx('title-category_redirect')}>Sản phẩm cho trẻ em</Link>
            </div>
         </div>
      </div>
   );
}

export default CategoryBanner;
