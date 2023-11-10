import { useRef } from 'react';

import { App } from 'antd';

import { useSoundApp } from './useSoundApp';

export const useCopyLink = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { soundMessage } = useSoundApp();

  const copyInputLink = (id: string) => {
    if (!inputRef.current) return;
    inputRef.current.value = `http://amgcom.site/${id}`;

    try {
      const el = inputRef.current;
      el?.select();
      document.execCommand('copy');
      soundMessage.success('클립보드에 저장되었습니다.');
    } catch (err) {
      soundMessage.success('클립보드 복사에 실패했습니다.');
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
