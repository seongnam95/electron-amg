import { Route, Routes } from 'react-router-dom';

import PrivateRoute from '~/components/common/PrivateRoute';
import ManagementLayout from '~/components/layouts/ManagementLayout';
import IndexPage from '~/pages';
import NotFoundPage from '~/pages/404';
import InitPage from '~/pages/init';
import LoginPage from '~/pages/login';
import AttendancePage from '~/pages/management/attendance';
import DashboardPage from '~/pages/management/dashboard';
import EmployeePage from '~/pages/management/employee';
import SettingPage from '~/pages/setting';

const RouterWrap = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route index path="login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="init" element={<InitPage />} />
        <Route path="management" element={<ManagementLayout />}>
          <Route index path="dashboard" element={<DashboardPage />} />
          <Route path="employee" element={<EmployeePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterWrap;
