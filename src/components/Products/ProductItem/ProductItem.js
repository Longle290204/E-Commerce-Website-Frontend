import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";

const cx = classNames.bind(styles);

function ProductItem({ product, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editPrice, setEditPrice] = useState(product.price);
  const [editImageURL, setImageURl] = useState(product.imageURL);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("image", editImageURL);
    formData.append("name", editName);
    formData.append("price", editPrice);
    try {
      const response = await axios.put(
        `http://localhost:3002/products/${product.id}/image/name/price`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data);
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3002/products/${productId}`);
      console.log(`Deleted product with ID: ${productId}`);
      onDelete(product.id);
      // Cập nhật lại danh sách sản phẩm sau khi xóa
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={cx("product-item")} key={product.id}>
      {isEditing ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageURl(e.target.files[0])}
          />

          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          <input
            type="text"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <img
            src={product.imageURL}
            alt={product.name}
            style={{ width: "100px", height: "100px" }}
          />
          <p>{product.name}</p>
          <p>{product.price}</p>

          {/* Icon xóa sản phẩm */}
          <FontAwesomeIcon
            className={cx("delete-icon")}
            icon={faTrashAlt}
            onClick={() => handleDelete(product.id)} // Truyền ID sản phẩm khi click
          />

          <FontAwesomeIcon
            className={cx("edit-icon")}
            icon={faPenToSquare}
            onClick={handleEdit}
          />
        </>
      )}
    </div>
  );
}

export default ProductItem;
