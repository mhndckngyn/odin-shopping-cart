import { Outlet } from "react-router";
import styled from "styled-components";
import CartContextProvider from "./cart/CartContextProvider";
import { styling } from "./constants/styling";
import { ProductContextProvider } from "./data/ProductContextProvider";
import Header from "./layout/Header";

export default function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <AppContainer>
          <Header />
          <Main>
            <Outlet />
          </Main>
        </AppContainer>
      </CartContextProvider>
    </ProductContextProvider>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  color: ${styling.foreground};
  background-color: ${styling.background};
  flex-grow: 1;

  display: flex;

  > * {
    flex-grow: 1;
  }
`;
