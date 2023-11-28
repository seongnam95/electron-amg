import { useRef, RefObject, useEffect, useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';

import { InputRef, ColorPicker, Form, Input, InputNumber, Divider, Select, Space } from 'antd';
import { Color } from 'antd/es/color-picker';

import { PositionData, SALARY, SalaryType } from '~/types/position';

import PositionList from '../../PositionList';
import { PositionFieldsStyled } from './styled';

interface PositionFormData {
  positionName: string;
  salary: SalaryType;
  standardPay: number;
  positionColor: Color;
}

const PositionFields = () => {
  const inputRef = useRef<InputRef>(null);
  const [positions, setPositions] = useState<Omit<PositionData, 'id'>[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  const handleFinish = (data: PositionFormData) => {
    form.resetFields();
    setPositions(prev => [
      ...prev,
      {
        name: data.positionName,
        isChild: true,
        standardPay: data.standardPay,
        color: `#${data.positionColor.toHex()}`,
        salaryCode: data.salary,
      },
    ]);
  };

  return (
    <PositionFieldsStyled>
      <PositionList positions={positions}></PositionList>
      <Divider />
      <Space direction="vertical">
        <Form
          form={form}
          colon={false}
          labelCol={{ span: 12 }}
          labelAlign="left"
          onFinish={handleFinish}
        >
          {/* 업체 명칭 */}
          <Form.Item
            label="직위 명칭"
            name="positionName"
            rules={[
              {
                required: true,
                message: '직위명은 필수입니다',
              },
              {
                min: 2,
                max: 12,
                message: '2-5글자 사이어야 합니다',
              },
            ]}
          >
            <Input ref={inputRef} placeholder="(직위명)" />
          </Form.Item>

          {/* 급여 */}
          <Form.Item
            label="급여"
            name="salary"
            rules={[
              {
                required: true,
                message: '급여 선택은 필수입니다.',
              },
            ]}
          >
            <Select
              options={[
                { label: '일급', value: 1 },
                { label: '주급', value: 2 },
                { label: '월급', value: 3 },
              ]}
            />
          </Form.Item>

          {/* 단가 */}
          <Form.Item
            label="단가"
            name="standardPay"
            rules={[
              {
                required: true,
                message: '단가 입력은 필수입니다.',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          {/* 팀 구분 색상 */}
          <Form.Item
            label="직위 구분 색상"
            name="positionColor"
            rules={[
              {
                required: true,
                message: '직위 색상은 필수입니다.',
              },
            ]}
          >
            <ColorPicker defaultFormat="rgb" />
          </Form.Item>

          <button className="position-add-btn">
            직위 추가 <MdOutlineAdd />
          </button>
        </Form>
      </Space>
    </PositionFieldsStyled>
  );
};

export default PositionFields;
