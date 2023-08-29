import { useState } from 'react';
import { useQuery } from 'react-query';

import { motion } from 'framer-motion';

import { fetchGroups } from '~/api/group';
import Button from '~/components/common/Button';
import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import GroupEditorModal from '~/components/worker/GroupEditorModal';
import GroupSideBar from '~/components/worker/GroupSideBar';
import GroupTitle from '~/components/worker/GroupTitle';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';
import { GroupData } from '~/types/group';

const Worker = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [showCreator, setShowCreator] = useState<boolean>(false);

  const { data: groups, isLoading } = useQuery<GroupData[]>('groupQuery', fetchGroups, {
    staleTime: 1000 * 60 * 5,
  });
  console.log(groups);
  const selectedGroup = groups?.filter(group => String(group.id) === selectedGroupId)[0];
  const groupName =
    selectedGroupId === 'all' ? '전체' : selectedGroupId === 'etc' ? '기타' : selectedGroup?.name;

  if (isLoading) return <>로딩중</>;
  return (
    <WorkerPageStyled className="WorkerPage">
      <LayoutConfig breadcrumbs={['매니저', '직원 관리']} />

      {/* 그룹 사이드 바 */}
      <GroupSideBar
        groups={groups}
        selected={selectedGroupId}
        onChange={id => setSelectedGroupId(id)}
        onCreate={() => setShowCreator(true)}
      />

      <motion.div
        key={selectedGroupId}
        className="worker-content"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 그룹 헤더 타이틀 */}
        <GroupTitle groupName={groupName} onClick={selectedGroup && (() => setShowEditor(true))} />

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
        {/* {workers.length ? (
          <WorkerTable allWorker={groupId === 'all'} items={workers} />
        ) : (
          <div className="empty-wrap">
            <Empty description="빈 그룹" />
          </div>
        )} */}
      </motion.div>

      <GroupEditorModal
        create={showCreator}
        group={showEditor ? selectedGroup : undefined}
        open={showEditor || showCreator}
        onClose={() => {
          setShowEditor(false);
          setShowCreator(false);
        }}
      />
    </WorkerPageStyled>
  );
};

export default Worker;
