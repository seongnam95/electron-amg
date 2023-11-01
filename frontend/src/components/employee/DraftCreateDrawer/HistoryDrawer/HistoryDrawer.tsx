import { DrawerProps, List, Space, Tag } from 'antd';

import { DraftData } from '~/types/draft';
import { POSITION_CODE, POSITION_COLORS } from '~/types/position';

import { HistoryDrawerStyled } from './styled';

interface HistoryDrawerProps extends DrawerProps {
  drafts: Array<DraftData>;
  onClickCopy?: (id: string) => void;
}

const HistoryDrawer = ({ drafts, onClickCopy, ...props }: HistoryDrawerProps) => {
  // rowSelection={{
  //   type: 'checkbox',
  //   onChange: handleSelectedChange,
  // }}
  return (
    <HistoryDrawerStyled closable={false} {...props}>
      <List itemLayout="vertical">
        {drafts.map(draft => {
          const { position } = draft;

          return (
            <List.Item key={draft.id}>
              <Space direction="vertical">
                <Space>
                  <Tag
                    style={{ width: '6rem', textAlign: 'center' }}
                    color={POSITION_COLORS[position.positionCode]}
                  >
                    {POSITION_CODE[position.positionCode]}
                  </Tag>
                  <span>
                    단가 <i>{position.unitPay.toLocaleString()}원</i>
                  </span>

                  <Tag onClick={() => onClickCopy?.(draft.id)}>
                    <a>{draft.id}</a>
                  </Tag>
                </Space>
                <Space>asd</Space>
              </Space>
            </List.Item>
          );
        })}
      </List>
    </HistoryDrawerStyled>
  );
};

export default HistoryDrawer;
