import { ReactElement } from 'react';

import Login from '~/pages/login';

export interface PrivateRouteProps {
  authenticated: boolean;
  children: ReactElement;
}

const PrivateRoute = ({ authenticated, children }: PrivateRouteProps) => {
  return authenticated ? <>{children}</> : <Login />;
};

export default PrivateRoute;
