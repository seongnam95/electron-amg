import { Navigate, useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { userStore } from '~/stores/user';

const IndexPage = () => {
  const { isLogin } = useRecoilValue(userStore);
  const location = useLocation();
  console.log('index');
  if (isLogin && location.pathname !== '/management/dashboard') {
    return <Navigate to="/management/dashboard" />;
  } else if (!isLogin && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return null;
};

export default IndexPage;
