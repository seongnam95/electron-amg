import { useEffect, useRef, useState } from 'react';
import {
  AiOutlineDownload,
  AiOutlineRotateLeft,
  AiOutlineRotateRight,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
} from 'react-icons/ai';
import {
  FaFileContract,
  FaFileDownload,
  FaRegIdCard,
  FaSignature,
  FaTrashAlt,
} from 'react-icons/fa';

import {
  Button,
  Descriptions,
  Divider,
  DrawerProps,
  Flex,
  Image,
  Skeleton,
  Space,
  Tag,
} from 'antd';
import { transform } from 'lodash';

import ImagePreview from '~/components/common/ImagePreview';
import { useEmployeeDetailQuery } from '~/hooks/queryHooks/useEmployeeQuery';
import { POSITION_CODE, POSITION_COLORS } from '~/types/position';
import { formatPhoneNumber, formatSSN } from '~/utils/formatData';

import { EmployeeInfoDrawerStyled } from './styled';

export interface EmployeeInfoDrawerProps extends DrawerProps {
  employeeId: string;
}

const EmployeeInfoDrawer = ({ employeeId, open, ...props }: EmployeeInfoDrawerProps) => {
  const [showBankBook, setShowBankBook] = useState<boolean>(false);
  const [showIdCard, setShowIdCard] = useState<boolean>(false);
  const { employee } = useEmployeeDetailQuery({ employeeId: employeeId });

  if (!employee)
    return (
      <EmployeeInfoDrawerStyled
        className="EmployeeInfoDrawer"
        title={<Skeleton active />}
        closable={false}
        {...props}
      >
        <Skeleton active />
      </EmployeeInfoDrawerStyled>
    );

  const handleIdCardClick = () => setShowBankBook(true);
  const handleContractClick = () => setShowIdCard(true);

  const TitleRender = () => {
    const code = employee.position.positionCode;
    const label = POSITION_CODE[code];
    const color = POSITION_COLORS[code];
    return (
      <>
        <Tag style={{ width: '5rem', textAlign: 'center', marginRight: '1.2rem' }} color={color}>
          {label}
        </Tag>
        {employee.name}
      </>
    );
  };

  const RenderExtra = (
    <Button
      type="text"
      danger
      icon={<FaTrashAlt size="1.6rem" style={{ marginTop: 3 }} />}
    ></Button>
  );

  return (
    <EmployeeInfoDrawerStyled
      className="EmployeeInfoDrawer"
      title={<TitleRender />}
      extra={RenderExtra}
      closable={false}
      open={open}
      {...props}
    >
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
          {employee.position.unitPay.toLocaleString()}원
        </Descriptions.Item>
        <Descriptions.Item label="계약기간">
          {employee.startPeriod} ~ {employee.endPeriod}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Flex gap={12}>
        <button className="img-btn" onClick={handleIdCardClick}>
          <FaRegIdCard size={24} />
          신분증
        </button>
        <button className="img-btn" onClick={handleContractClick}>
          <FaSignature size={24} />
          계약서
        </button>
      </Flex>

      <ImagePreview
        src={employee.bankBook}
        open={showBankBook}
        onClose={() => setShowBankBook(false)}
      />
      <ImagePreview src={employee.idCard} open={showIdCard} onClose={() => setShowIdCard(false)} />
    </EmployeeInfoDrawerStyled>
  );
};

export default EmployeeInfoDrawer;
