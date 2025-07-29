import { Link } from "react-router";
import styled from "styled-components";
import heroImage from "../../assets/images/hero.jpg";
import { paths } from "../../routes";

function Home() {
  return (
    <HomeContainer>
      <Content>
        <Title>Fruit Haven</Title>
        <Tagline>Fresh. Local. Delicious.</Tagline>
        <Description>
          Your trusted source for handpicked, seasonal fruits. Delivered with
          care, straight from farm to table.
        </Description>
        <PrimaryButton as={Link} to={paths.products}>
          🍓 Shop Now
        </PrimaryButton>
      </Content>
      <About>
        Photo by <a href="https://unsplash.com/@meizhilang">Meizhi Lang</a> on{" "}
        <a href="https://unsplash.com/photos/a-fruit-stand-with-strawberries-and-other-fruits-W83wjJef4cA">
          Unsplash
        </a>
        {" • "}
        <a href="https://github.com/mhndckngyn/odin-shopping-cart">
          View on GitHub
        </a>
      </About>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  position: relative;
  display: grid;
  text-align: center;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${heroImage}) center / cover no-repeat;
  color: hsl(60, 56%, 91%);
  padding: 2rem;
`;

const Content = styled.div`
  place-self: center;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-block: 0 0.5rem;
  font-family: "Playwrite Australia QLD", serif;
`;

const Tagline = styled.h2`
  font-size: 2rem;
  font-style: italic;
  color: hsl(0, 91%, 71%);
  margin-block: 0 0.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const PrimaryButton = styled.button`
  background-color: hsl(48, 96%, 53%);
  text-decoration: none;
  color: #000;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: hsl(48, 96%, 47%);
  }
`;

const About = styled.p`
  font-size: 0.9rem;
  align-self: self-end;

  a {
    color: inherit;
  }
`;
