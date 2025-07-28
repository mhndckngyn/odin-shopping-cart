import { useCart } from "../../cart/CartContext";
import { useProducts } from "../../data/ProductContext";
import ProductCard from "./ProductCard";

function Products() {
  const { products, isLoading, error } = useProducts();
  const { addItem } = useCart();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Our products</h1>

      {products.map((product) => (
        <ProductCard key={product.name} product={product} addToCart={addItem} />
      ))}
    </div>
  );
}

export default Products;
