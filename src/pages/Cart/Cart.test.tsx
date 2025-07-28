import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, test, vi } from "vitest";
import { CartContext } from "../../cart/CartContext";
import type { CartItem as CartItemData } from "../../constants/types";
import { roundDecimal } from "../../utils";
import Cart from "./Cart";
import CartItem from "./CartItem";

const exampleCartItems: CartItemData[] = [
  {
    name: "Apple",
    price: 2.85,
    family: "",
    vitamin: [],
    color: [],
    description: "",
    imageSrc: "apple",
    quantity: 3,
  },
  {
    name: "Apricot",
    price: 4.16,
    family: "",
    vitamin: [],
    color: [],
    description: "",
    imageSrc: "apricot",
    quantity: 2,
  },
  {
    name: "Avocado",
    price: 4.02,
    family: "",
    vitamin: [],
    color: [],
    description: "",
    imageSrc: "avocado",
    quantity: 1,
  },
];

describe("the cart page", () => {
  it(`renders: 
1) a heading
2) an empty cart message
3) an order summary section, label & value for subtotal, VAT and total
4) a checkout button`, () => {
    const addItem = vi.fn();
    const deleteItem = vi.fn();
    const updateQuantity = vi.fn();
    render(
      <CartContext.Provider
        value={{
          cartItems: [],
          addItem,
          deleteItem,
          updateQuantity,
        }}
      >
        <Cart />
      </CartContext.Provider>
    );

    const pageHeading = screen.getByText("Your cart");
    const emptyCartMessage = screen.getByText("There is no item in the cart.");
    const orderSummary = screen.getByText("Order summary");
    const subtotalLabel = screen.getByText("Subtotal");
    const vatLabel = screen.getByText("VAT (10%)");
    const totalLabel = screen.getByText("Total");
    const subtotalValue = screen.getByTestId("subtotal-value");
    const vatValue = screen.getByTestId("vat-value");
    const totalValue = screen.getByTestId("total-value");
    const checkoutBtn = screen.getByRole("button", { name: "Checkout" });

    [
      pageHeading,
      emptyCartMessage,
      orderSummary,
      subtotalLabel,
      vatLabel,
      totalLabel,
      subtotalValue,
      vatValue,
      totalValue,
      checkoutBtn,
    ].forEach((element) => expect(element).toBeInTheDocument());
  });

  test("given a list of cart items, it renders the product list instead of an empty cart message, and update the order summary according to the items", () => {
    const addItem = vi.fn();
    const deleteItem = vi.fn();
    const updateQuantity = vi.fn();
    render(
      <CartContext.Provider
        value={{
          cartItems: exampleCartItems.slice(),
          addItem,
          deleteItem,
          updateQuantity,
        }}
      >
        <Cart />
      </CartContext.Provider>
    );

    const emptyCartMessage = screen.queryByText(
      "There is no product in the cart."
    );
    const itemCountMessage = screen.getByText(
      `Total item(s): ${exampleCartItems.length}`
    );
    const cartItems = screen.getAllByTestId("cart-item");
    const subtotalValue = screen.getByTestId("subtotal-value");
    const vatValue = screen.getByTestId("vat-value");
    const totalValue = screen.getByTestId("total-value");
    const expectedSubtotal = roundDecimal(
      exampleCartItems.reduce(
        (prev, curr) => prev + curr.quantity * curr.price,
        0
      ),
      2
    );
    const expectedVat = roundDecimal(expectedSubtotal * 0.1, 2);
    const expectedTotal = expectedSubtotal + expectedVat;

    expect(emptyCartMessage).toBe(null);
    expect(itemCountMessage).toBeInTheDocument();
    expect(cartItems.length).toBe(exampleCartItems.length);
    expect(subtotalValue.textContent).toBe(`$${expectedSubtotal}`);
    expect(vatValue.textContent).toBe(`$${expectedVat}`);
    expect(totalValue.textContent).toBe(`$${expectedTotal}`);
  });

  it("updates the order summary when an item's quantity is updated", async () => {
    const user = userEvent.setup();
    const apple: CartItemData = {
      name: "Apple",
      price: 2.85,
      family: "",
      vitamin: [],
      color: [],
      description: "",
      imageSrc: "apple",
      quantity: 1,
    };
    const addItem = vi.fn();
    const deleteItem = vi.fn();
    const updateQuantity = (
      _: string,
      quantity: number | ((prev: number) => number) // the cart item currently will only call this function with a number
    ) => (apple.quantity = quantity as number);
    const { rerender } = render(
      <CartContext.Provider
        value={{
          cartItems: [apple],
          addItem,
          deleteItem,
          updateQuantity,
        }}
      >
        <Cart />
      </CartContext.Provider>
    );

    const incrementBtn = screen.getByRole("button", {
      name: "Increment quantity",
    });
    await user.click(incrementBtn);
    rerender(
      <CartContext.Provider
        value={{
          cartItems: [apple],
          addItem,
          deleteItem,
          updateQuantity,
        }}
      >
        <Cart />
      </CartContext.Provider>
    );
    const subtotalValue = screen.getByTestId("subtotal-value");
    const vatValue = screen.getByTestId("vat-value");
    const totalValue = screen.getByTestId("total-value");
    const expectedSubtotal = roundDecimal(apple.price * apple.quantity, 2);
    const expectedVat = roundDecimal(expectedSubtotal * 0.1, 2);
    const expectedTotal = roundDecimal(expectedSubtotal + expectedVat, 2);

    expect(subtotalValue.textContent).toBe(`$${expectedSubtotal}`);
    expect(vatValue.textContent).toBe(`$${expectedVat}`);
    expect(totalValue.textContent).toBe(`$${expectedTotal}`);
  });
});

describe("the cart item", () => {
  const setupCartItemTest = () => {
    const item: CartItemData = {
      name: "Apple",
      price: 2.85,
      family: "",
      vitamin: [],
      color: [],
      description: "",
      imageSrc: "apple",
      quantity: 2,
    };
    const deleteItemFn = vi.fn();
    const updateItemFn = vi.fn();

    return { item, updateItemFn, deleteItemFn };
  };

  it(`renders:
1) the product name
2) product price that corresponds to quantity
3) the product image
4) controls for adjusting the quantity: increment and decrement buttons, input field
5) a button to delete the item from cart`, () => {
    const { item, updateItemFn, deleteItemFn } = setupCartItemTest();
    render(
      <CartItem
        item={item}
        updateItem={updateItemFn}
        deleteItem={deleteItemFn}
      />
    );

    const nameLabel = screen.getByText("Apple");
    const priceValue = screen.getByTestId("price-value");
    const image = screen.getByRole("img");
    const incrementBtn = screen.getByRole("button", {
      name: "Increment quantity",
    });
    const decrementBtn = screen.getByRole("button", {
      name: "Decrement quantity",
    });
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const deleteBtn = screen.getByRole("button", { name: "Delete from cart" });
    const expectedItemPrice = item.price * item.quantity;

    [
      nameLabel,
      priceValue,
      image,
      incrementBtn,
      decrementBtn,
      input,
      deleteBtn,
    ].forEach((element) => expect(element).toBeInTheDocument());
    expect(priceValue.textContent).toBe(`$${expectedItemPrice}`);
    expect(input.value).toBe(String(item.quantity));
    expect(updateItemFn).not.toHaveBeenCalled();
    expect(deleteItemFn).not.toHaveBeenCalled();
  });

  test("when the delete button is pressed, it calls the handler with the product name", async () => {
    const user = userEvent.setup();
    const { item, updateItemFn, deleteItemFn } = setupCartItemTest();
    render(
      <CartItem
        item={item}
        updateItem={updateItemFn}
        deleteItem={deleteItemFn}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: "Delete from cart" });
    await user.click(deleteBtn);

    expect(deleteItemFn).toHaveBeenCalledWith(item.name);
  });

  test("when the INCREMENT button is pressed, calls the handler with the product name and new quantity value, and the input value is updated", async () => {
    const user = userEvent.setup();
    const { item, updateItemFn, deleteItemFn } = setupCartItemTest();
    render(
      <CartItem
        item={item}
        updateItem={updateItemFn}
        deleteItem={deleteItemFn}
      />
    );

    const incrementBtn = screen.getByRole("button", {
      name: "Increment quantity",
    });
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const expectedQuantity = item.quantity + 1;
    await user.click(incrementBtn);

    expect(updateItemFn).toHaveBeenCalledWith(item.name, expectedQuantity);
    expect(input.value).toBe(String(expectedQuantity));
  });

  test("when the DECREMENT button is pressed, it calls the handler with the product name and new quantity value, and the input value is updated", async () => {
    const user = userEvent.setup();
    const { item, updateItemFn, deleteItemFn } = setupCartItemTest();
    render(
      <CartItem
        item={item}
        updateItem={updateItemFn}
        deleteItem={deleteItemFn}
      />
    );

    const decrementBtn = screen.getByRole("button", {
      name: "Decrement quantity",
    });
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const expectedQuantity = item.quantity - 1;
    await user.click(decrementBtn);

    expect(updateItemFn).toHaveBeenCalledWith(item.name, expectedQuantity);
    expect(input.value).toBe(String(expectedQuantity));
  });

  test("the decrement button doesn't make the quantity go lower than 1", async () => {
    const user = userEvent.setup();
    const { item, deleteItemFn } = setupCartItemTest();
    const updateItemFn = (_: string, quantity: number) =>
      (item.quantity = quantity);
    render(
      <CartItem
        item={item}
        updateItem={updateItemFn}
        deleteItem={deleteItemFn}
      />
    );

    const decrementBtn = screen.getByRole("button", {
      name: "Decrement quantity",
    });
    const input = screen.getByRole("textbox") as HTMLInputElement;
    // item.quantity is 2 at the start so we click twice
    await user.click(decrementBtn);
    await user.click(decrementBtn);

    expect(input.value).toBe("1");
  });

  test("the input calls the handler each time the value is a valid natural number, but not when the value becomes invalid", async () => {
    const user = userEvent.setup();
    const { item, updateItemFn, deleteItemFn } = setupCartItemTest();
    render(
      <CartItem
        item={item}
        updateItem={updateItemFn}
        deleteItem={deleteItemFn}
      />
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.clear(input);
    await user.type(input, "123a");

    expect(updateItemFn).toHaveBeenCalledTimes(3);
    expect(updateItemFn).toHaveBeenNthCalledWith(1, item.name, 1);
    expect(updateItemFn).toHaveBeenLastCalledWith(item.name, 123);
  });

  test("when the input receives invalid value, it resets to the current (valid) quantity ON BLUR", async () => {
    const user = userEvent.setup();
    const { item, updateItemFn, deleteItemFn } = setupCartItemTest();
    render(
      <CartItem
        item={item}
        updateItem={updateItemFn}
        deleteItem={deleteItemFn}
      />
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.clear(input);
    await user.type(input, "Invalid Number");
    await user.tab();

    expect(input.value).toBe(String(item.quantity));
  });
});
