import { useState } from 'react';

import { motion } from 'framer-motion';

import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import GroupEditorModal from '~/components/worker/GroupEditorModal';
import GroupSideBar from '~/components/worker/GroupSideBar';
import GroupTitle from '~/components/worker/GroupTitle';
import WorkerTable from '~/components/worker/WorkerTable';
import { useEasyQuery } from '~/hooks/queryHooks/useGroup';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';
import { GroupData } from '~/types/group';

const Worker = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [showCreator, setShowCreator] = useState<boolean>(false);

  const { data: groups, isLoading } = useEasyQuery<GroupData>(
    ['group'],
    import.meta.env.VITE_GROUP_API_URL,
  );

  const selectedGroup = groups?.filter(group => String(group.id) === selectedGroupId)[0];
  const groupName =
    selectedGroupId === 'all' ? '전체' : selectedGroupId === 'etc' ? '기타' : selectedGroup?.name;

  return (
    <WorkerPageStyled className="WorkerPage">
      <LayoutConfig breadcrumbs={['매니저', '직원 관리']} />

      {/* 그룹 사이드 바 */}
      <GroupSideBar
        isLoading={isLoading}
        groups={groups}
        selected={selectedGroupId}
        onChange={e => setSelectedGroupId(e.currentTarget.id)}
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
        <GroupTitle
          groupId={selectedGroupId}
          groupName={groupName}
          explanation={selectedGroup?.explanation}
          mangerName={selectedGroup?.user?.name}
          doesExist={!!selectedGroup}
          onEditor={selectedGroup && (() => setShowEditor(true))}
        />

        {/* 워커 테이블 */}
        <WorkerTable groupId={selectedGroupId} />
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
