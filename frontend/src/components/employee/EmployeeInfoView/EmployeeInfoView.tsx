import { useState } from 'react';
import { BiSolidIdCard } from 'react-icons/bi';
import { FaSignature } from 'react-icons/fa';
import { RiBankCard2Fill } from 'react-icons/ri';

import { Descriptions, Divider, Flex, Skeleton, Tag } from 'antd';

import ImagePreview from '~/components/common/ImagePreview';
import { useEmployeeDetailQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { formatPhoneNumber, formatSSN } from '~/utils/formatData';

import { EmployeeInfoViewStyled } from './styled';

export interface EmployeeInfoViewProps {
  employeeId?: string;
}

const EmployeeInfoView = ({ employeeId }: EmployeeInfoViewProps) => {
  const { employee } = useEmployeeDetailQuery({ employeeId: employeeId, enabled: !!employeeId });

  const [showIdCard, setShowIdCard] = useState<boolean>(false);
  const [showBankBook, setShowBankBook] = useState<boolean>(false);
  const [showContract, setShowContract] = useState<boolean>(false);

  const handleIdCardClick = () => setShowIdCard(true);
  const handleIdCardClose = () => setShowIdCard(false);

  const handleBankBookClick = () => setShowBankBook(true);
  const handleBankBookClose = () => setShowBankBook(false);

  const handleContractClick = () => setShowContract(true);
  const handleContractClose = () => setShowContract(false);

  if (!employee) return <Skeleton active />;
  return (
    <EmployeeInfoViewStyled className="EmployeeInfoView">
      <Descriptions
        column={1}
        title="상세정보"
        colon={false}
        contentStyle={{ display: 'inline-block', textAlign: 'right' }}
      >
        <Descriptions.Item label="이름">{employee.name}</Descriptions.Item>
        <Descriptions.Item label="주민등록번호">{formatSSN(employee.ssn)}</Descriptions.Item>
        <Descriptions.Item label="거주지">{employee.address}</Descriptions.Item>
        <Descriptions.Item label="연락처">{formatPhoneNumber(employee.phone)}</Descriptions.Item>
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
        <Descriptions.Item label="소속 업체">{employee.team.name}</Descriptions.Item>
        <Descriptions.Item label="단가">
          {employee.position.pay.toLocaleString()}원
        </Descriptions.Item>
        <Descriptions.Item label="계약기간">
          {employee.startPeriod} ~ {employee.endPeriod}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Flex gap={12}>
        <button className="img-btn" onClick={handleIdCardClick}>
          <BiSolidIdCard size={24} />
          신분증
        </button>
        <button className="img-btn" onClick={handleBankBookClick}>
          <RiBankCard2Fill rotate="-60deg" size={24} style={{ padding: '1px' }} />
          통장사본
        </button>
        <button className="img-btn" onClick={handleContractClick}>
          <FaSignature size={24} />
          계약서
        </button>
      </Flex>

      <ImagePreview src={employee.idCard} open={showIdCard} onClose={handleIdCardClose} />
      <ImagePreview src={employee.bankBook} open={showBankBook} onClose={handleBankBookClose} />
    </EmployeeInfoViewStyled>
  );
};

export default EmployeeInfoView;
