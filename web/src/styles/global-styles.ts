import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";
import { fonts } from "./fonts";

const GlobalStyle = createGlobalStyle`
  :root {
    ${fonts}
    ${colors}

    font-size: 10px;

    /* Font Size */
    --font-size-3xs: 1.1rem;
    --font-size-2xs: 1.2rem;
    --font-size-xs: 1.3rem;
    --font-size-s: 1.4rem;
    --font-size-m: 1.5rem;
    --font-size-l: 1.6rem;
    --font-size-xl: 1.7rem;
    --font-size-2xl: 1.8rem;

    /* Animation */
    --ease-in-out-1: 0.1s ease-in-out;
    --ease-in-out-2: 0.2s ease-in-out;
    --ease-in-out-3: 0.3s ease-in-out;
    --ease-in-out-35: 0.35s ease-in-out;

    /* Shadow */
    --shadow-gray-base: 155, 155, 155;
    --shadow-gray-100: 0 3px 6px rgb(var(--shadow-gray-base), 0.2);
  }

  * {
    box-sizing: border-box;
    text-decoration: none;
  }

  html {
    font-family: 'GothicA1';
  }

  body {
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }
  
  button {
    font: inherit;
    cursor: pointer;
    touch-action: manipulation;
  }
  
  b {
    font-weight: bold;
  }

  input[type='number'] {
    -moz-appearance: textfield;
}

  /* Chrome, Safari, Edge */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default GlobalStyle;
