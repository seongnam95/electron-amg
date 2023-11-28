import { useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ConfigProvider, theme, App as AntApp } from 'antd';
import locale from 'antd/lib/locale/ko_KR';
import 'dayjs/locale/ko';
import { useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';

import InitSetting from '~/components/common/InitSetting';
import PrivateRoute from '~/components/common/PrivateRoute';
import Layout from '~/components/layouts/Layout';
import Titlebar from '~/components/layouts/Titlebar';
import { useTeamQuery } from '~/hooks/queryHooks/useTeamQuery';
import { userStore } from '~/stores/user';
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

const AppWrap = () => {
  const antdToken = theme.useToken();
  const { user, isLogin } = useRecoilValue(userStore);
  const { teams } = useTeamQuery({ userId: user.id, enabled: isLogin });
  const hasTeam = teams.length > 0;

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
            <PrivateRoute authenticated={isLogin}>
              <InitSetting hasTeam={hasTeam}>
                <Layout>
                  <Outlet />
                </Layout>
              </InitSetting>
            </PrivateRoute>
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

export default AppWrap;
