import { AppControlAction } from '@app/modules/general';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import logo from '~/assets/images/logo@256.png';
import { useLogout } from '~/hooks/useLogout';
import { userStore } from '~/stores/user';

import { TitlebarStyled } from './styled';

export interface TitlebarProps {
  className?: string;
}

const Titlebar = ({ className }: TitlebarProps) => {
  const logout = useLogout();
  const { isLogin } = useRecoilValue(userStore);

  const appControl = (action: AppControlAction) => {
    window.electron.appControl(action);
  };

  return (
    <TitlebarStyled className={clsx('Titlebar', className)}>
      <div className="logo">
        <img src={logo} alt="logo" width={20} />
        AMG
      </div>
      <div className="control-wrap">
        <div className="controls">
          {isLogin && (
            <div onClick={logout}>
              <i className="bx bx-log-out" style={{ fontSize: '1.8rem', paddingTop: '0.1rem' }} />
            </div>
          )}

          <div>
            <i className="bx bx-cog" style={{ fontSize: '1.8rem' }} />
          </div>
        </div>

        <div className="controls">
          <div onClick={() => appControl('minimize')}>
            <i className="bx bx-minus" style={{ fontSize: '1.8rem', marginTop: '0.8rem' }} />
          </div>

          <div onClick={() => appControl('maximize')}>
            <i className="bx bx-square" style={{ fontSize: '1.6rem' }} />
          </div>

          <div className="close" onClick={() => appControl('close')}>
            <i className="bx bx-x" style={{ fontSize: '2.2rem' }} />
          </div>
        </div>
      </div>
    </TitlebarStyled>
  );
};

export default Titlebar;
