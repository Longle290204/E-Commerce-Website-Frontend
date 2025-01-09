import CreateProductAdmin from "../../../components/function/CreateProductAdmin/CreateProductAdmin";
import classNames from "classnames/bind";
import styles from "./CreateProductPage.module.scss";

const cx = classNames.bind(styles);

function CreateProductPage() {
  return (
    <div className={cx("Admin-page-123")}>
      {/* <Admin /> */}
      <CreateProductAdmin />
    </div>
  );
}

export default CreateProductPage;
