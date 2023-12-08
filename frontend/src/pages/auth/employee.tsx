import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { VscRefresh } from 'react-icons/vsc';

import { Flex, Pagination, Segmented, DropdownProps, Dropdown, Button } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { useRecoilValue } from 'recoil';

import DropdownItem from '~/components/common/DropdownItem';
import DraftCreateDrawer from '~/components/drawer/DraftCreateDrawer';
import EmployeeInfoDrawer from '~/components/drawer/EmployeeInfoDrawer';
import HistoryDrawer from '~/components/drawer/HistoryDrawer';
import EmployeeTable from '~/components/employee/EmployeeTable';
import { useEmployeeQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { useCopyText } from '~/hooks/useCopyText';
import { useDragScroll } from '~/hooks/useDragScroll';
import { useRemoveEmployee } from '~/hooks/useRemoveEmployee';
import { useSoundApp } from '~/hooks/useSoundApp';
import { teamStore } from '~/stores/team';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';

type ViewType = 'all' | 'valid' | 'invalid';

const EmployeePage = () => {
  // ---- State
  const team = useRecoilValue(teamStore);

  const [employeeId, setEmployeeId] = useState<string>();
  const [viewType, setViewType] = useState<ViewType>('all');

  const [openEmployeeInfoDrawer, setOpenEmployeeInfoDrawer] = useState<boolean>(false);
  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  // ---- Hook
  const tableWrapRef = useDragScroll();
  const { copyText } = useCopyText();
  const { soundMessage } = useSoundApp();

  const { employees, isLoading, refetch } = useEmployeeQuery({
    teamId: team.id,
    valid: viewType === 'valid' ? true : viewType === 'invalid' ? false : undefined,
    enabled: team.existTeam,
  });

  const { removeEmployee } = useRemoveEmployee({
    teamId: team.id,
    onSuccess: () => {
      setOpenEmployeeInfoDrawer(false);
    },
  });

  // ---- Handler
  const handleChangeView = (view: SegmentedValue) => {
    setViewType(view as ViewType);
    if (tableWrapRef.current) tableWrapRef.current.scrollTo({ top: 0 });
  };

  const handleClickName = (id: string) => {
    setEmployeeId(id);
    setOpenEmployeeInfoDrawer(true);
  };

  const handleRefetch = () => {
    refetch().then(() => {
      soundMessage.info('새로고침 되었습니다.');
      if (tableWrapRef.current) tableWrapRef.current.scrollTo({ top: 0 });
    });
  };

  const segmentedOptions = [
    { label: '전체', value: 'all' },
    { label: '계약중', value: 'valid' },
    { label: '계약종료', value: 'invalid' },
  ];

  const menuItems = [
    {
      key: 'create-draft',
      label: <DropdownItem label="계약서 초안 생성" icon={<FiPlus size={18} />} color="#1677FF" />,
      onClick: () => setOpenDraftDrawer(true),
    },
    {
      key: 'refetch',
      label: <DropdownItem label="새로고침" icon={<VscRefresh size={17} />} />,
      onClick: handleRefetch,
    },
  ];

  const selectedEmployee = employees.find(employee => employee.id === employeeId);
  return (
    <EmployeePageStyled className="EmployeePage">
      <Flex gap={14} align="center" justify="space-between" style={{ padding: '2rem' }}>
        <Segmented defaultValue={viewType} options={segmentedOptions} onChange={handleChangeView} />
        <Dropdown placement="bottomRight" trigger={['click']} arrow menu={{ items: menuItems }}>
          <Button
            type="text"
            shape="circle"
            icon={<HiOutlineDotsVertical size={18} style={{ marginBottom: 1 }} />}
          />
        </Dropdown>
      </Flex>

      {/* 근무자 테이블 */}
      <Flex className="table-container" flex={1} vertical>
        <EmployeeTable
          isLoading={isLoading}
          employees={employees}
          tableWrapRef={tableWrapRef}
          onCopy={copyText}
          onRemove={removeEmployee}
          onClickName={handleClickName}
        />
      </Flex>

      <Flex justify="center" style={{ padding: '1.2rem 0' }}>
        <Pagination current={0} />
      </Flex>

      {/* 근로자 정보 Drawer */}
      <EmployeeInfoDrawer
        open={openEmployeeInfoDrawer}
        employee={selectedEmployee}
        onRemove={removeEmployee}
        onClose={() => setOpenEmployeeInfoDrawer(false)}
      />

      {/* 계약서 폼 생성 Drawer */}
      <DraftCreateDrawer
        open={openDraftDrawer}
        onCopy={copyText}
        onHistory={() => setOpenHistoryDrawer(true)}
        onClose={() => setOpenDraftDrawer(false)}
      />

      {/* 계약서 폼 히스토리 Drawer */}
      {team && (
        <HistoryDrawer
          open={openHistoryDrawer}
          onCopy={copyText}
          onClose={() => setOpenHistoryDrawer(false)}
        />
      )}
    </EmployeePageStyled>
  );
};

export default EmployeePage;
