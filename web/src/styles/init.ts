import { memo } from "react";

import { createGlobalStyle } from "styled-components";

export const InitGlobalStyled = memo(createGlobalStyle`
  :root {
    font-size: 10px;
  }

  * {
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'NanumBarunGothic';
    -webkit-tap-highlight-color: rgba(120,120,120,0.1);
  }

  html {
    -webkit-overflow-scrolling: touch !important;
  }

  body {
    scrollbar-width: none;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch !important;
  }

  body::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
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
`);
