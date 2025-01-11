import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';
import Navbar from '../components/Header/Header-nav/navbar';

function DefaultLayout({ children }) {
   const cx = classNames.bind(styles);

   return (
      <div className={cx('wrapper')}>
         <Header />
         <div className={cx('container')}>
            <Navbar>
               {children}
               <Footer />
            </Navbar>
         </div>
      </div>
   );
}

DefaultLayout.prototypes = {
   children: PropTypes.node.isRequired,
};

export default DefaultLayout;
