import { useEffect, useRef, useState } from 'react';
import { GoLock } from 'react-icons/go';
import { LuUser2 } from 'react-icons/lu';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Form, Input, InputRef } from 'antd';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import { loginUser } from '~/api/auth';
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

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const usernameInputRef = useRef<InputRef>(null);

  const setUser = useSetRecoilState(userStore);
  const [geoData, setGeoData] = useState<GeoLocationI>();

  const navigate = useNavigate();
  const { soundMessage } = useSoundApp();

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
    inputFocusing();
  }, []);

  const inputFocusing = () => usernameInputRef.current?.focus();

  const { mutate, isLoading } = useMutation(['auth'], loginUser, {
    onSuccess: response => {
      const accessToken = response.headers['authorization'];
      sessionStorage.setItem('authorization', accessToken);

      const user: CurrentUser = {
        isLogin: true,
        user: response.data,
      };

      setUser(user);
      navigate('/management/dashboard');
    },

    onError: () => {
      inputFocusing();
      soundMessage.error('잠시 후 다시 시도해주세요.');
    },
  });

  const handleSubmit = (data: LoginFormData) => {
    mutate({ ...data, accessIp: geoData?.ip });
  };

  return (
    <LoginPageStyled className="LoginPage">
      <p className="title">LOGIN</p>
      <Form onFinish={handleSubmit}>
        <Flex vertical>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
          >
            <Input prefix={<LuUser2 />} size="large" ref={usernameInputRef} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '패스워드를 입력해주세요.' }]}
          >
            <Input.Password size="large" prefix={<GoLock />} />
          </Form.Item>
        </Flex>
        <Button type="primary" size="large" htmlType="submit" loading={isLoading}>
          LOGIN
        </Button>
      </Form>
    </LoginPageStyled>
  );
};

export default LoginPage;
