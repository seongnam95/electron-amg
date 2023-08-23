import { useState } from 'react';

import { Empty } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import GroupEditorModal from '~/components/GroupEditorModal';
import Button from '~/components/common/Button';
import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import GroupSideBar from '~/components/worker/GroupSideBar';
import WorkerTable from '~/components/worker/WorkerTable/WorkerTable';
import { filteredGroupState } from '~/stores/group';
import { userState } from '~/stores/user';
import { filteredWorkerState } from '~/stores/worker';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';

const Worker = () => {
  const isAdmin = useRecoilValue(userState).isAdmin;

  const [groupId, setGroupId] = useState<string>('all');
  const [isEditing, setIsEditing] = useState<boolean>();

  const workers = useRecoilValue(filteredWorkerState(groupId));
  const currentGroup = useRecoilValue(filteredGroupState(groupId));
  const headerText = groupId === 'all' ? '전체' : groupId === 'etc' ? '기타' : currentGroup.name;

  const showEditorModal = () => {
    if (currentGroup) setIsEditing(true);
  };

  const hideEditorModal = () => {
    if (currentGroup) setIsEditing(false);
  };

  return (
    <WorkerPageStyled className="WorkerPage">
      <LayoutConfig breadcrumbs={[' 매니저', '직원 관리']} />

      {/* 그룹 선택 사이드 바 */}
      {isAdmin && <GroupSideBar onChange={id => setGroupId(id)} />}

      {/* 콘텐츠 */}
      <motion.div
        key={groupId}
        className="worker-content"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 그룹 헤더 타이틀 */}
        <div className={clsx('header-text', currentGroup && 'is-group')} onClick={showEditorModal}>
          {headerText}
          {currentGroup && currentGroup.explanation && (
            <span className="explanation-text">{currentGroup.explanation}</span>
          )}
          {currentGroup && currentGroup.userName && (
            <span className="manager-text">
              담당자 <span className="manager-name">{currentGroup.userName}</span>
            </span>
          )}
        </div>

        {/* 그룹 에디터 모달 */}
        {currentGroup && (
          <GroupEditorModal
            group={currentGroup}
            open={isEditing}
            onSubmit={hideEditorModal}
            onCancel={hideEditorModal}
          />
        )}

        {/* 필터/컨트롤 바 */}
        <div className="worker-control-bar">
          <Button styled={{ variations: 'icon', animate: false }}>
            <i className="bx bx-trash" />
          </Button>
          <Button styled={{ variations: 'link', size: 'small', animate: false }}>
            계약서 폼 생성
          </Button>
        </div>

        {/* 워커 테이블 */}
        {workers.length ? (
          <WorkerTable allWorker={groupId === 'all'} items={workers} />
        ) : (
          <div className="empty-wrap">
            <Empty description="빈 그룹" />
          </div>
        )}
      </motion.div>
    </WorkerPageStyled>
  );
};

export default Worker;
