import { ModalProps, Select, DatePicker } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { Button, Input } from '@components/common';

import { TeamData } from '~/types/team';

import { DraftCreateModalStyled } from './styled';

export interface DraftCreateModalProps extends ModalProps {
  team: TeamData;
  onClose?: () => void;
}

const DraftCreateModal = ({ team, open, onClose, ...rest }: DraftCreateModalProps) => {
  const RenderFooter = () => (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <Button className="btn-cancel" $variations="link" onClick={onClose}>
        취소
      </Button>
      <Button className="btn-ok" $variations="link" $primary>
        생성
      </Button>
    </div>
  );

  return (
    <DraftCreateModalStyled
      title="계약서 초안 생성"
      open={open}
      centered
      footer={<RenderFooter />}
      {...rest}
    >
      <Select defaultValue="알바" />
      <Select defaultValue="일급" />
      <DatePicker.RangePicker style={{ width: '100%' }} />

      <Input />
    </DraftCreateModalStyled>
  );
};

export default DraftCreateModal;
