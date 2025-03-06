import { createContext, useState } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
   const [cart, setCart] = useState({ cartItems: [], cartTotal: 0 });

   console.log('cartItem123', cart);

   const addToCart = (newItem) => {
      setCart((prevCart) => ({
         ...prevCart, // Giữ nguyên các giá trị khác của cart
         cartItems: [...prevCart.cartItems, newItem], // Cập nhật cartItems
         cartTotal: prevCart.cartTotal + newItem.price, // Cập nhật tổng tiền nếu cần
      }));
   };

   return <CartContext.Provider value={{ cart, addToCart, setCart }}>{children}</CartContext.Provider>;
}

export default CartProvider;
