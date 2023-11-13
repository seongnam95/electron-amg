import { App, ModalFuncProps } from 'antd';
import { Howl, Howler } from 'howler';

import errorSoundFile from '~/assets/sounds/notification-error.mp3';
import normalSoundFile from '~/assets/sounds/notification-normal.mp3';
import successSoundFile from '~/assets/sounds/notification-success.mp3';
import warningSoundFile from '~/assets/sounds/notification-warning.mp3';

interface SoundConfig {
  volume: {
    info: number;
    error: number;
    success: number;
    warning: number;
  };
}

const soundConfig: SoundConfig = {
  volume: {
    info: 0.8,
    error: 0.8,
    success: 0.2,
    warning: 0.8,
  },
};

interface SoundManager {
  sounds: Record<string, Howl>;
  initSounds(): void;
  playSound(type: string): void;
}

const soundManager: SoundManager = {
  sounds: {},
  initSounds() {
    this.sounds = {
      info: new Howl({ src: [normalSoundFile], volume: soundConfig.volume.info }),
      error: new Howl({ src: [errorSoundFile], volume: soundConfig.volume.error }),
      success: new Howl({ src: [successSoundFile], volume: soundConfig.volume.success }),
      warning: new Howl({ src: [warningSoundFile], volume: soundConfig.volume.warning }),
    };
  },
  playSound(type: string) {
    const sound = this.sounds[type];
    if (sound) {
      sound.play();
    }
  },
};

export const useSoundApp = () => {
  const { message, notification, modal } = App.useApp();

  Howler.volume(soundConfig.volume.info); // 전역 볼륨 설정

  soundManager.initSounds();

  const soundMessage = {
    info: (msg: string) => {
      soundManager.playSound('info');
      message.open({
        type: 'info',
        content: msg,
      });
    },
    error: (msg: string) => {
      soundManager.playSound('error');
      message.open({
        type: 'error',
        content: msg,
      });
    },
    warning: (msg: string) => {
      soundManager.playSound('warning');
      message.open({
        type: 'warning',
        content: msg,
      });
    },
    success: (msg: string) => {
      soundManager.playSound('success');
      message.open({
        type: 'success',
        content: msg,
      });
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
