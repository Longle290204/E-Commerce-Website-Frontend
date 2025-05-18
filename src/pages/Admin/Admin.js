// import classNames from "classnames/bind";
// import styles from "./Admin.module.scss";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductList from "../../components/Products/ProductList/ProductList";

// const cx = classNames.bind(styles);

// function Admin() {
//     const [imageURL, setImageURl] = useState(null);
//     const [productName, setProductName] = useState("");
//     const [productPrice, setProductPrice] = useState("");
//     const [products, setProducts] = useState([]);
//     // Cập nhật sản phẩm ngay khi tạo phía admin
//     const [search, setSearch] = useState("");
//     const [countProduct, setCountProduct] = useState(0);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get(
//                     "http://localhost:3002/products"
//                 );
//                 setProducts(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.log(error.message);
//             }
//         };

//         fetchProducts();
//     }, [countProduct]);

//     // Create Product
//     const handleCreateProduct = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("image", imageURL);
//         formData.append("name", productName);
//         formData.append("price", productPrice);
//         // FormData là một đối tượng trong JavaScript được sử dụng để xây dựng dữ liệu dưới dạng multipart/form-data.
//         //  Đây là một định dạng đặc biệt cần thiết khi bạn muốn gửi cả file và dữ liệu text qua HTTP

//         try {
//             const response = await axios.post(
//                 "http://localhost:3002/products",
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );
//             const newProduct = response.data.data;
//             setProducts((prevProduct) => [...prevProduct, newProduct]);
//             setCountProduct((prevCount) => prevCount + 1);
//             console.log(newProduct);
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     // Delete Product
//     const handleDeleteProduct = (productId) => {
//         setProducts((prevProducts) =>
//             prevProducts.filter((product) => product.id !== productId)
//         );
//     };

//     // Search Product

//     const handleSearchFilterProduct = async () => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:3002/products/?search=${search}`
//             );
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     // Update Product

//     const handleUpdateProduct = (updateProduct) => {
//         setProducts((prevProducts) =>
//             prevProducts.map((product) =>
//                 product.id === updateProduct.id ? updateProduct : product
//             )
//         );
//     };

//     return (
//         <div className={cx("container")}>
//             <div className={cx("form-admin")}>
//                 <div>
//                     {/* Create product */}
//                     <form
//                         className={cx("form-admin-edit")}
//                         onSubmit={handleCreateProduct}
//                     >
//                         <div>
//                             <label htmlFor="file">Thêm ảnh: </label>
//                             <input
//                                 type="file"
//                                 id="file"
//                                 onChange={(e) => setImageURl(e.target.files[0])}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="text">Tên sản phẩm: </label>
//                             <input
//                                 type="text"
//                                 id="text"
//                                 onChange={(e) => setProductName(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="text">Giá: </label>
//                             <input
//                                 type="text"
//                                 id="text"
//                                 onChange={(e) =>
//                                     setProductPrice(e.target.value)
//                                 }
//                                 required
//                             />
//                         </div>
//                         <button type="submit">Tạo sản phẩm</button>
//                     </form>

//                     {/* Search product */}
//                     <form>
//                         <label>Search</label>
//                         <input
//                             type="text"
//                             placeholder="search"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </form>
//                 </div>

//                 <div>
//                     <ProductList
//                         products={products}
//                         onDelete={handleDeleteProduct}
//                         onUpdate={handleUpdateProduct}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Admin;
