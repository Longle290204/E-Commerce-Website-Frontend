import React from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import classNames from 'classnames/bind';
import styles from './FilterOption.module.scss';

const cx = classNames.bind(styles);

function FilterOption() {
   const [sizes, setSizes] = useState([]);
   const [priceRange, setPriceRange] = useState([0, 2000000]);
   const [showSizePopup, setShowSizePopup] = useState(false);
   const [showPricePopup, setShowPricePopup] = useState(false);

   useEffect(() => {
      const generatedSizes = [];
      for (let i = 24; i <= 45; i++) {
         generatedSizes.push(i);
      }

      setSizes(generatedSizes);
   }, []);

   return (
      <div>
         <div className="grid grid-cols-4 gap-4 w-full">
            <div className="grid grid-cols-2 col-span-1 gap-4">
               <Tippy
                  interactive={true}
                  visible={showSizePopup}
                  hideOnClick="false"
                  onClickOutside={() => setShowSizePopup(false)}
                  trigger="click"
                  placement="bottom-start"
                  render={(attrs) => (
                     <div
                        className="bg-white p-4 mt-2 border shadow rounded w-[400px]"
                        tabIndex="-1"
                        style={{ transform: 'translateX(0px)' }} // giữ nguyên vị trí
                        {...attrs}
                     >
                        <div className="flex flex-wrap gap-2">
                           {sizes.map((size) => (
                              <div
                                 key={size}
                                 className="w-5 h-5 p-[12px] text-2xl flex items-center justify-center border border-gray-400 rounded-full cursor-pointer hover:border-black"
                              >
                                 {size}
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               >
                  <div className=" bg-white p-2 border border-[#ccc] rounded" onClick={() => setShowSizePopup((prev) => !prev)}>
                     Kích thước
                  </div>
               </Tippy>

               <Tippy
                  interactive={true}
                  onClickOutside={() => setShowPricePopup(false)}
                  hideOnClick="false"
                  trigger="click"
                  visible={showPricePopup}
                  placement="bottom-start"
                  render={(attrs) => (
                     <div
                        className="w-[400px]"
                        tabIndex="-1"
                        style={{ transform: 'translateX(-8px)' }} // giữ nguyên vị trí
                        {...attrs}
                     >
                        <div className="p-4 border shadow rounded w-full bg-white mt-2 ml-[-40%]">
                           <div className="mb-2 text-center font-medium" onClick={() => setShowPricePopup((prev) => !prev)}>
                              Giá từ: {priceRange[0].toLocaleString()} đ - {priceRange[1].toLocaleString()} đ
                           </div>

                           <ReactSlider
                              className={cx('horizontal-slider')}
                              thumbClassName="thumb"
                              trackClassName="track"
                              value={priceRange}
                              onChange={setPriceRange}
                              min={0}
                              max={2000000}
                              step={10000}
                              pearling
                              minDistance={50000}
                           />
                        </div>
                     </div>
                  )}
               >
                  <div className=" bg-white p-2 border border-[#ccc] rounded" onClick={() => setShowPricePopup((prev) => !prev)}>
                     Giá
                  </div>
               </Tippy>
            </div>
         </div>
      </div>
   );
}

export default FilterOption;
