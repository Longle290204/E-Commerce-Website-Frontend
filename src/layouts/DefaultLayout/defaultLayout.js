import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

function DefaultLayout() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("content")}></div>
            <div className={cx("container")}>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
