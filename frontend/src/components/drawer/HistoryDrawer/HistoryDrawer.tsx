import { AiOutlineClose, AiOutlineLink } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Drawer, DrawerProps, Flex, List, Space, Tag } from 'antd';
import { useRecoilValue } from 'recoil';

import { useDraftQuery, useDraftRemoveMutation } from '~/hooks/queryHooks/useDraftQuery';
import { teamStore } from '~/stores/team';

interface HistoryDrawerProps extends DrawerProps {
  onCopy?: (id: string) => void;
  onClose?: () => void;
}

const HistoryDrawer = ({ onCopy, onClose, ...props }: HistoryDrawerProps) => {
  const team = useRecoilValue(teamStore);
  const existTeam = team.id !== '';

  const { drafts, isLoading } = useDraftQuery({ teamId: team.id, enabled: existTeam });
  const { removeDraftMutate } = useDraftRemoveMutation({ teamId: team.id });

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
    <Drawer
      title="히스토리"
      closable={false}
      extra={RenderExtra}
      onClose={onClose}
      rootClassName="ant-drawer-inline"
      getContainer={() => {
        return document.getElementById('layout') || document.body;
      }}
      {...props}
    >
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
                  <Tag style={{ width: '6rem', textAlign: 'center' }} color={position.color}>
                    {position.name}
                  </Tag>
                  <Tag>
                    {draft.startPeriod} - {draft.endPeriod}
                  </Tag>
                </Space>

                {/* Buttons Wrap */}
                <Flex gap={2}>
                  <Button
                    icon={<AiOutlineLink size="2.2rem" />}
                    type="text"
                    onClick={() => {
                      onCopy?.(`http://amgcom.site/${draft.id}`);
                      onClose?.();
                    }}
                  />
                  <Button
                    icon={<FaTrashAlt size="1.8rem" style={{ marginTop: 2 }} />}
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
