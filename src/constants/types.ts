import type { ImageKey } from "../assets/images/fruits";

export type ProductData = {
  name: string;
  price: number;
  family: string;
  vitamin: string[];
  color: string[];
  description: string;
  imageSrc: ImageKey;
};

export type CartItem = ProductData & {
  quantity: number;
};
