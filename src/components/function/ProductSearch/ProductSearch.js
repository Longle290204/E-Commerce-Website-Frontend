import classNames from 'classnames/bind';
import styles from './ProductSearch.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function ProductSearch({ data }) {
   return (
      <Link to={`/products/${data.id}`} className={cx('wrapper')}>
         <img className={cx('avatar')} src={data.mainImage} alt={data.name} />
         <div className={cx('info', 'overflow-hidden')}>
            <h4 className={cx('name', 'text-2xl font-normal')}>
               <span>{data.name}</span>
            </h4>
            <span className={cx('price')}>{data.price}</span>
         </div>
      </Link>
   );
}

ProductSearch.propTypes = {
   data: PropTypes.object.isRequired,
};

export default ProductSearch;
