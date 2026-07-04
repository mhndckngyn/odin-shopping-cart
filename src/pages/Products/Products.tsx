import styled, { keyframes } from "styled-components";
import { useCart } from "../../cart/CartContext";
import { useProducts } from "../../data/ProductContext";
import ProductCard from "./ProductCard";
import { breakpoints, styling } from "../../constants/styling";

function Products() {
  const { products, isLoading, error } = useProducts();
  const { addItem } = useCart();

  console.log(products);

  if (isLoading) {
    return (
      <CenterLoader>
        <Loader />
      </CenterLoader>
    );
  }

  if (error) {
    return (
      <CenterLoader>
        <p>Error: {error}</p>;
      </CenterLoader>
    );
  }

  return (
    <Container>
      <Header>Our products</Header>
      <ItemGrid>
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            addToCart={addItem}
          />
        ))}
      </ItemGrid>
    </Container>
  );
}

export default Products;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  padding: 1.5rem 1rem 2rem;
`;

const CenterLoader = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Loader = styled.div`
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  border: 4px solid ${styling.background};
  border-top-color: ${styling.highlight};
  border-left-color: ${styling.highlight};
  animation: ${spin} 1s linear infinite;
`;

const Header = styled.h1`
  text-align: center;
  margin-top: 0;
`;

const ItemGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(300px, 450px);
  justify-content: center;

  @media (min-width: ${breakpoints.tablet}) {
    width: 95%;
    margin: 0 auto;
    grid-template-columns: repeat(2, minmax(300px, 500px));
  }

  @media (min-width: ${breakpoints.laptop}) {
    width: 90%;
    grid-template-columns: repeat(3, minmax(300px, 500px));
  }
`;
