import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { message } from 'antd';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import { loginUser } from '~/api/auth';
import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import { userState } from '~/stores/user';
import { LoginPageStyled } from '~/styles/pageStyled/loginPageStyled';
import { CurrentUser } from '~/types/user';

interface GeoLocationI {
  ip: string;
  countryName: string;
  lat: string;
  lng: string;
}

const Login = () => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage({ top: 46, maxCount: 1 });
  const error = () => {
    messageApi.open({
      type: 'error',
      content: '아이디 또는 패스워드가 일치하지 않습니다.',
    });
  };

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
            countryName: res.data.country_name,
            lat: res.data.latitude,
            lng: res.data.longitude,
          });
        })
        .catch(() => alert('IP를 조회할 수 없습니다.'));
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
        })
        .catch(err => {
          console.log(err);
          passwordInputRef.current?.focus();
          error();
          navigate('/manager/employee');
        });
    }
  };

  return (
    <LoginPageStyled>
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
        <Button type="submit" disabled={!isValid} $primary $btnSize="lazy">
          로그인
        </Button>
      </form>

      {contextHolder}
    </LoginPageStyled>
  );
};

export default Login;
