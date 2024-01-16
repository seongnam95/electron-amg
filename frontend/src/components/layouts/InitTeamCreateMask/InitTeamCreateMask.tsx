import ReactDOM from 'react-dom';
import { FaFlag } from 'react-icons/fa6';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { Button, Space, Typography } from 'antd';

import { InitTeamCreateMaskStyled } from './styled';

const InitTeamCreateMask = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/init');

  return ReactDOM.createPortal(
    <InitTeamCreateMaskStyled>
      <Space direction="vertical" align="center">
        <FaFlag size={24} style={{ marginBottom: 8 }} />
        <Typography.Title level={4}>생성된 팀이 없습니다.</Typography.Title>
        <Button type="primary" icon={<IoMdAdd />} onClick={handleClick}>
          팀 생성하기
        </Button>
      </Space>
    </InitTeamCreateMaskStyled>,
    document.body,
  );
};

export default InitTeamCreateMask;
