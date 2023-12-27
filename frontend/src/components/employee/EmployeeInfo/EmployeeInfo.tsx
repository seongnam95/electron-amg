import { BiSolidIdCard } from 'react-icons/bi';
import { FaSignature } from 'react-icons/fa';
import { RiBankCard2Fill } from 'react-icons/ri';

import { Descriptions, Divider, Empty, Flex, Skeleton, Tag } from 'antd';

import ImageViewButton from '~/components/common/ImageViewButton';
import { EmployeeData, EmployeeDocument } from '~/types/employee';
import { SALARY } from '~/types/position';
import { TeamData } from '~/types/team';
import { UnitData } from '~/types/unit';
import { formatPhoneNumber, formatSSN } from '~/utils/formatData';

interface EmployeeInfoProps {
  team?: TeamData;
  employee?: EmployeeData;
  unit?: UnitData;
  documents?: EmployeeDocument;
  loading?: boolean;
}

const EmployeeInfo = ({ team, employee, unit, documents, loading }: EmployeeInfoProps) => {
  if (loading) return <Skeleton active />;
  else if (!employee || !team || !unit) return <Empty style={{ marginTop: '20%' }} />;

  return (
    <>
      <Descriptions
        column={1}
        title="상세정보"
        colon={false}
        contentStyle={{ display: 'inline-block', textAlign: 'right' }}
      >
        <Descriptions.Item label="이름">{employee.name}</Descriptions.Item>
        <Descriptions.Item label="주민등록번호">{formatSSN(employee.ssn)}</Descriptions.Item>
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
        <Descriptions.Item label="소속 업체">{team.name}</Descriptions.Item>

        <Descriptions.Item label="대행사 단가">
          <Tag>{unit.name}</Tag>
          {unit.unitPay.toLocaleString()}원
        </Descriptions.Item>

        <Descriptions.Item label="계약 수당">
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
          src={documents?.idCard}
        />
        <ImageViewButton
          label="통장사본"
          icon={<RiBankCard2Fill rotate="-60deg" size={24} style={{ padding: '1px' }} />}
          src={documents?.bankBook}
        />
        <ImageViewButton label="계약서" icon={<FaSignature size={24} />} src={documents?.sign} />
      </Flex>
    </>
  );
};

export default EmployeeInfo;
