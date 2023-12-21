import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import { BreadcrumbData, breadcrumbStore } from '~/stores/breadcrumb';

import { breadcrumbValues } from './config';

const BreadcrumbConfig = () => {
  const { pathname } = useLocation();
  const setBreadcrumb = useSetRecoilState(breadcrumbStore);

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(path => path);

    const newBreadcrumb: BreadcrumbData[] = pathSegments.map(segment => {
      return breadcrumbValues[segment];
    });

    setBreadcrumb(newBreadcrumb);
  }, [pathname]);

  return null;
};

export default BreadcrumbConfig;
