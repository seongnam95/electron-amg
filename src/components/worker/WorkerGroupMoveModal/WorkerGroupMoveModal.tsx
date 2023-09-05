import { ReactNode, useState } from 'react';

import { ModalProps } from 'antd';
import clsx from 'clsx';

import { ChangeGroupBody, changeGroupRequest } from '~/api/group';
import Button from '~/components/common/Button';
import { useEasyMutation, useEasyQuery } from '~/hooks/queryHooks/useGroup';
import { GroupData } from '~/types/group';

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

  const { data: groups } = useEasyQuery<GroupData>(['group'], '/group/');
  const { data: workers } = useEasyQuery<GroupData>(['worker'], '/worker/');

  const { updateMutate } = useEasyMutation(['worker'], '/worker/');

  const handleSubmit = () => {
    console.log(selectedWorkerIds);
    const body: ChangeGroupBody = {
      groupId: targetGroupID,
      worker_list: selectedWorkerIds,
    };
    changeGroupRequest(body);
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
      <ul className="group-list">
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
    </WorkerGroupMoveModalStyled>
  );
};

export default WorkerGroupMoveModal;
