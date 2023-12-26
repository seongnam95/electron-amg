import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { ImFileExcel } from 'react-icons/im';
import { VscRefresh } from 'react-icons/vsc';

import { Flex, Segmented, Dropdown, Button, Tooltip } from 'antd';
import { useRecoilValue } from 'recoil';

import Dock from '~/components/common/Dock';
import DropdownItem from '~/components/common/DropdownItem';
import DraftCreateDrawer from '~/components/drawer/DraftCreateDrawer';
import HistoryDrawer from '~/components/drawer/HistoryDrawer';
import EmployeeTable from '~/components/employee/EmployeeTable';
import { useEmployeeInfoDrawer } from '~/hooks/componentHooks/useEmployeeInfoDrawer';
import { useSoundApp } from '~/hooks/componentHooks/useSoundApp';
import { useEmployee } from '~/hooks/queryHooks/useEmployeeQuery';
import { useCopyText } from '~/hooks/useCopyText';
import { useRemoveEmployee } from '~/hooks/useRemoveEmployee';
import { teamStore } from '~/stores/team';
import { EmployeePageStyled } from '~/styles/pageStyled/employeePageStyled';
import { EmployeeData } from '~/types/employee';

type ViewType = 'all' | 'valid' | 'invalid';

const EmployeePage = () => {
  /** State */
  const team = useRecoilValue(teamStore);

  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeData[]>([]);
  const [viewType, setViewType] = useState<ViewType>('all');

  const [openDraftDrawer, setOpenDraftDrawer] = useState<boolean>(false);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState<boolean>(false);

  /** Hook */
  const { copyText } = useCopyText();
  const { soundMessage } = useSoundApp();

  const { openDrawer, renderDrawer } = useEmployeeInfoDrawer();

  const { removeEmployee } = useRemoveEmployee({
    teamId: team.id,
    onSuccess: () => setSelectedEmployees([]),
  });

  const { employees, isLoading, refetch } = useEmployee({
    teamId: team.id,
    valid: viewType === 'valid' ? true : viewType === 'invalid' ? false : undefined,
    enabled: team.existTeam,
  });

  /** Handler */
  const handleRemove = () => removeEmployee(selectedEmployees.map(employee => employee.id));

  const handleRefetch = () => {
    refetch().then(() => {
      soundMessage.info('새로고침 되었습니다.');
    });
  };

  /** Config */
  const segmentedOptions = [
    { label: '전체', value: 'all' },
    { label: '계약중', value: 'valid' },
    { label: '계약종료', value: 'invalid' },
  ];

  const dropdownMenuItems = [
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

  const showDock = selectedEmployees.length > 0;
  return (
    <EmployeePageStyled className="EmployeePage">
      <Flex gap={14} align="center" justify="space-between" style={{ padding: '2rem' }}>
        <Segmented
          defaultValue={viewType}
          options={segmentedOptions}
          onChange={view => setViewType(view as ViewType)}
        />
        <Dropdown
          placement="bottomRight"
          trigger={['click']}
          arrow
          menu={{ items: dropdownMenuItems }}
        >
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
          loading={isLoading}
          employees={employees}
          onCopy={copyText}
          onSelect={setSelectedEmployees}
          onClickName={openDrawer}
        />

        <Dock open={showDock}>
          <Tooltip title="엑셀로 저장" mouseEnterDelay={0.6}>
            <Button
              className="excel-btn"
              type="text"
              size="large"
              icon={<ImFileExcel size="2.1rem" />}
            />
          </Tooltip>

          <Tooltip title="삭제" mouseEnterDelay={0.6}>
            <Button
              danger
              type="text"
              size="large"
              icon={<FaTrashAlt size="2.1rem" />}
              onClick={handleRemove}
            />
          </Tooltip>
        </Dock>
      </Flex>

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

      {renderDrawer}
    </EmployeePageStyled>
  );
};

export default EmployeePage;
