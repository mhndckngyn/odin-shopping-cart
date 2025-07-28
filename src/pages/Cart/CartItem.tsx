import { Minus, Plus, Trash2 } from "lucide-react";
import fruitImages from "../../assets/images/fruits";
import type { CartItem as CartItemData } from "../../constants/types";
import { useState } from "react";

export default function CartItem({ item, updateItem, deleteItem }: Props) {
  const [quantity, setQuantity] = useState(String(item.quantity));

  const totalPrice = item.price * item.quantity;

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
    <div data-testid="cart-item">
      <p>{item.name}</p>
      <p data-testid="price-value">${totalPrice}</p>
      <img
        src={fruitImages[item.imageSrc]}
        alt={`Illustration of a(n) ${item.name} fruit`}
      />

      <div>
        <input
          type="text"
          value={quantity}
          onBlur={handleBlur}
          onChange={handleUpdate}
          inputMode="numeric"
          pattern="[0-9]+"
        />
        <button onClick={handleIncrement} aria-label="Increment quantity">
          <Plus />
        </button>
        <button onClick={handleDecrement} aria-label="Decrement quantity">
          <Minus />
        </button>
      </div>
      <button aria-label="Delete from cart" onClick={handleDeleteItem}>
        <Trash2 />
      </button>
    </div>
  );
}

type Props = {
  item: CartItemData;
  updateItem: (name: string, value: number) => void;
  deleteItem: (name: string) => void;
};
