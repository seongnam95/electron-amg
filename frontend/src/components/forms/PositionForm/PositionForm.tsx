import { ReactElement, ReactNode, cloneElement, useEffect, useRef, useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';

import { Button, Divider, Flex, Form, InputRef, Space } from 'antd';

import PositionList from '~/components/common/PositionList';
import { useSoundApp } from '~/hooks/useSoundApp';
import { PositionUpdateBody } from '~/types/position';

import { formItems } from './positionFormConfig';

const defaultValues: PositionUpdateBody = {
  name: '',
  color: '#4C53FF',
  salaryCode: 1,
  isChild: false,
  standardPay: 0,
};

export interface PositionFormProps {
  values?: PositionUpdateBody;
  subBtn?: ReactNode;
  submitBtnText?: string;
  vertical?: boolean;
  onSubmit?: (positions: PositionUpdateBody[]) => void;
}

const PositionForm = ({
  values = defaultValues,
  subBtn,
  submitBtnText,
  vertical,
  onSubmit,
}: PositionFormProps) => {
  const [positions, setPositions] = useState<PositionUpdateBody[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<PositionUpdateBody>();
  const { soundMessage } = useSoundApp();
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm<PositionUpdateBody>();

  useEffect(() => inputFocus(), []);

  const inputFocus = () => inputRef.current?.focus();

  const handleFinish = (data: PositionUpdateBody) => {
    setPositions(prev => [...prev, { ...data }]);
    setSelectedPosition(undefined);

    form.resetFields();
    setTimeout(() => inputFocus(), 0);
  };

  const handleRemove = (position: PositionUpdateBody) => {
    setPositions(prev => prev.filter(pos => pos !== position));
  };

  const handleSubmit = () => {
    if (positions.length === 0) {
      soundMessage.warning('하나 이상의 직위를 생성해주세요.');
    } else onSubmit?.(positions);
  };

  return (
    <Space direction="vertical" size={24}>
      <Flex gap={34} style={{ height: '32rem' }} vertical={vertical}>
        <PositionList
          positions={positions}
          // onDoubleClick={handleDoubleClick}
          onRemove={handleRemove}
        />
        <Form
          form={form}
          initialValues={values}
          colon={false}
          labelCol={{ span: 12 }}
          labelAlign="left"
          autoComplete="off"
          onFinish={handleFinish}
          style={{ minWidth: '30rem', maxHeight: '32rem' }}
        >
          {/* 아이템 렌더링 */}
          {formItems.map((item, idx) => (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
              valuePropName={item.valuePropName}
            >
              {cloneElement(item.component, {
                ref: idx === 0 ? inputRef : null,
              })}
            </Form.Item>
          ))}

          <Button htmlType="submit" style={{ width: '100%', color: '#326CF9' }}>
            <MdOutlineAdd style={{ marginRight: '1rem' }} />
            추가하기
          </Button>
        </Form>
      </Flex>

      <Flex justify="end" gap={8}>
        {subBtn}
        <Button type="primary" onClick={handleSubmit} style={{ width: '8rem' }}>
          {submitBtnText ? submitBtnText : '저장'}
        </Button>
      </Flex>
    </Space>
  );
};

export default PositionForm;
