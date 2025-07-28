import { NavLink as BaseNavLink } from "react-router";
import styled from "styled-components";
import styling from "../constants/styling";
import { paths } from "../routes";
import { ShoppingBasket } from "lucide-react";

function Header() {
  return (
    <NavBar>
      <MainNav>
        <NavLink to={paths.home}>Odin Store</NavLink>
        <NavLink to={paths.products}>Products</NavLink>
      </MainNav>
      <NavLink to={paths.cart}>
        <ShoppingBasket />
      </NavLink>
    </NavBar>
  );
}

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${styling.highlight};
  color: ${styling.background};
`;

const NavLink = styled(BaseNavLink)`
  cursor: pointer;
  padding: 0.75rem;
  color: ${styling.background};
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 200ms ease-out;

  &.active {
    text-decoration: underline;
    font-weight: 700;
  }

  &:hover {
    background-color: ${styling.highlightMedium};
  }

  &:active {
    background-color: ${styling.highlightDark};
  }
`;

const MainNav = styled.div`
  flex: 1;
  display: flex;
  gap: 0.3rem;
`;

export default Header;
