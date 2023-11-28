import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { userStore } from '~/stores/user';

export interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLogin } = useRecoilValue(userStore);
  const location = useLocation();

  // if (!isLogin) return <Navigate to="/login" state={{ from: location }} />;
  return <>{children}</>;
};

export default PrivateRoute;
