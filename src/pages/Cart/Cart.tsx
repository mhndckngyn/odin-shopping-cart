import { useCart } from "../../cart/CartContext";
import { roundDecimal } from "../../utils";
import CartItem from "./CartItem";

export default function Cart() {
  const { cartItems, updateQuantity, deleteItem } = useCart();

  const subtotal = roundDecimal(
    cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0),
    2
  );
  const vat = roundDecimal(subtotal * 0.1, 2);
  const total = roundDecimal(subtotal + vat, 2);

  return (
    <div>
      <h1>Your cart</h1>

      {cartItems.length === 0 ? (
        <p>There is no item in the cart.</p>
      ) : (
        <p>Total item(s): {cartItems.length}</p>
      )}

      <div>
        {cartItems.map((item) => (
          <CartItem
            key={item.name}
            item={item}
            updateItem={updateQuantity}
            deleteItem={deleteItem}
          />
        ))}
      </div>

      <div>
        <h2>Order summary</h2>
        <div>
          <div>
            <p>Subtotal</p>
            <p data-testid="subtotal-value">
              {cartItems.length === 0 ? "-" : <>${subtotal}</>}
            </p>
          </div>
          <div>
            <p>VAT (10%)</p>
            <p data-testid="vat-value">
              {cartItems.length === 0 ? "-" : <>${vat}</>}
            </p>
          </div>
          <div>
            <p>Total</p>
            <p data-testid="total-value">
              {cartItems.length === 0 ? "-" : <>${total}</>}
            </p>
          </div>
        </div>

        <button>Checkout</button>
      </div>
    </div>
  );
}
