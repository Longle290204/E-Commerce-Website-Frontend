import ProductItem from "../ProductItem/ProductItem";
import classNames from "classnames/bind";
import styles from "./ProductList.module.scss";

const cx = classNames.bind(styles);

function ProductList({ products, onDelete, onUpdate }) {
  return (
    <div className={cx("product-list")}>
      <ul className={cx("product-item")}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductItem
              product={product}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
