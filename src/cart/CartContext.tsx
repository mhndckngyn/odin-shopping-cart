import { createContext, useContext } from "react";
import type { CartItem, ProductData } from "../constants/types";

export const CartContext = createContext<Context>({
  cartItems: [],
  addItem: () => {},
  deleteItem: () => {},
  updateQuantity: () => {},
});

type Context = {
  cartItems: CartItem[];
  addItem: (product: ProductData, quantity: number) => void;
  deleteItem: (name: string) => void;
  updateQuantity: (
    name: string,
    to: number | ((prev: number) => number)
  ) => void;
};

export const useCart = () => useContext(CartContext);
