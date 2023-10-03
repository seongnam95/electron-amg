import { useMemo } from "react";
import { Outlet } from "react-router-dom";

import { ConfigProvider, theme } from "antd";
import { ThemeProvider } from "styled-components";

import { InitGlobalStyled } from "~/styles/init";
import { antdTheme, colors, sizes } from "~/styles/themes";

type Sizes = typeof sizes;
type Colors = typeof colors;

declare module "styled-components" {
  export interface DefaultTheme {
    sizes: Sizes;
    colors: Colors;
  }
}

const App = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <AppInner />
    </ConfigProvider>
  );
};

const AppInner = () => {
  const antdToken = theme.useToken();

  const styledTheme = useMemo(
    () => ({
      sizes: sizes,
      colors: colors,
      token: antdToken.token,
    }),
    []
  );

  return (
    <ThemeProvider theme={styledTheme}>
      <InitGlobalStyled />

      <div id="app">
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default App;
