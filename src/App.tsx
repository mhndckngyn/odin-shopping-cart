import Header from "./layout/Header";
import { Outlet } from "react-router";
import { ProductContextProvider } from "./data/ProductContextProvider";
import CartContextProvider from "./cart/CartContextProvider";

export default function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <div>
          <Header />
          <Outlet />
        </div>
      </CartContextProvider>
    </ProductContextProvider>
  );
}
