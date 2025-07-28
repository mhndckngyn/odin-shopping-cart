import React, { useState } from "react";
import type { CartItem, ProductData } from "../constants/types";
import { CartContext } from "./CartContext";

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (product: ProductData, quantity: number) => {
    if (cartItems.find((item) => item.name === product.name)) {
      updateQuantity(product.name, (prev) => prev + quantity);
    } else {
      const newItem: CartItem = {
        ...product,
        quantity,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const deleteItem = (name: string) => {
    const removed = cartItems.filter((item) => item.name !== name);
    setCartItems(removed);
  };

  const updateQuantity = (
    name: string,
    to: number | ((prev: number) => number)
  ) => {
    const updated = cartItems.map((item) => {
      if (item.name === name) {
        if (typeof to === "number") {
          item.quantity = to;
        } else {
          item.quantity = to(item.quantity);
        }
      }

      return item;
    });

    setCartItems(updated);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, deleteItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
