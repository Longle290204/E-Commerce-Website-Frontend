import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import ProductSearch from '../ProductSearch/ProductSearch';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../../layouts/components/Popper';
import useDebounce from '../../../hooks/useDebounce';
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(false);
   const [lastScrollTop, setLastScrollTop] = useState(0);
   const [loading, setLoading] = useState(false);
   const inputRef = useRef(null);

   const debounced = useDebounce(searchValue, 500);

   // Bắt sự kiện keydown để ẩn kết quả search
   useEffect(() => {
      // Bắt sự kiện keydown để ẩn kết quả search
      const handleKeyDown = (e) => {
         if (e.key === 'Escape') {
            setShowResult(false);
            // Bỏ active khỏi input khi ấn ESC
            if (inputRef.current) {
               inputRef.current.blur();
            }
         }
      };

      // Bắt sự kiện keydown
      document.addEventListener('keydown', handleKeyDown);

      return () => {
         document.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   // Bắt sự kiện scroll để ẩn kết quả search
   useEffect(() => {
      const handleScroll = () => {
         const currentScroll = window.scrollY || document.documentElement.scrollTop;

         if (currentScroll > 300) {
            handleHideResult();
         }
         setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
      };

      document.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [lastScrollTop]);

   // Lấy dữ liệu từ API
   useEffect(() => {
      if (!debounced.trim()) {
         setSearchResult([]);
         return;
      }
      setLoading(true);

      const axiosSearch = async () => {
         try {
            const response = await axios.get(`http://localhost:3002/products?search=${searchValue}`);
            setSearchResult(response.data);
            console.log('searchValue', response.data);

            setLoading(false);
         } catch (error) {
            setLoading(false);
         }
      };

      axiosSearch();
   }, [debounced]);

   // Ẩn kết quả search
   const handleHideResult = () => {
      setShowResult(false);
      inputRef.current.blur();
   };

   // Để tróng kết quả search khi component được mount
   useEffect(() => {
      setTimeout(() => {
         setSearchResult([]);
      }, 0);
   }, []);

   // Bỏ active khỏi input khi ấn space
   const handleSpace = (e) => {
      const searchValue = e.target.value;
      if (!searchValue.startsWith(' ')) {
         setSearchValue(searchValue);
      }
   };

   return (
      <div className={cx('box-search', 'relative w-2/3 ml-auto mr-auto mt-6')}>
         <HeadlessTippy
            appendTo={() => document.body}
            interactive
            visible={showResult && searchResult.length > 0}
            content="Tìm kiếm"
            delay={[800, 0]}
            placement="bottom"
            render={(attrs) => (
               <div className={cx('search-result', 'w-3/3 ml-auto mr-auto')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                     {searchResult.map((result, index) => (
                        <ProductSearch key={index} data={result} />
                     ))}
                  </PopperWrapper>
               </div>
            )}
            onClickOutside={handleHideResult}
         >
            <div className={cx('search')}>
               <input
                  ref={inputRef}
                  value={searchValue}
                  placeholder="Tìm kiếm sản phẩm của bạn..."
                  className={cx('placeholder:text-[#000000]')}
                  spellCheck={false}
                  autoComplete="new-password"
                  onChange={handleSpace}
                  onFocus={() => setShowResult(true)}
               />

               {/* Nếu không có giá trị search và không đang loading thì hiển thị nút clear */}
               {!!searchValue && !loading && (
                  <button
                     className={cx('clear')}
                     onClick={() => {
                        setSearchValue('');
                        inputRef.current.focus();
                        setSearchResult([]);
                     }}
                  >
                     <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{
                           color: 'rgba(166, 167, 171,1)',
                        }}
                     />
                  </button>
               )}
               {/* Nếu đang loading thì hiển thị icon loading */}
               {!!loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

               <button className={cx('search-btn')}>
                  <div className={cx('search-icon')}>
                     <FontAwesomeIcon icon={faSearch} />
                  </div>
               </button>
            </div>
         </HeadlessTippy>
      </div>
   );
}

ProductSearch.PropTypes = {
   data: PropTypes.object,
};

export default Search;
