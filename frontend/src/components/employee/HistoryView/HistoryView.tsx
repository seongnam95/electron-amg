import { AiOutlineLink, AiTwotoneDelete } from 'react-icons/ai';

import { Button, Flex, List, Skeleton, Space, Tag } from 'antd';

import { useDraftQuery, useDraftRemove } from '~/hooks/queryHooks/useDraftQuery';
import { POSITION_CODE, POSITION_COLORS } from '~/types/position';

interface HistoryViewProps {
  selectedTeamId?: string;
  onCopy?: (id: string) => void;
}

/**
 * useDraftHook을 사용해 Draft 데이터들을 불러온 후 리스트에 랜더링
 * useDraftRemove을 사용해 Draft 데이터를 삭제
 */

const HistoryView = ({ selectedTeamId, onCopy }: HistoryViewProps) => {
  if (!selectedTeamId) return <Skeleton active style={{ marginTop: '3rem' }} />;

  const { drafts } = useDraftQuery({ teamId: selectedTeamId });
  const { removeDraftMutate } = useDraftRemove();

  // 계정 삭제 핸들러
  const handleRemoveClick = (id: string) => removeDraftMutate(id);

  return (
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
  );
};

export default HistoryView;
