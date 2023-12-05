import { useEffect, useRef, useState } from 'react';
import { LuUser2, LuLock } from 'react-icons/lu';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Form, Input, InputRef } from 'antd';
import axios, { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { loginUser } from '~/api/auth';
import { useSoundApp } from '~/hooks/useSoundApp';
import { userStore } from '~/stores/user';
import { LoginPageStyled } from '~/styles/pageStyled/loginPageStyled';
import { UserData } from '~/types/user';

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
  const [form] = Form.useForm();

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

      const user: UserData = { isLogin: true, ...response.data };
      setUser(user);

      if (user.hasTeam) navigate('/management/dashboard');
      else navigate('/init');
    },
    onError: ({ response }: AxiosError<{ msg: string }>) => {
      const msg = response?.data.msg || '';
      soundMessage.error(msg);
      inputFocusing();
    },
  });

  const handleSubmit = (data: LoginFormData) => {
    if (!data.username || !data.password) {
      soundMessage.error('아이디와 패스워드를 입력해주세요');
      return;
    }

    mutate({ ...data, accessIp: geoData?.ip });
  };

  return (
    <LoginPageStyled className="LoginPage">
      <p className="title">AMG</p>
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={() => soundMessage.error('아이디와 패스워드를 입력해주세요')}
      >
        <Flex vertical style={{ width: 250 }}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '' }]}
            style={{ marginBottom: 12 }}
          >
            <Input className="login-input" prefix={<LuUser2 />} ref={usernameInputRef} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '' }]}>
            <Input.Password className="login-input" prefix={<LuLock />} />
          </Form.Item>
        </Flex>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isLoading}
          style={{ width: '100%' }}
        >
          로그인
        </Button>
      </Form>
    </LoginPageStyled>
  );
};

export default LoginPage;
