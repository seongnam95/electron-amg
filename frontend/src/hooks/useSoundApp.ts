import { App } from 'antd';
import { Howl } from 'howler';

import error from '~/assets/sounds/notification-error.mp3';
import normal from '~/assets/sounds/notification-normal.mp3';
import success from '~/assets/sounds/notification-success.mp3';
import warning from '~/assets/sounds/notification-warning.mp3';

export const useSoundApp = () => {
  const { message, notification, modal } = App.useApp();

  const infoSound = new Howl({ src: normal, volume: 0.8 });
  const errorSound = new Howl({ src: error, volume: 0.8 });
  const successSound = new Howl({ src: success, volume: 0.2 });
  const warningSound = new Howl({ src: warning, volume: 0.6 });

  const soundMessage = {
    info: (msg: string) => {
      infoSound.play();
      message.open({
        type: 'info',
        content: msg,
      });
    },
    error: (msg: string) => {
      errorSound.play();
      message.open({
        type: 'error',
        content: msg,
      });
    },
    warning: (msg: string) => {
      warningSound.play();
      message.open({
        type: 'warning',
        content: msg,
      });
    },
    success: (msg: string) => {
      successSound.play();
      message.open({
        type: 'success',
        content: msg,
      });
    },
  };

  return { soundMessage, notification, modal };
};
