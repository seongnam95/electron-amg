import { BiSolidIdCard } from 'react-icons/bi';
import { FaSignature, FaPhoneAlt, FaFlag } from 'react-icons/fa';
import { RiBankCard2Fill } from 'react-icons/ri';

import { Descriptions, Divider, Empty, Flex, Skeleton, Space, Tag, Tooltip } from 'antd';

import ImageViewButton from '~/components/common/ImageViewButton';
import { colors } from '~/styles/themes';
import { EmployeeData, EmployeeDocument, SALARY } from '~/types/employee';
import { TeamData } from '~/types/team';
import { UnitData } from '~/types/unit';
import { formatPhoneNumber, formatSSN } from '~/utils/formatData';

import { EmployeeInfoStyled } from './styled';

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

  const pay =
    employee.salaryCode === 3
      ? employee.preset * employee.position.standardPay
      : employee.position.standardPay;

  return (
    <EmployeeInfoStyled>
      <Descriptions
        className="info-card"
        title={employee.name}
        column={1}
        colon={false}
        contentStyle={{ display: 'inline-block', textAlign: 'right' }}
      >
        <Descriptions.Item label="주민등록번호">{formatSSN(employee.ssn)}</Descriptions.Item>
        <Descriptions.Item label="연락처">
          <FaPhoneAlt size={11} color={colors.iconColor2} style={{ marginRight: 10 }} />
          {formatPhoneNumber(employee.phone)}
        </Descriptions.Item>
        <Descriptions.Item label="계좌번호">
          {employee.bank && (
            <>
              <Tag>{employee.bank}</Tag>
              {employee.bankNum}
            </>
          )}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        className="info-card"
        column={1}
        colon={false}
        title={
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Flex
              align="center"
              justify="center"
              style={{
                width: '1.8rem',
                height: '1.8rem',
                backgroundColor: team.color,
                borderRadius: '50%',
                marginBottom: 2,
              }}
            >
              <FaFlag color={'white'} size={8} />
            </Flex>
            {team.name}
          </div>
        }
        contentStyle={{ display: 'inline-block', textAlign: 'right' }}
      >
        <Descriptions.Item label="직위">
          <Tag color={employee.position.color} style={{ margin: 0 }}>
            <Tooltip
              title={
                <Space direction="vertical">
                  <Flex gap={8} align="center">
                    <FaFlag color="white" size={11} />
                    대행사 단가
                  </Flex>
                  <Flex>
                    <Tag color="rgba(100,100,100,0.7)">{unit.name}</Tag>
                    {unit.unitPay.toLocaleString()}원
                  </Flex>
                </Space>
              }
            >
              {employee.position.name}
            </Tooltip>
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="계약 수당">
          <Tag>{SALARY[employee.salaryCode]}</Tag>
          {pay.toLocaleString()}원
        </Descriptions.Item>

        <Descriptions.Item label="계약기간">
          {employee.startPeriod} ~ {employee.endPeriod}
        </Descriptions.Item>
      </Descriptions>

      <Flex gap={12} className="btn-wrap">
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
        <ImageViewButton
          label="계약서"
          icon={<FaSignature size={24} />}
          src={documents?.signBase64}
        />
      </Flex>
    </EmployeeInfoStyled>
  );
};

export default EmployeeInfo;
