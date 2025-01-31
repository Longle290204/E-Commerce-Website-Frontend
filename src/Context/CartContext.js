import { createContext, useState } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
   const [cartItems, setCartItems] = useState([]);

   const addToCart = (newItem) => {
      setCartItems((prevItems) => [...prevItems, newItem]);
   };

   return <CartContext.Provider value={{ cartItems, addToCart, setCartItems }}>{children}</CartContext.Provider>;
}

export default CartProvider;
