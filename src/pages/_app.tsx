import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ConfigProvider, theme } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components';

import amgApi from '~/api/apiClient';
import Layout from '~/components/layouts/Layout';
import Titlebar from '~/components/layouts/Titlebar';
import { useLogout } from '~/hooks/useLogout';
import { updateStore } from '~/stores/update';
import { userState } from '~/stores/user';
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

const App = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <AppInner />
    </ConfigProvider>
  );
};

const AppInner = () => {
  const antdToken = theme.useToken();
  const [update, setUpdate] = useRecoilState(updateStore);
  // TODO: 로그인 로직 수정
  const token = sessionStorage.getItem('authorization');
  if (token) amgApi.defaults.headers['authorization'] = token;

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
    <ThemeProvider theme={styledTheme}>
      <InitGlobalStyled />

      <div id="app">
        <Titlebar />
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </ThemeProvider>
  );
};

export default App;
