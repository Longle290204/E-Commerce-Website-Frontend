import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import ProductSearch from '../ProductSearch/ProductSearch';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../../layouts/components/Popper';
import useDebounce from '../../../hooks/useDebounce';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(false);
   const [loading, setLoading] = useState(false);
   const inputRef = useRef(null);

   const debouncedSearch = useDebounce(searchValue, 500);

   // Ẩn kết quả tìm kiếm
   const handleHideResult = () => {
      setShowResult(false);
      if (inputRef.current) {
         inputRef.current.blur();
      }
   };

   // Xử lý khi người dùng nhấn phím ESC
   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.key === 'Escape') {
            handleHideResult();
         }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
   }, []);

   // Ẩn kết quả tìm kiếm khi cuộn trang
   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 300) {
            handleHideResult();
         }
      };

      document.addEventListener('scroll', handleScroll);
      return () => document.removeEventListener('scroll', handleScroll);
   }, []);

   // Gọi API tìm kiếm
   useEffect(() => {
      if (!debouncedSearch.trim()) {
         setSearchResult([]);
         return;
      }

      const fetchSearchResults = async () => {
         setLoading(true);
         try {
            const response = await axios.get(`http://localhost:3002/products?search=${debouncedSearch}`);
            setSearchResult(response.data);
         } catch (error) {
            console.error('Error fetching search results:', error);
         }
         setLoading(false);
      };

      fetchSearchResults();
   }, [debouncedSearch]);

   // Không cho phép nhập khoảng trắng đầu dòng
   const handleInputChange = (e) => {
      const value = e.target.value;
      if (!value.startsWith(' ')) {
         setSearchValue(value);
      }
   };

   return (
      <div className={cx('box-search', 'relative w-2/3 mx-auto mt-6')}>
         <HeadlessTippy
            appendTo={() => document.body}
            interactive
            visible={showResult && searchResult.length > 0}
            content="Tìm kiếm"
            delay={[800, 0]}
            placement="bottom"
            render={(attrs) => (
               <div className={cx('search-result', 'w-3/3 mx-auto')} tabIndex="-1" {...attrs}>
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
                  onChange={handleInputChange}
                  onFocus={() => setShowResult(true)}
               />

               {/* Nút clear */}
               {searchValue && !loading && (
                  <button
                     className={cx('clear')}
                     onClick={() => {
                        setSearchValue('');
                        setSearchResult([]);
                        inputRef.current?.focus();
                     }}
                  >
                     <FontAwesomeIcon icon={faCircleXmark} style={{ color: 'rgba(166, 167, 171,1)' }} />
                  </button>
               )}

               {/* Icon loading */}
               {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

               <button className={cx('search-btn')}>
                  <FontAwesomeIcon icon={faSearch} />
               </button>
            </div>
         </HeadlessTippy>
      </div>
   );
}

ProductSearch.propTypes = {
   data: PropTypes.object.isRequired,
};

export default Search;
