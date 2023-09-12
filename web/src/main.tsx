import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "@styles/global-styles";
import { Reset } from "styled-reset";
import { App } from "./pages/App.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
