import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import { AppControlAction } from '@app/modules/general';

import logo from '~/assets/images/logo@256.png';
import { configStore } from '~/stores/config';

import { TitlebarStyled } from './styled';

export interface TitlebarProps {
  className?: string;
}

const Titlebar = ({ className }: TitlebarProps) => {
  const {
    general: { developerMode },
  } = useRecoilValue(configStore);

  const appControl = (action: AppControlAction) => {
    window.electron.appControl(action);
  };

  return (
    <TitlebarStyled className={clsx('Titlebar', className)}>
      <div className="logo">
        <img src={logo} alt="logo" width={20} />
        AMG
      </div>
      <div className="controls">
        {developerMode && (
          <div onClick={() => appControl('devtools')}>
            <i className="bx bx-code-alt" />
          </div>
        )}

        <div className="minimize" onClick={() => appControl('minimize')}>
          <i className="bx bx-minus" />
        </div>

        <div onClick={() => appControl('maximize')}>
          <i className="bx bx-square" />
        </div>

        <div className="close" onClick={() => appControl('close')}>
          <i className="bx bx-x" />
        </div>
      </div>
    </TitlebarStyled>
  );
};

export default Titlebar;
