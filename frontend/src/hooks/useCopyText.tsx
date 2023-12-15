import { useSoundApp } from './componentHooks/useSoundApp';

export const useCopyText = () => {
  const { soundMessage } = useSoundApp();

  const copyText = async (data: string) => {
    navigator.clipboard
      .writeText(data)
      .then(() => soundMessage.success('클립보드에 저장되었습니다.'))
      .catch(() => copyTextLegacy(data));
  };

  const copyTextLegacy = (data: string) => {
    try {
      const inputElement = document.createElement('input');
      inputElement.value = data;
      inputElement.select();
      document.execCommand('copy');
      document.body.removeChild(inputElement);

      soundMessage.success('클립보드에 저장되었습니다.');
    } catch (err) {
      soundMessage.success('클립보드 복사에 실패했습니다.');
    }
  };

  return { copyText };
};
