import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RecoilRoot } from 'recoil';

import { ElectronRendererContext } from '@app/types/preload';

import FileSystemRoutes from '~/components/common/FileSystemRoutes';

dayjs.extend(relativeTime);
dayjs.locale('ko');

declare global {
  interface Window {
    electron: ElectronRendererContext;
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Suspense>
        <FileSystemRoutes />
      </Suspense>
    </RecoilRoot>
  </QueryClientProvider>,
);
