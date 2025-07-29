import { Minus, Plus, Trash2 } from "lucide-react";
import fruitImages from "../../assets/images/fruits";
import type { CartItem as CartItemData } from "../../constants/types";
import { useState } from "react";
import styled from "styled-components";
import { breakpoints, styling } from "../../constants/styling";
import { roundDecimal } from "../../utils";
import IconButton from "../../components/IconButton";

export default function CartItem({ item, updateItem, deleteItem }: Props) {
  const [quantity, setQuantity] = useState(String(item.quantity));

  const totalPrice = roundDecimal(item.price * item.quantity, 2);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value);
    if (!e.target.validity.patternMismatch && value !== "") {
      updateItem(item.name, parseInt(e.target.value));
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.validity.patternMismatch || e.target.value == "") {
      setQuantity(String(item.quantity));
    }
  };
  const handleIncrement = () => {
    const newQuantity = item.quantity + 1;
    setQuantity(String(newQuantity));
    updateItem(item.name, newQuantity);
  };
  const handleDecrement = () => {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      setQuantity(String(newQuantity));
      updateItem(item.name, newQuantity);
    }
  };
  const handleDeleteItem = () => deleteItem(item.name);

  return (
    <CartItemContainer data-testid="cart-item">
      <div className="img-container">
        <img
          src={fruitImages[item.imageSrc]}
          alt={`Illustration of a(n) ${item.name}`}
          width={"60"}
        />
      </div>

      <div className="card-main">
        <div className="name-container">
          <p className="name">{item.name}</p>
          <DeleteButton
            aria-label="Delete from cart"
            onClick={handleDeleteItem}
          >
            <Trash2 />
          </DeleteButton>
        </div>

        <div className="price-control">
          <div className="control-container">
            <IconButton
              onClick={handleDecrement}
              aria-label="Decrement quantity"
            >
              <Minus />
            </IconButton>

            <input
              type="text"
              value={quantity}
              onBlur={handleBlur}
              onChange={handleUpdate}
              inputMode="numeric"
              pattern="[0-9]+"
            />
            <IconButton
              onClick={handleIncrement}
              aria-label="Increment quantity"
            >
              <Plus />
            </IconButton>
          </div>
          <p className="price" data-testid="price-value">
            Item total: ${totalPrice}
          </p>
        </div>
      </div>
    </CartItemContainer>
  );
}

type Props = {
  item: CartItemData;
  updateItem: (name: string, value: number) => void;
  deleteItem: (name: string) => void;
};

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;

  background-color: ${styling.backgroundLight};
  border: 1px solid ${styling.border};
  padding: 1rem;
  border-radius: 16px;

  .name,
  .price {
    font-weight: 600;
  }

  .name-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .img-container {
    padding: 1rem;
    display: grid;
    place-items: center;

    img {
      width: 3.5rem;
    }
  }

  .card-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .price-control {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .control-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input {
    width: 5rem;
    border: 1px solid ${styling.border};
    color: ${styling.foreground};
    border-radius: 24px;
    padding: 0.5rem;
    font-size: 1rem;
    text-align: center;
  }

  @media (min-width: ${breakpoints.tablet}) {
    gap: 1rem;

    .card-main {
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const DeleteButton = styled(IconButton)`
  height: 2rem;
  width: 2rem;

  > * {
    width: 1.2rem;
    height: 1.2rem;
    color: hsl(0, 75%, 50%);
  }
`;
