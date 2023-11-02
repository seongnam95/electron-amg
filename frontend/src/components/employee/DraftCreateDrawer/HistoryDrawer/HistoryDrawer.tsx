import { AiOutlineLink, AiTwotoneDelete } from 'react-icons/ai';

import { Button, DrawerProps, Flex, List, Space, Tag } from 'antd';

import { useDraftRemove } from '~/hooks/queryHooks/useDraftQuery';
import { DraftData } from '~/types/draft';
import { POSITION_CODE, POSITION_COLORS } from '~/types/position';

import { HistoryDrawerStyled } from './styled';

interface HistoryDrawerProps extends DrawerProps {
  drafts: Array<DraftData>;
  onClickCopy?: (id: string) => void;
}

const HistoryDrawer = ({ drafts, onClickCopy, ...props }: HistoryDrawerProps) => {
  const { removeDraftMutate } = useDraftRemove();

  const handleRemoveClick = (id: string) => removeDraftMutate(id);

  return (
    <HistoryDrawerStyled closable={false} {...props}>
      <List itemLayout="vertical">
        {drafts.map(draft => {
          const { position } = draft;

          return (
            <List.Item key={draft.id}>
              <Flex justify="space-between">
                <Space>
                  <Tag
                    style={{ width: '6rem', textAlign: 'center' }}
                    color={POSITION_COLORS[position.positionCode]}
                  >
                    {POSITION_CODE[position.positionCode]}
                  </Tag>
                  <Tag>
                    {draft.startPeriod} - {draft.endPeriod}
                  </Tag>
                </Space>
                {/* Buttons Wrap */}
                <Flex>
                  <Button
                    icon={<AiOutlineLink size="2rem" />}
                    type="link"
                    onClick={() => onClickCopy?.(draft.id)}
                  ></Button>
                  <Button
                    icon={<AiTwotoneDelete size="2rem" />}
                    type="text"
                    danger
                    onClick={() => handleRemoveClick(draft.id)}
                  ></Button>
                </Flex>
              </Flex>
            </List.Item>
          );
        })}
      </List>
    </HistoryDrawerStyled>
  );
};

export default HistoryDrawer;
