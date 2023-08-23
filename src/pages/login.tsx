import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import amgApi from '~/api/apiClient';
import { loginUser } from '~/api/authApi';
import { fetchGroups } from '~/api/groupApi';
import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import { userState } from '~/stores/user';
import { LoginPageStyled } from '~/styles/pageStyled/loginPageStyled';
import { UserData } from '~/types/user';

interface GeoLocationI {
  ip: string;
  countryName: string;
  lat: string;
  lng: string;
}

const Login = () => {
  const setUser = useSetRecoilState(userState);

  const [geoData, setGeoData] = useState<GeoLocationI>();
  const [account, setAccount] = useState({ username: '', password: '' });
  const isValid = account.username.trim() !== '' && account.password.trim() !== '';

  // 유저 위치 정보 수집
  useEffect(() => {
    axios.get('https://geolocation-db.com/json/').then(res => {
      setGeoData({
        ip: res.data.IPv4,
        countryName: res.data.country_name,
        lat: res.data.latitude,
        lng: res.data.longitude,
      });
    });
  }, []);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isValid) {
      loginUser({
        username: account.username,
        password: account.password,
        access_ip: geoData?.ip,
      })
        .then(res => {
          const accessToken = res.headers['authorization'];

          // Default 헤더와 Session Storage에 Access-Token 저장
          amgApi.defaults.headers.common['authorization'] = accessToken;
          sessionStorage.setItem('authorization', accessToken);

          const user: UserData = {
            id: res.data.id.toString(),
            name: res.data.name,
            isAdmin: res.data.is_admin,
          };

          setUser(user);
        })
        .catch(res => console.log(res.response.data));
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAccount(prev => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  return (
    <LoginPageStyled>
      <p className="title">LOGIN</p>
      <form className="login-form" onSubmit={handleOnSubmit}>
        <Input onChange={handleOnChange} id="username" icon="bx-user" />
        <Input onChange={handleOnChange} id="password" icon="bx-lock" type="password" />
        <Button type="submit" disabled={!isValid}>
          로그인
        </Button>
      </form>
    </LoginPageStyled>
  );
};

export default Login;
