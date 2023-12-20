import { useMemo } from 'react';

import { ConfigProvider, theme, App as AntApp } from 'antd';
import locale from 'antd/lib/locale/ko_KR';
import 'dayjs/locale/ko';
import styled, { ThemeProvider } from 'styled-components';

import BreadcrumbConfig from '~/components/layouts/BreadcrumbConfig';
import RouterWrap from '~/components/layouts/RouterWrap';
import Titlebar from '~/components/layouts/Titlebar';
import { InitGlobalStyled } from '~/styles/init';
import { antdTheme, colors, sizes } from '~/styles/themes';

type Sizes = typeof sizes;
type Colors = typeof colors;

declare module 'styled-components' {
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
    [],
  );

  return (
    <ConfigProvider theme={antdTheme} locale={locale}>
      <ThemeProvider theme={styledTheme}>
        <InitGlobalStyled />

        <AppStyled id="app">
          <Titlebar />
          <AntApp message={{ maxCount: 1 }} style={{ height: '100%' }}>
            <BreadcrumbConfig />
            <RouterWrap />
          </AntApp>
        </AppStyled>
      </ThemeProvider>
    </ConfigProvider>
  );
};

const AppStyled = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default App;
