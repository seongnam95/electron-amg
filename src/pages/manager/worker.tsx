import { useState } from 'react';
import { useQuery } from 'react-query';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { fetchGroups } from '~/api/group';
import Button from '~/components/common/Button';
import LayoutConfig from '~/components/layouts/LayoutConfig/LayoutConfig';
import GroupSideBar from '~/components/worker/GroupSideBar';
import GroupTitle from '~/components/worker/GroupTitle';
import { userState } from '~/stores/user';
import { WorkerPageStyled } from '~/styles/pageStyled/workerPageStyled';

const Worker = () => {
  const {
    user: { isAdmin },
  } = useRecoilValue(userState);

  const [groupId, setGroupId] = useState<string>('all');
  const { data, isLoading } = useQuery('groupQuery', fetchGroups, {
    staleTime: 1000 * 60 * 5,
  });

  const currentGroup = data?.filter(group => group.id === groupId)[0];
  const headerText = groupId === 'all' ? '전체' : groupId === 'etc' ? '기타' : currentGroup?.name;

  return (
    <WorkerPageStyled className="WorkerPage">
      <LayoutConfig breadcrumbs={['매니저', '직원 관리']} />

      {/* 그룹 사이드 바 */}
      <GroupSideBar onChange={id => setGroupId(id)} />

      <motion.div
        key={groupId}
        className="worker-content"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 그룹 헤더 타이틀 */}
        <GroupTitle headerText={headerText} group={currentGroup} />

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
    </WorkerPageStyled>
  );
};

export default Worker;
