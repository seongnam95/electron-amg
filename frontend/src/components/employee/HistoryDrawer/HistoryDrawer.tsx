import { AiOutlineClose, AiOutlineLink, AiTwotoneDelete } from 'react-icons/ai';

import { Button, Drawer, DrawerProps, Flex, List, Space, Tag } from 'antd';

import { useDraftQuery, useDraftRemoveMutation } from '~/hooks/queryHooks/useDraftQuery';
import { POSITION_CODE, POSITION_COLORS } from '~/types/position';

/**
 * useDraftHook을 사용해 Draft 데이터들을 불러온 후 리스트에 랜더링
 * useDraftRemove을 사용해 Draft 데이터를 삭제
 */

interface HistoryDrawerProps extends DrawerProps {
  teamId: string;
  onCopy?: (id: string) => void;
  onClose?: () => void;
}

const HistoryDrawer = ({ teamId, onCopy, onClose, ...props }: HistoryDrawerProps) => {
  const { drafts, isLoading } = useDraftQuery({ teamId: teamId });
  const { removeDraftMutate } = useDraftRemoveMutation({ teamId: teamId });

  // 계정 삭제 핸들러
  const handleRemoveClick = (id: string) => removeDraftMutate(id);

  const RenderExtra = (
    <Button
      type="text"
      icon={<AiOutlineClose size="1.8rem" style={{ marginTop: 2 }} />}
      onClick={onClose}
    />
  );

  return (
    <Drawer closable={false} extra={RenderExtra} onClose={onClose} {...props}>
      <List
        loading={isLoading}
        dataSource={drafts}
        itemLayout="vertical"
        renderItem={draft => {
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
                    onClick={() => {
                      onCopy?.(draft.id);
                      onClose?.();
                    }}
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
        }}
      />
    </Drawer>
  );
};

export default HistoryDrawer;
