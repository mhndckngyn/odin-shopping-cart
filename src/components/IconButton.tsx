import styled from "styled-components";
import { styling } from "../constants/styling";

const IconButton = styled.button`
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
`;

export default IconButton;
