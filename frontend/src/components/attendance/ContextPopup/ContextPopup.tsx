import { ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Button, Flex, Space } from 'antd';

import { ContextPopupStyled } from './styled';

export interface ContextPopupProps {
  title?: ReactNode;
  children?: ReactNode;
  onCancel?: () => void;
}

const ContextPopup = ({ title, children, onCancel }: ContextPopupProps) => {
  return (
    <ContextPopupStyled className="ContextPopup">
      <Flex className="popup-title" align="center" justify="space-between" gap={14}>
        <span className="title-wrap">{title}</span>
        <Button
          type="text"
          size="small"
          icon={<AiOutlineClose size="1.6rem" />}
          onClick={onCancel}
        />
      </Flex>
      <Space className="popup-content">{children}</Space>
    </ContextPopupStyled>
  );
};

export default ContextPopup;
