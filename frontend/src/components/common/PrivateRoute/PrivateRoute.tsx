import { Navigate, Outlet } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { userStore } from '~/stores/user';

const PrivateRoute = () => {
  const { isLogin } = useRecoilValue(userStore);
  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
