import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import fruitImages from "../../assets/images/fruits";
import type { ProductData } from "../../constants/types";

export default function ProductCard({ product, addToCart }: Props) {
  const { name, price, family, imageSrc } = product;
  const [quantity, setQuantity] = useState("1");

  const handleChange = (value: string) => {
    setQuantity(value);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.validity.patternMismatch) {
      setQuantity("1");
    } else {
      const parsed = parseInt(quantity);
      if (parsed === 0) {
        setQuantity("1");
      } else {
        setQuantity(String(parsed));
      }
    }
  };
  const handleIncrement = () => {
    setQuantity(String(parseInt(quantity) + 1));
  };
  const handleDecrement = () => {
    const next = parseInt(quantity) - 1;
    if (next > 0) {
      setQuantity(String(next));
    }
  };
  const handleAddToCart = () => addToCart(product, Number(quantity));

  return (
    <div>
      <img
        src={fruitImages[imageSrc]}
        alt={`Illustration of a(n) ${name} fruit`}
        width={"80"}
      />
      <p>{name}</p>
      <p>{price}</p>
      <p>{family} Family</p>

      <div>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]+"
          value={quantity}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
        />
        <button aria-label="Increment quantity" onClick={handleIncrement}>
          <Plus />
        </button>
        <button aria-label="Decrement quantity" onClick={handleDecrement}>
          <Minus />
        </button>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

type Props = {
  product: ProductData;
  addToCart: (product: ProductData, quantity: number) => void;
};
