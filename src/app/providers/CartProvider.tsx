import { CartItem, Product } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartContextTypes = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextTypes>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
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

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
