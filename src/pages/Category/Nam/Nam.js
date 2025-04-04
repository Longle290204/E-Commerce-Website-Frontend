import { useEffect, useState } from "react";
import SlideBanner from "../../../components/SlideBanner/SlideBannerImage/SlideBaner";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Nam.module.scss";

const cx = classNames.bind(styles);

function NamCategory() {
    const [slideBanners, setSlideBanner] = useState([]);
    const [products, setProducts] = useState([]);
    const [sizeSelected, setSizeSelected] = useState([]);

    const sizes = [
        24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
        42, 43, 44, 45,
    ];

    useEffect(() => {
        const fetchSlidBanner = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3002/slide-banner/slidebanners"
                );
                setSlideBanner(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchProductNam = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3002/products/?category=NAM`
                );
                setProducts(response.data);
            } catch (error) {
                console.log(error.messages);
            }
        };
        fetchSlidBanner();
        fetchProductNam();
    }, []);

    const handleSizeChange = (size) => {
        setSizeSelected((prevSelected) =>
            prevSelected.includes(size)
                ? prevSelected.filter((s) => s !== size)
                : [...prevSelected, size]
        );
    };
    console.log(sizeSelected);
    return (
        <div>
            <SlideBanner slideBanners={slideBanners} />
            <div className={cx("container")}>
                <div className={cx("color-filter")}>
                    <div>Màu sắcadadasdasdasd</div>
                </div>
                <div className={cx("size-filter")}>
                    <div>Kích thước</div>
                    {sizes.map((size) => (
                        <label
                            className={cx(
                                "size-label",
                                sizeSelected.includes(size) &&
                                    "size-label_checked"
                            )}
                        >
                            <input
                                type="checkbox"
                                value={size}
                                onChange={() => handleSizeChange(size)}
                                checked={sizeSelected.includes(size)}
                            />
                            {size}
                        </label>
                    ))}
                    <div>Giá</div>
                </div>
                <div className={cx("arrange-price-filter")}>Sắp xếp theo</div>
                <section className={cx("product-section")}>
                    <div className={cx("product-list")}>
                        {products.map((product) => (
                            <article className={cx("product-item")}>
                                <img
                                    className={cx("product-image")}
                                    src={product.imageURL}
                                    alt={product.name}
                                />
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default NamCategory;
