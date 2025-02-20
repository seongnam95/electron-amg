import { useEffect, useRef, useState } from 'react';
import { LuUser2, LuLock } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Form, Input, InputRef } from 'antd';
import axios from 'axios';

import { LoginBody } from '~/api/auth';
import { useSoundApp } from '~/hooks/componentHooks/useSoundApp';
import { useAuth } from '~/hooks/useAuth';
import { LoginPageStyled } from '~/styles/pageStyled/loginPageStyled';

const LoginPage = () => {
  const usernameInputRef = useRef<InputRef>(null);
  const [accessIp, setAccessIp] = useState<string>('');

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { soundMessage } = useSoundApp();

  const { loginMutate, isLoginLoading } = useAuth({
    onSuccess: () => navigate('/management/dashboard'),
    onError: res => {
      const msg = res.response?.data.msg || '잠시 후 다시 시도해주세요.';
      if (res.response?.status === 401) soundMessage.info(msg);
      else soundMessage.error(msg);
    },
  });

  useEffect(() => {
    const fetchGeoData = async () => {
      await axios
        .get('https://geolocation-db.com/json/')
        .then(res => setAccessIp(res.data.IPv4))
        .catch(() => soundMessage.error('IP 조회에 실패하였습니다.'));
    };

    inputFocusing();
    fetchGeoData();
  }, []);

  const inputFocusing = () => usernameInputRef.current?.focus();
  const handleSubmit = (formData: LoginBody) => {
    const body = { ...formData, accessIp: accessIp };
    loginMutate(body);
  };

  return (
    <LoginPageStyled className="LoginPage">
      <p className="title">AMG</p>
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={() => soundMessage.error('아이디 또는 패스워드를 입력해주세요')}
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
          loading={isLoginLoading}
          style={{ width: '100%' }}
        >
          로그인
        </Button>
      </Form>
    </LoginPageStyled>
  );
};

export default LoginPage;
