import { App, ModalFuncProps } from 'antd';

import SoundManager from '~/services/soundManager';

export const useSoundApp = () => {
  const { message, notification, modal } = App.useApp();
  const soundManager = SoundManager.getInstance();

  const soundMessage = {
    info: (msg: string) => {
      soundManager.playSound('info');
      message.info(msg);
    },
    error: (msg: string) => {
      soundManager.playSound('error');
      message.error(msg);
    },
    warning: (msg: string) => {
      soundManager.playSound('warning');
      message.warning(msg);
    },
    success: (msg: string) => {
      soundManager.playSound('success');
      message.success(msg);
    },
  };

  const soundModal = ({ type, ...props }: ModalFuncProps) => {
    switch (type) {
      case 'info':
        soundManager.playSound('info');
        break;
      case 'warning':
        soundManager.playSound('warning');
        break;
      case 'success':
        soundManager.playSound('success');
        break;
      case 'error':
        soundManager.playSound('error');
        break;
    }

    modal.confirm(props);
  };

  return { soundMessage, soundModal, notification, modal };
};
