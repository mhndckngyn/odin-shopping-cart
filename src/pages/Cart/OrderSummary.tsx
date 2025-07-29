import styled from "styled-components";
import type { CartItem } from "../../constants/types";
import { roundDecimal } from "../../utils";
import { styling } from "../../constants/styling";

export default function OrderSummary({ cartItems }: Props) {
  const subtotal = roundDecimal(
    cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0),
    2
  );
  const vat = roundDecimal(subtotal * 0.1, 2);
  const total = roundDecimal(subtotal + vat, 2);

  return (
    <StyledContainer>
      <h2>Order summary</h2>
      <div className="summary-main">
        <SummaryItem>
          <p className="label">Subtotal</p>
          <p data-testid="subtotal-value">
            {cartItems.length === 0 ? "-" : <>${subtotal}</>}
          </p>
        </SummaryItem>
        <SummaryItem>
          <p className="label">VAT (10%)</p>
          <p data-testid="vat-value">
            {cartItems.length === 0 ? "-" : <>${vat}</>}
          </p>
        </SummaryItem>
        <Divider />
        <SummaryItem>
          <p className="label">Total</p>
          <p data-testid="total-value">
            {cartItems.length === 0 ? "-" : <>${total}</>}
          </p>
        </SummaryItem>
      </div>
      <button className="checkout-btn">Checkout</button>
    </StyledContainer>
  );
}

type Props = {
  cartItems: CartItem[];
};

const StyledContainer = styled.div`
  height: max-content;
  background-color: ${styling.backgroundLight};
  border: 1px solid ${styling.border};
  padding: 2rem;
  border-radius: 16px;

  h2 {
    margin-block: 0;
  }

  .summary-main {
    margin-block: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .checkout-btn {
    width: 100%;
    font-size: 1rem;
    background-color: ${styling.highlight};
    border: none;
    color: ${styling.background};
    border-radius: 2rem;
    padding: 0.7rem;
    font-weight: 600;

    &:hover {
      background-color: ${styling.highlightMedium};
    }

    &:active {
      background-color: ${styling.highlightDark};
    }
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;

  .label {
    font-weight: 600;
  }
`;

const Divider = styled.div`
  margin-block: 0.5rem;
  height: 1px;
  border-top: 1px solid ${styling.border};
`;
