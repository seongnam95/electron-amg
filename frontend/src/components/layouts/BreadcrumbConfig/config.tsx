import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBusinessTime } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';

import { BreadcrumbData } from '~/stores/breadcrumb';

export const breadcrumbValues: { [key: string]: BreadcrumbData } = {
  login: {
    key: 'login',
    path: '/login',
  },
  management: {
    key: 'management',
    path: '/management',
  },
  dashboard: {
    key: 'dashboard',
    path: '/management/dashboard',
    text: '대시보드',
    icon: <GoHomeFill className="menu-icon" size={24} />,
    menu: true,
  },
  employee: {
    key: 'employee',
    path: '/management/employee',
    text: '근무자 관리',
    icon: <BsFillPeopleFill className="menu-icon" size={24} />,
    menu: true,
  },
  attendance: {
    key: 'attendance',
    path: '/management/attendance',
    text: '근태관리',
    icon: <FaBusinessTime className="menu-icon" size={24} />,
    menu: true,
  },
};
