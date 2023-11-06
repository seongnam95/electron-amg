import { useRef } from 'react';

import { message } from 'antd';

export const useCopyLink = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageApi, msgContextHolder] = message.useMessage({ top: 46, maxCount: 1 });

  const copyInputLink = (id: string) => {
    if (!inputRef.current) return;
    inputRef.current.value = `http://amgcom.site/${id}`;

    try {
      const el = inputRef.current;
      el?.select();
      document.execCommand('copy');

      messageApi.open({
        type: 'success',
        content: '클립보드에 저장되었습니다.',
        style: { zIndex: 9999 },
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: `클립보드 복사에 실패했습니다. \nErr: ${err}`,
        style: { zIndex: 9999 },
      });
    }
  };

  const contextHolder = (
    <>
      <input ref={inputRef} style={{ position: 'absolute', top: '100%', zIndex: '-9999' }} />
      {msgContextHolder}
    </>
  );

  return {
    contextHolder,
    copyInputLink,
  };
};
