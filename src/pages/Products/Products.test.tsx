import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, test, vi } from "vitest";
import type { ProductData } from "../../constants/types";
import { ProductContext } from "../../data/ProductContext";
import ProductCard from "./ProductCard";
import Products from "./Products";

const products: ProductData[] = [
  {
    name: "Apple",
    price: 2.85,
    family: "Rose",
    vitamin: ["Vitamin B", "Vitamin K"],
    color: ["Red"],
    description:
      "Apples are crisp, juicy fruits. They come in various colors and flavors, ranging from sweet to tart. Apples are often eaten raw, used in baking, and pressed into cider.",
    imageSrc: "apple",
  },
  {
    name: "Apricot",
    price: 4.16,
    family: "Rose",
    vitamin: ["Vitamin A", "Vitamin C"],
    color: ["Orange"],
    description:
      "Apricots are small, orange fruits known for their velvety skin and sweet-tart flavor. They are commonly eaten fresh, dried, or used in jams and desserts.",
    imageSrc: "apricot",
  },
  {
    name: "Avocado",
    price: 4.02,
    family: "Avocado",
    vitamin: ["Vitamin B", "Vitamin C"],
    color: ["Green"],
    description:
      "Avocados are creamy, nutrient-dense fruits. Rich in healthy fats and vitamins, they are often used in salads, spreads, and dips like guacamole.",
    imageSrc: "avocado",
  },
];

describe("the product page", () => {
  it("renders the product page with a heading and list of products", async () => {
    render(
      <ProductContext.Provider
        value={{ products, error: null, isLoading: false }}
      >
        <Products />
      </ProductContext.Provider>
    );

    const heading = await screen.findByText("Our products");
    const productBtns = await screen.findAllByRole("button", {
      name: "Add to Cart",
    }); // each product has a button;

    expect(heading).toBeInTheDocument();
    expect(productBtns.length).toBe(3);
  });

  it("shows an error message if there is an error while fetching products", async () => {
    render(
      <ProductContext.Provider
        value={{ products: [], error: "Error", isLoading: false }}
      >
        <Products />
      </ProductContext.Provider>
    );

    const errorMessage = await screen.findByText((content) =>
      content.startsWith("Error")
    );
    const heading = screen.queryByText("Our products");
    const productBtns = screen.queryAllByRole("button", {
      name: "Add to Cart",
    }); // each product has a button;

    expect(errorMessage).toBeInTheDocument();
    expect(heading).toBe(null);
    expect(productBtns.length).toBe(0);
  });
});

const apple: ProductData = {
  name: "Apple",
  price: 2.85,
  family: "Rose",
  vitamin: ["Vitamin B", "Vitamin K"],
  color: ["Red"],
  description:
    "Apples are crisp, juicy fruits. They come in various colors and flavors, ranging from sweet to tart. Apples are often eaten raw, used in baking, and pressed into cider.",
  imageSrc: "apple",
};

describe("Product card", () => {
  it("renders the following information about the product: name, image, price, family", () => {
    const addToCart = vi.fn();
    render(<ProductCard product={apple} addToCart={addToCart} />);

    const nameLabel = screen.getByText("Apple");
    const image = screen.getByRole("img");
    const priceLabel = screen.getByText("2.85");
    const familyLabel = screen.getByText("Rose Family");

    expect(nameLabel).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(priceLabel).toBeInTheDocument();
    expect(familyLabel).toBeInTheDocument();
  });

  it(`
renders controls for adding the product to cart: 
1) increment and decrement buttons
2) a quantity input field that defaults to 1
3) an /Add to Cart/ button`, () => {
    const addToCart = vi.fn();
    render(<ProductCard product={apple} addToCart={addToCart} />);

    const incrementBtn = screen.getByRole("button", {
      name: "Increment quantity",
    });
    const decrementBtn = screen.getByRole("button", {
      name: "Decrement quantity",
    });
    const input = screen.getByDisplayValue("1");
    const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });

    expect(incrementBtn).toBeInTheDocument();
    expect(decrementBtn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(addToCartBtn).toBeInTheDocument();
  });

  test("the increment button increments the input value", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(<ProductCard product={apple} addToCart={addToCart} />);

    const incrementBtn = screen.getByRole("button", {
      name: "Increment quantity",
    });
    const input = screen.getByDisplayValue("1") as HTMLInputElement;
    await user.click(incrementBtn);

    expect(input.value).toBe("2");
  });

  test("the decrement button decrements the input value", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(<ProductCard product={apple} addToCart={addToCart} />);

    const input = screen.getByDisplayValue("1") as HTMLInputElement;
    const incrementBtn = screen.getByRole("button", {
      name: "Increment quantity",
    });
    const decrementBtn = screen.getByRole("button", {
      name: "Decrement quantity",
    });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    await user.click(decrementBtn);

    expect(input.value).toBe("2");
  });

  test("the input value doesn't go lower than 1", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(<ProductCard product={apple} addToCart={addToCart} />);

    const input = screen.getByDisplayValue("1") as HTMLInputElement;
    const decrementBtn = screen.getByRole("button", {
      name: "Decrement quantity",
    });
    await user.click(decrementBtn);

    expect(input.value).toBe("1");
  });

  test("the input value resets invalid value to 1 on blur", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(<ProductCard product={apple} addToCart={addToCart} />);

    const input = screen.getByDisplayValue("1") as HTMLInputElement;
    await user.clear(input);
    await user.type(input, "invalid value");
    await user.tab(); // effectively fire onBlur on the current element

    await screen.findByDisplayValue("1");
  });

  test("the /Add to Cart/ button calls the handler with the product and quantity", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(<ProductCard product={apple} addToCart={addToCart} />);

    const incrementBtn = screen.getByRole("button", {
      name: "Increment quantity",
    });
    const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(incrementBtn);
    await user.click(addToCartBtn);

    expect(addToCart).toHaveBeenCalledWith(apple, 2);
  });
});
