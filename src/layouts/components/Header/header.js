import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import images from "../../../assets/images/image";

function Header() {
    const cx = classNames.bind(styles);
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("header-hotline")}>
                    <div>
                        <span>Hotline: 0943418555</span>
                        <span> | </span>
                        <p>Liên hệ hợp tác</p>
                    </div>

                    <div></div>
                </div>

                <div className={cx("header-nav")}>
                    <Link>
                        <img
                            src={images.logo}
                            alt="Bitis"
                            className={cx("logo-bitis")}
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
