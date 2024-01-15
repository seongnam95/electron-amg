import { BiSolidIdCard } from 'react-icons/bi';
import { FaSignature, FaPhoneAlt, FaFlag } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { RiBankCard2Fill } from 'react-icons/ri';

import { Descriptions, Divider, Empty, Flex, Skeleton, Space, Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';

import ImageViewButton from '~/components/common/ImageViewButton';
import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { colors } from '~/styles/themes';
import { EmployeeData, EmployeeDocument, SALARY } from '~/types/employee';
import { TeamData } from '~/types/team';
import { UnitData } from '~/types/unit';
import { formatDay, formatPhoneNumber, formatSSN } from '~/utils/formatData';

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

  const getContractStatus = (employee: EmployeeData) => {
    const { startPeriod, endPeriod, isVirtual } = employee;

    const today = dayjs();
    const start = dayjs(startPeriod);
    const end = dayjs(endPeriod);

    if (isVirtual) {
      return {
        color: 'blue',
        label: '가상 근로자',
      };
    } else if (today.isBefore(start)) {
      return {
        label: '계약전',
      };
    } else if (today.isAfter(end)) {
      return {
        color: 'red',
        label: '계약 만료됨',
      };
    } else {
      return {
        color: 'green',
        label: '고용중',
      };
    }
  };

  const contractStatus = getContractStatus(employee);

  /** 가상 근무자 */
  if (employee.isVirtual)
    return (
      <EmployeeInfoStyled>
        <Descriptions
          className="info-card"
          title={
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Flex
                align="center"
                justify="center"
                style={{
                  width: '2.2rem',
                  height: '2.2rem',
                  padding: 6,
                  backgroundColor: team.color,
                  borderRadius: '50%',
                  marginBottom: 2,
                }}
              >
                <FaFlag color={'white'} />
              </Flex>
              {team.name}
            </div>
          }
          column={1}
          colon={false}
          contentStyle={{ display: 'inline-block', textAlign: 'right' }}
        >
          <Descriptions.Item label="대행사 단가 종류">{unit.name}</Descriptions.Item>

          <Descriptions.Item label="상태">
            <Tag color={contractStatus.color} style={{ margin: 0 }}>
              {contractStatus.label}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="유지 만료일" style={{ padding: 0 }}>
            {formatDay(employee.endPeriod)}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          column={1}
          colon={false}
          contentStyle={{ display: 'inline-block', textAlign: 'right' }}
          className="info-card"
        >
          <Descriptions.Item label="대행사 단가">
            {unit.unitPay.toLocaleString()}
            <HintText>원</HintText>
          </Descriptions.Item>

          <Descriptions.Item label="프리셋">
            {employee.preset}
            <HintText>개</HintText>
          </Descriptions.Item>

          <Descriptions.Item label="청구 단가 합계" style={{ padding: 0 }}>
            {(employee.preset * unit.unitPay).toLocaleString()}
            <HintText>원</HintText>
          </Descriptions.Item>
        </Descriptions>

        <p style={{ fontSize: 12, color: colors.primary, marginTop: '1.4rem', textAlign: 'end' }}>
          * 가상 근무자는 대시보드의 "대행사 청구 단가"에서만 합계됩니다.
        </p>
      </EmployeeInfoStyled>
    );

  /** 일반 근무자 */
  return (
    <EmployeeInfoStyled>
      {/* 개인 정보 */}
      <Descriptions
        className="info-card"
        title={
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Flex
              align="center"
              justify="center"
              style={{
                width: '2.2rem',
                height: '2.2rem',
                backgroundColor: colors.borderColor,
                borderRadius: '50%',
                marginBottom: 2,
              }}
            >
              <IoPerson color={colors.iconColor2} />
            </Flex>
            {employee.name}
          </div>
        }
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
          <Tag>{employee.bank}</Tag>
          {employee.bankNum}
        </Descriptions.Item>
      </Descriptions>

      {/* 계약 정보 */}
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
                width: '2.2rem',
                height: '2.2rem',
                padding: 6,
                backgroundColor: team.color,
                borderRadius: '50%',
                marginBottom: 2,
              }}
            >
              <FaFlag color={'white'} />
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

        <Descriptions.Item label="상태">
          <Tag color={contractStatus.color} style={{ margin: 0 }}>
            {contractStatus.label}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="계약 만료일" style={{ padding: 0 }}>
          {formatDay(employee.endPeriod)}
        </Descriptions.Item>
      </Descriptions>

      <Flex gap={12}>
        <ImageViewButton
          label="신분증"
          icon={<BiSolidIdCard size={24} />}
          src={documents?.idCard}
        />
        <ImageViewButton
          label="통장사본"
          icon={<RiBankCard2Fill rotate="-60deg" size={24} style={{ padding: '.0625rem' }} />}
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
