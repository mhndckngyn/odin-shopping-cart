import { useEffect, useState } from "react";
import API_ENDPOINT from "./api";
import type { ProductData } from "../constants/types";
import { ProductContext } from "./ProductContext";
import axios from "axios";

export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/fruits`);
        const data: ProductData[] = response.data;
        setProducts(data);
      } catch {
        setError("Error while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductContext.Provider>
  );
}
