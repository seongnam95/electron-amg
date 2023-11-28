import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs';
import { useNavigate, useRoutes } from 'react-router-dom';

import { App } from 'antd';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import { loginUser } from '~/api/auth';
import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import { useSoundApp } from '~/hooks/useSoundApp';
import { userStore } from '~/stores/user';
import { LoginPageStyled } from '~/styles/pageStyled/loginPageStyled';
import { CurrentUser } from '~/types/user';

interface GeoLocationI {
  ip: string;
  lat: string;
  lng: string;
  countryName: string;
}

const Login = () => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const setUser = useSetRecoilState(userStore);
  const navigate = useNavigate();
  const { soundMessage } = useSoundApp();

  const [geoData, setGeoData] = useState<GeoLocationI>();
  const [account, setAccount] = useState({ username: '', password: '' });

  const isValid = account.username.trim() !== '' && account.password.trim() !== '';

  // 유저 위치 정보 수집
  useEffect(() => {
    const fetchGeoData = async () => {
      await axios
        .get('https://geolocation-db.com/json/')
        .then(res => {
          setGeoData({
            ip: res.data.IPv4,
            lat: res.data.latitude,
            lng: res.data.longitude,
            countryName: res.data.country_name,
          });
        })
        .catch(() => {
          soundMessage.error('IP 조회에 실패하였습니다.');
        });
    };
    fetchGeoData();
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAccount(account => ({ ...account, [id]: value }));
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isValid) {
      const body = {
        username: account.password,
        password: account.password,
        access_ip: geoData?.ip,
      };

      loginUser(body)
        .then(res => {
          const accessToken = res.headers['authorization'];
          sessionStorage.setItem('authorization', accessToken);

          const user: CurrentUser = {
            isLogin: true,
            user: res.data,
          };

          setUser(user);
          navigate('/auth/dashboard');
        })
        .catch(err => {
          passwordInputRef.current?.focus();
          soundMessage.error('잠시 후 다시 시도해주세요.');
        });
    }
  };

  return (
    <LoginPageStyled className="LoginPage">
      <p className="title">LOGIN</p>
      <form className="login-form" onSubmit={handleOnSubmit}>
        <Input onChange={handleOnChange} id="username" icon={<BsFillPersonFill />} />
        <Input
          inputRef={passwordInputRef}
          onChange={handleOnChange}
          id="password"
          icon={<BsLockFill />}
          type="password"
        />
        <Button type="submit" disabled={!isValid} $primary $btnSize="large">
          로그인
        </Button>
      </form>
    </LoginPageStyled>
  );
};

export default Login;
