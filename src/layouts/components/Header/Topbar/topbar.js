import classNames from "classnames/bind";
import styles from "./TopBar.module.scss";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Wrapper as PopperWrapper } from "../../Popper";

function TopBar() {
  const cx = classNames.bind(styles);
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        {/* Top Bar */}
        <div className={cx("top-bar")}>
          <div className={cx("header-hotline")}>
            <div className={cx("hotline")}>
              <span className={cx("hot-line")}>
                Hotline:
                <span className={cx("phone-number")}>0943418555</span>
                <span>(8h -- 21h30)</span>
              </span>

              <a href="/" className={cx("contact-text")}>
                Liên hệ hợp tác
              </a>
            </div>

            <div className={cx("box-other-buy")}>
              <ul className={cx("other-buy")}>
                <li>
                  <a href="/" className={cx("link-buy")}>
                    Tìm của hàng
                    <span
                      className={cx("vertical-lines")}
                      onClick={(e) => e.preventDefault()}
                      tabIndex="0"
                    ></span>
                  </a>
                </li>

                <li>
                  <a href="/" className={cx("link-buy")}>
                    Kiểm tra đơn hàng
                    <span
                      className={cx("vertical-lines")}
                      onClick={(e) => e.preventDefault()}
                      tabIndex="0"
                    ></span>
                  </a>
                </li>

                <li>
                  <a href="/" className={cx("link-buy")}>
                    Mua hàng tại Shopify
                    <span
                      className={cx("vertical-lines")}
                      onClick={(e) => e.preventDefault()}
                      tabIndex="0"
                    ></span>
                  </a>
                </li>
              </ul>

              <Tippy
                className={cx("box-language")}
                // visible={true}
                interactive={true}
                hideOnClick="toggle"
                trigger="click"
                render={(attrs) => (
                  <div
                    className={cx("option-language")}
                    tabIndex="-1"
                    {...attrs}
                  >
                    <PopperWrapper>
                      <div className={cx("flag-vn")}>
                        <span>VN</span>
                      </div>

                      <div className={cx("flag-en")}>
                        <span>EN</span>
                      </div>
                    </PopperWrapper>
                  </div>
                )}
              >
                <div className={cx("language")}>
                  <span className={cx("Vn-chevron")}>
                    <span className={cx("VN")}>VN</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={cx("chevronDown")}
                    />
                  </span>
                </div>
              </Tippy>
              <a href="/" className={cx("B2B-link")}>
                <img
                  className={cx("B2B-img")}
                  src="https://file.hstatic.net/1000230642/file/b2b_161ba831bf784bd3b60d4787af503cb2.jpg"
                  alt="B2B-image"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
