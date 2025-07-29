import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import fruitImages from "../../assets/images/fruits";
import { styling } from "../../constants/styling";
import type { ProductData } from "../../constants/types";

export default function ProductCard({ product, addToCart }: Props) {
  const { name, price, family, imageSrc } = product;
  const [quantity, setQuantity] = useState("1");

  const handleChange = (value: string) => {
    setQuantity(value);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.validity.patternMismatch || e.target.value === "") {
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
    <Card>
      <div className="center-image">
        <img
          src={fruitImages[imageSrc]}
          alt={`Illustration of a(n) ${name}`}
          width={"60"}
        />
      </div>
      <div className="info-text">
        <div className="text-main">
          <p className="name">{name}</p>
          <p className="price">${price}</p>
        </div>
        <p className="family">{family} Family</p>
      </div>

      <div className="control-container">
        {" "}
        <button
          className="icon"
          aria-label="Decrement quantity"
          onClick={handleDecrement}
        >
          <Minus />
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]+"
          value={quantity}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
        />
        <button
          className="icon"
          aria-label="Increment quantity"
          onClick={handleIncrement}
        >
          <Plus />
        </button>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </Card>
  );
}

type Props = {
  product: ProductData;
  addToCart: (product: ProductData, quantity: number) => void;
};

const Card = styled.div`
  background-color: ${styling.backgroundLight};
  border: 1px solid ${styling.border};
  padding: 1rem;
  border-radius: 16px;
  min-width: 0px;

  p.name,
  p.price {
    font-weight: 600;
  }

  p.family {
    color: ${styling.foregroundLight};
  }

  .text-main {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
  }

  .center-image {
    padding-block: 4rem;
    display: grid;
    place-items: center;
  }

  .control-container {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  input {
    flex: 1;
    min-width: 3rem;
    text-align: center;
    padding-block: 0.5rem;
    font-size: 1rem;
    border-radius: 0.7rem;
    border: 1px solid ${styling.border};
    color: ${styling.foreground};
  }

  .control-container button {
    font-size: 0.8rem;
    background-color: transparent;
    color: ${styling.foreground};
    border: none;
    border-radius: 50%;
    display: grid;
    place-items: center;
    // Only then are they entirely rounded
    height: 2.5rem;
    width: 2.5rem;

    &:hover {
      background-color: ${styling.background};
    }

    &:active {
      background-color: ${styling.backgroundDark};
    }
  }

  button.add-to-cart {
    width: 100%;
    margin-top: 1rem;
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
