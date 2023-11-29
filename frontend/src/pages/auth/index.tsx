import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import ManagementLayout from '~/components/layouts/Layout';
import { userStore } from '~/stores/user';

const AuthPage = () => {
  const { isLogin } = useRecoilValue(userStore);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('?');
    navigate('/login');
  }, [isLogin]);

  return (
    <ManagementLayout>
      <Outlet />
    </ManagementLayout>
  );
};

export default AuthPage;
