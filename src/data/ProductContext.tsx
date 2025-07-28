import { createContext, useContext } from "react";
import type { ProductData } from "../constants/types";

export const ProductContext = createContext<Context>({
  products: [],
  isLoading: true,
  error: null,
});

type Context = {
  products: ProductData[];
  error: string | null;
  isLoading: boolean;
};

export const useProducts = () => useContext(ProductContext);
