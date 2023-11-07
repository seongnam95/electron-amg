import { useRef } from 'react';

import { message } from 'antd';

export const useCopyLink = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const copyInputLink = (id: string) => {
    if (!inputRef.current) return;
    inputRef.current.value = `http://amgcom.site/${id}`;

    try {
      const el = inputRef.current;
      el?.select();
      document.execCommand('copy');
      message.success('클립보드에 저장되었습니다.');
    } catch (err) {
      message.success('클립보드 복사에 실패했습니다.');
    }
  };

  const contextHolder = (
    <input ref={inputRef} style={{ position: 'absolute', opacity: 0, zIndex: '-9999' }} />
  );

  return {
    copyInputLink,
    contextHolder,
  };
};
