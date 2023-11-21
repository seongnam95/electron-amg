import { useState } from 'react';
import { BiSolidIdCard } from 'react-icons/bi';
import { FaSignature, FaTrashAlt } from 'react-icons/fa';
import { RiBankCard2Fill } from 'react-icons/ri';

import { Button, Descriptions, Divider, Drawer, Flex, Skeleton, Tag } from 'antd';
import { DrawerProps } from 'antd';
import { useRecoilValue } from 'recoil';

import ImagePreview from '~/components/common/ImagePreview';
import { useEmployeeDocumentQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { teamStore } from '~/stores/team';
import { EmployeeData } from '~/types/employee';
import { SALARY } from '~/types/position';
import { formatPhoneNumber, formatSSN } from '~/utils/formatData';

import ImageViewButton from './ImageViewButton';

export interface EmployeeInfoDrawerProps extends DrawerProps {
  employee?: EmployeeData;
  onRemove?: (ids: string) => void;
}

const EmployeeInfoDrawer = ({ employee, onRemove, ...props }: EmployeeInfoDrawerProps) => {
  const team = useRecoilValue(teamStore);

  const { employeeDocument, isLoading: isQueryLoading } = useEmployeeDocumentQuery({
    employeeId: employee?.id,
    enabled: !!employee?.id,
  });

  const isLoading = employee === undefined || !employeeDocument || isQueryLoading;

  const [showIdCard, setShowIdCard] = useState<boolean>(false);
  const [showBankBook, setShowBankBook] = useState<boolean>(false);
  const [showContract, setShowContract] = useState<boolean>(false);

  // 신분증 버튼 핸들러
  const handleIdCardClick = () => setShowIdCard(true);
  const handleIdCardClose = () => setShowIdCard(false);

  // 통장사본 버튼 핸들러
  const handleBankBookClick = () => setShowBankBook(true);
  const handleBankBookClose = () => setShowBankBook(false);

  // 계약서 버튼 핸들러
  const handleContractClick = () => setShowContract(true);
  const handleContractClose = () => setShowContract(false);

  const handleRemove = () => {
    if (employee?.id) onRemove?.(employee.id);
  };

  const RenderExtra = (
    <Button type="text" danger icon={<FaTrashAlt size="1.6rem" onClick={handleRemove} />} />
  );

  return (
    <Drawer
      title="근무자 정보"
      extra={RenderExtra}
      closable={false}
      getContainer={false}
      {...props}
    >
      {!isLoading ? (
        <>
          <Descriptions
            column={1}
            title="상세정보"
            colon={false}
            contentStyle={{ display: 'inline-block', textAlign: 'right' }}
          >
            <Descriptions.Item label="이름">{employee.name}</Descriptions.Item>
            <Descriptions.Item label="주민등록번호">{formatSSN(employee.ssn)}</Descriptions.Item>
            <Descriptions.Item label="거주지">{employee.address}</Descriptions.Item>
            <Descriptions.Item label="연락처">
              {formatPhoneNumber(employee.phone)}
            </Descriptions.Item>
            <Descriptions.Item label="계좌번호">
              <Tag>{employee.bank}</Tag>
              {employee.bankNum}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions
            column={1}
            colon={false}
            title="계약조건"
            contentStyle={{ display: 'inline-block', textAlign: 'right' }}
          >
            <Descriptions.Item label="소속 업체">{team.name}</Descriptions.Item>
            <Descriptions.Item label="기준 수당">
              <Tag>{SALARY[employee.position.salaryCode]}</Tag>
              {employee.position.standardPay.toLocaleString()}원
            </Descriptions.Item>
            <Descriptions.Item label="계약기간">
              {employee.startPeriod} ~ {employee.endPeriod}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Flex gap={12}>
            <ImageViewButton
              label="신분증"
              icon={<BiSolidIdCard size={24} />}
              src={employeeDocument.idCard}
            />
            <ImageViewButton
              label="통장사본"
              icon={<RiBankCard2Fill rotate="-60deg" size={24} style={{ padding: '1px' }} />}
              src={employeeDocument.bankBook}
            />
            <ImageViewButton
              label="계약서"
              icon={<FaSignature size={24} />}
              src={employeeDocument.idCard}
            />
          </Flex>
        </>
      ) : (
        <Skeleton active />
      )}
    </Drawer>
  );
};

export default EmployeeInfoDrawer;
