import { useState } from 'react';

import { ModalProps, Skeleton } from 'antd';

import Button from '~/components/common/Button';
import { useGroupQuery } from '~/hooks/queryHooks/useGroupQuery';
import { useWorkerMutation, workerKeys } from '~/hooks/queryHooks/useWorkerQuery';

import GroupItem from '../GroupSideBar/GroupItem';
import { WorkerGroupMoveModalStyled } from './styled';

export interface WorkerGroupMoveModalProps extends ModalProps {
  selectedWorkerIds: string[];
  className?: string;
  onClose?: () => void;
}

const WorkerGroupMoveModal = ({
  selectedWorkerIds,
  open,
  onClose,
  ...rest
}: WorkerGroupMoveModalProps) => {
  const [targetGroupID, setTargetGroupID] = useState<string>('');

  const { groupMoveMutate } = useWorkerMutation(workerKeys.all);
  const { groups, isGroupLoading } = useGroupQuery();

  const handleSubmit = () => {
    groupMoveMutate(
      {
        groupId: targetGroupID !== 'etc' ? targetGroupID : undefined,
        workerIds: selectedWorkerIds,
      },
      { onSuccess: () => handleClose() },
    );
  };

  const handleClose = () => {
    setTargetGroupID('');
    onClose?.();
  };

  // Footer 버튼 렌더러
  const RenderFooter = () => (
    <div className="footer-wrap">
      <div className="btn-wrap">
        <Button className="btn-cancel" variations="link" onClick={handleClose}>
          취소
        </Button>
        <Button
          className="btn-ok"
          variations="link"
          primary
          onClick={handleSubmit}
          disabled={!targetGroupID}
        >
          이동
        </Button>
      </div>
    </div>
  );

  return (
    <WorkerGroupMoveModalStyled
      title="그룹 선택"
      open={open}
      centered
      footer={<RenderFooter />}
      {...rest}
    >
      {!isGroupLoading ? (
        <ul className="group-list">
          <GroupItem
            id="etc"
            label="기타"
            color="#333333"
            onClick={() => setTargetGroupID('etc')}
            activate={targetGroupID === 'etc'}
          />
          {groups?.map(group => (
            <GroupItem
              key={group.id}
              id={group.id}
              label={group.name}
              color={group.hexColor}
              onClick={() => setTargetGroupID(group.id)}
              activate={group.id === targetGroupID}
            />
          ))}
        </ul>
      ) : (
        <Skeleton active />
      )}
    </WorkerGroupMoveModalStyled>
  );
};

export default WorkerGroupMoveModal;
