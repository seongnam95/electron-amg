import { ReactNode } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBusinessTime } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';

interface BreadcrumbValueData {
  key: string;
  path: string[];
  text?: string;
  icon?: ReactNode;
  menu?: boolean;
}

export const breadcrumbValues: BreadcrumbValueData[] = [
  {
    key: 'login',
    path: ['login'],
  },
  {
    key: 'management',
    path: ['management'],
  },
  {
    key: 'dashboard',
    path: ['management', 'dashboard'],
    text: '대시보드',
    icon: <GoHomeFill size={24} />,
    menu: true,
  },
  {
    key: 'employee',
    path: ['management', 'employee'],
    text: '직원관리',
    icon: <BsFillPeopleFill size={24} />,
    menu: true,
  },
  {
    key: 'attendance',
    path: ['management', 'attendance'],
    text: '근태관리',
    icon: <FaBusinessTime size={24} />,
    menu: true,
  },
  {
    key: 'month',
    path: ['management', 'attendance', 'month'],
    text: '월간',
  },
  {
    key: 'date',
    path: ['management', 'attendance', 'date'],
    text: '일간',
  },
];
