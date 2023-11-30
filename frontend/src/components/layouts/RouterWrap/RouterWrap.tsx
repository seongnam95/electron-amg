import { Route, Routes } from 'react-router-dom';

import PrivateRoute from '~/components/common/PrivateRoute';
import IndexPage from '~/pages';
import NotFoundPage from '~/pages/404';
import AttendancePage from '~/pages/auth/attendance';
import DashboardPage from '~/pages/auth/dashboard';
import EmployeePage from '~/pages/auth/employee';
import InitPage from '~/pages/init';
import LoginPage from '~/pages/login';

import ManagementLayout from '../ManagementLayout';

const RouterWrap = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route index={true} path="login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="init" element={<InitPage />} />
        <Route path="management" element={<ManagementLayout />}>
          <Route index path="dashboard" element={<DashboardPage />} />
          <Route path="employee" element={<EmployeePage />} />
          <Route path="attendance" element={<AttendancePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterWrap;
