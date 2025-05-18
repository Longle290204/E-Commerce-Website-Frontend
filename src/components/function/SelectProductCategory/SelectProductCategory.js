import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SelectProductCategory.module.scss";

const cx = classNames.bind(styles);

function SelectProductCategory({ onCategoryChange }) {
  const [selectedValue, setSelectedValue] = useState("Phân loại");
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseDown = (e) => {
    setIsOpen(!isOpen); // Đổi trạng thái mũi tên khi click vào select
  };

  const handleChange = (e) => {
    setIsOpen(false); // Đóng menu và mũi tên quay lại như cũ khi chọn một mục
    setSelectedValue(e.target.value);
    onCategoryChange(e.target.value);
  };

  const handleBlur = () => {
    setIsOpen(false); // Đóng menu và mũi tên quay lại khi mất focus
  };

  return (
    <div className={cx("select-wrapper", { open: isOpen })}>
      <label>
        <select
          name="gender"
          onMouseDown={handleMouseDown} // Loại bỏ focus khi click vào select
          onChange={handleChange}
          onBlur={handleBlur}
          value={selectedValue}
          className={cx("select")}
        >
          {selectedValue === "Phân loại" && (
            <option value="Phân loại">Phân loại</option>
          )}
          <option value="NAM">Nam</option>
          <option value="NU">Nữ</option>
          {/* <option value="Học sinh">Học sinh</option>
                    <option value="Trẻ em">Trẻ em</option> */}
        </select>
      </label>

      <label>
        <select>
          <option value="New Product">Sản phẩm mới</option>
          <option value="New Product">Sản phẩm bán chạy</option>
        </select>
      </label>
    </div>
  );
}

export default SelectProductCategory;
