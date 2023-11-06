import { AiOutlineLink, AiTwotoneDelete } from 'react-icons/ai';

import { Button, Flex, List, Skeleton, Space, Tag } from 'antd';

import { useDraftQuery, useDraftRemove } from '~/hooks/queryHooks/useDraftQuery';
import { POSITION_CODE, POSITION_COLORS } from '~/types/position';

import { HistoryViewStyled } from './styled';

interface HistoryViewProps {
  selectedTeamId?: string;
  onCopy?: (id: string) => void;
}

const HistoryView = ({ selectedTeamId, onCopy }: HistoryViewProps) => {
  if (!selectedTeamId) return <Skeleton active style={{ padding: '2rem' }} />;

  const { removeDraftMutate } = useDraftRemove();

  const handleRemoveClick = (id: string) => removeDraftMutate(id);

  const { drafts } = useDraftQuery({ teamId: selectedTeamId });

  return (
    <HistoryViewStyled>
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
                    onClick={() => onCopy?.(draft.id)}
                  />

                  <Button
                    icon={<AiTwotoneDelete size="2rem" />}
                    type="text"
                    danger
                    onClick={() => handleRemoveClick(draft.id)}
                  />
                </Flex>
              </Flex>
            </List.Item>
          );
        })}
      </List>
    </HistoryViewStyled>
  );
};

export default HistoryView;
