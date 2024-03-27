import { CartItem, Product } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";

type CartContextTypes = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextTypes>({
  items: [],
  addItem: () => {},
});

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    console.log(product);
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
