import { CartItem, Product } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

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
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  console.log(items);

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
