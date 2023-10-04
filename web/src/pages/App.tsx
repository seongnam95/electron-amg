import { useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ConfigProvider, theme } from "antd";
import styled, { ThemeProvider } from "styled-components";

import { InitGlobalStyled } from "@styles/init";
import { antdTheme, colors, sizes } from "@styles/themes";
import ContractPage from "./ContractPage";
import CompletePage from "./CompletePage";
import DraftPage from "./DraftPage";
import NotFoundPage from "./NotFoundPage";

type Sizes = typeof sizes;
type Colors = typeof colors;

declare module "styled-components" {
  export interface DefaultTheme {
    sizes: Sizes;
    colors: Colors;
  }
}

const App = () => {
  const antdToken = theme.useToken();

  const styledTheme = useMemo(
    () => ({
      sizes: sizes,
      colors: colors,
      token: antdToken.token,
    }),
    []
  );

  useEffect(() => {
    const setScreenHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setScreenHeight();
    window.addEventListener("resize", setScreenHeight);
    return () => window.removeEventListener("resize", setScreenHeight);
  }, []);

  return (
    <ConfigProvider theme={antdTheme}>
      <ThemeProvider theme={styledTheme}>
        <InitGlobalStyled />
        <BrowserRouter>
          <AppStyled className="app">
            <PageRouter />
          </AppStyled>
        </BrowserRouter>
      </ThemeProvider>
    </ConfigProvider>
  );
};

const PageRouter = () => {
  return (
    <Routes>
      <Route path="/draft" element={<DraftPage />} />
      <Route path="/contract/:id" element={<ContractPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const AppStyled = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
`;

export default App;
