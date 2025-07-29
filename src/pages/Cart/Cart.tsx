import styled from "styled-components";
import { useCart } from "../../cart/CartContext";
import { breakpoints, styling } from "../../constants/styling";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

export default function Cart() {
  const { cartItems, updateQuantity, deleteItem } = useCart();

  return (
    <CartContainer>
      <div>
        <h1>Your cart</h1>
        <div className="item-count">
          {cartItems.length === 0 ? (
            <p>There is no item in the cart.</p>
          ) : (
            <p>Total item(s): {cartItems.length}</p>
          )}
        </div>
        <div className="main-content">
          {cartItems.length > 0 && (
            <div className="item-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.name}
                  item={item}
                  updateItem={updateQuantity}
                  deleteItem={deleteItem}
                />
              ))}
            </div>
          )}
          <OrderSummary cartItems={cartItems} />
        </div>
      </div>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  padding: 1.5rem 1rem 2rem;

  > div:first-child {
    width: 90%;
    max-width: 1500px;
    margin-inline: auto;
  }

  h1 {
    margin-block: 0;
  }

  .item-count {
    margin-top: 0.5rem;
    color: ${styling.foregroundLight};
  }

  .main-content {
    margin-top: 1.5rem;
    display: grid;
    gap: 1rem;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    .main-content {
      grid-template-columns: 1.5fr 1fr;
    }
  }
`;
