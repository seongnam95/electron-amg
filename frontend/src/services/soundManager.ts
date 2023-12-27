import { Howl } from 'howler';

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

class SoundManager {
  private static instance: SoundManager;
  private sounds: Record<string, Howl>;

  private constructor() {
    this.sounds = {
      info: new Howl({ src: [normalSoundFile], volume: soundConfig.volume.info }),
      error: new Howl({ src: [errorSoundFile], volume: soundConfig.volume.error }),
      success: new Howl({ src: [successSoundFile], volume: soundConfig.volume.success }),
      warning: new Howl({ src: [warningSoundFile], volume: soundConfig.volume.warning }),
    };
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public playSound(type: string): void {
    const sound = this.sounds[type];
    if (sound) {
      sound.play();
    }
  }
}

export default SoundManager;
