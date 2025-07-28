import type { RouteObject } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import Products from "./pages/Products/Products.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import ErrorPage from "./layout/ErrorPage.tsx";

export const paths = {
  home: "/",
  products: "products",
  cart: "cart",
};

export const routes: RouteObject[] = [
  {
    path: "/",
    ErrorBoundary: ErrorPage,
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: paths.products, Component: Products },
      { path: paths.cart, Component: Cart },
    ],
  },
];
