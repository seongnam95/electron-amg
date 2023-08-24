import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'antd/dist/reset.css';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RecoilRoot } from 'recoil';
import { SWRConfig, SWRConfiguration } from 'swr';

import { ElectronRendererContext } from '@app/types/preload';

import FileSystemRoutes from '~/components/common/FileSystemRoutes';

dayjs.extend(relativeTime);
dayjs.locale('ko');

declare global {
  interface Window {
    electron: ElectronRendererContext;
  }
}

const swrConfig: SWRConfiguration = {
  errorRetryCount: 2,
  errorRetryInterval: 500,
  revalidateOnFocus: false,
  revalidateIfStale: false,
};

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <SWRConfig value={swrConfig}>
        <Suspense>
          <FileSystemRoutes />
        </Suspense>
      </SWRConfig>
    </RecoilRoot>
  </QueryClientProvider>,
);
