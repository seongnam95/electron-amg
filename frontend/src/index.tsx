import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ElectronRendererContext } from '@app/types/preload';

import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RecoilRoot } from 'recoil';

import FileSystemRoutes from '~/components/common/FileSystemRoutes';

dayjs.extend(relativeTime);
dayjs.locale('ko');

declare global {
  interface Window {
    electron: ElectronRendererContext;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // staleTime: 1000 * 60 * 5,
    },
  },
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Suspense>
        <FileSystemRoutes />
      </Suspense>
    </RecoilRoot>
  </QueryClientProvider>,
);
