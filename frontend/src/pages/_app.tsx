import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ConfigProvider, theme, App } from 'antd';
import { ConfigOptions } from 'antd/es/message/interface';
import locale from 'antd/lib/locale/ko_KR';
import 'dayjs/locale/ko';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';

import Layout from '~/components/layouts/Layout';
import Titlebar from '~/components/layouts/Titlebar';
import { updateStore } from '~/stores/update';
import { userStore } from '~/stores/user';
import { InitGlobalStyled } from '~/styles/init';
import { antdTheme, colors, sizes } from '~/styles/themes';

import Login from './login';

type Sizes = typeof sizes;
type Colors = typeof colors;

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: Sizes;
    colors: Colors;
  }
}

const AppWrap = () => {
  const antdToken = theme.useToken();
  const { isLogin } = useRecoilValue(userStore);
  const [update, setUpdate] = useRecoilState(updateStore);

  const bootstrap = async () => {
    window.electron.onUpdate((event, data) => {
      setUpdate({
        ...update,
        status: {
          event,
          data,
          time: new Date().getTime(),
        },
      });
    });

    window.electron.initlizeUpdater();
  };

  const styledTheme = useMemo(
    () => ({
      sizes: sizes,
      colors: colors,
      token: antdToken.token,
    }),
    [],
  );

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <ConfigProvider theme={antdTheme} locale={locale}>
      <ThemeProvider theme={styledTheme}>
        <InitGlobalStyled />

        <div id="app">
          <AntApp message={{ maxCount: 1 }}>
            <Titlebar />

            {isLogin ? (
              <Layout>
                <Outlet />
              </Layout>
            ) : (
              <Login />
            )}
          </AntApp>
        </div>
      </ThemeProvider>
    </ConfigProvider>
  );
};

const AntApp = styled(App)`
  width: 100vw;
  height: 100vh;
`;

export default AppWrap;
