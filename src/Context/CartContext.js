import { createContext, useState } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
   const [cartItems, setCartItems] = useState([]);
   const [cartTotal, setCartTotal] = useState(0);
   const [quantityProduct, setQuantityProduct] = useState(0);
   const [products, setProducts] = useState([]);

   return (
      <CartContext.Provider
         value={{
            cartItems,
            setCartItems,
            cartTotal,
            setCartTotal,
            products,
            setProducts,
            quantityProduct,
            setQuantityProduct,
         }}
      >
         {children}
      </CartContext.Provider>
   );
}

export default CartProvider;
