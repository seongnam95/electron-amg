import { ReactNode, cloneElement, useEffect, useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineAdd } from 'react-icons/md';

import { Button, Flex, Form, InputRef, Space } from 'antd';
import { motion } from 'framer-motion';

import PositionList from '~/components/common/PositionList';
import { useSoundApp } from '~/hooks/useSoundApp';
import { PositionCreateBody } from '~/types/position';

import { formItems } from './formConfig';

const defaultValues: PositionCreateBody = {
  name: '',
  color: '#4C53FF',
  salaryCode: 1,
  isChild: false,
  standardPay: 0,
};

export interface PositionFormProps {
  values?: PositionCreateBody[];
  subBtn?: ReactNode;
  submitBtnText?: string;
  vertical?: boolean;
  isBtnLoading?: boolean;
  onChange?: (positions: PositionCreateBody[]) => void;
  onSubmit?: (positions: PositionCreateBody[]) => void;
}

const PositionForm = ({
  values,
  subBtn,
  submitBtnText,
  vertical,
  isBtnLoading,
  onChange,
  onSubmit,
}: PositionFormProps) => {
  const inputRef = useRef<InputRef>(null);
  const [positions, setPositions] = useState<PositionCreateBody[]>(values ?? []);
  const [selectedPosition, setSelectedPosition] = useState<PositionCreateBody>();
  const isEditing = !!selectedPosition;

  const { soundMessage } = useSoundApp();
  const [form] = Form.useForm<PositionCreateBody>();

  useEffect(() => onChange?.(positions), [positions]);
  useEffect(() => inputFocus(), []);
  const inputFocus = () => inputRef.current?.focus();

  const resetForm = () => {
    form.resetFields();
    setSelectedPosition(undefined);
    setTimeout(() => inputFocus(), 0);
  };

  // 직위 추가
  const handleAddPosition = (data: PositionCreateBody) => {
    if (isEditing) {
      setPositions(prev => prev.map(pos => (pos === selectedPosition ? { ...data } : pos)));
    } else {
      setPositions(prev => [...prev, { ...data }]);
    }
    resetForm();
  };

  // 직위 삭제
  const handlePositionRemove = () => {
    setPositions(prev => prev.filter(pos => pos !== selectedPosition));
    resetForm();
  };

  // 직위 변경
  const handlePositionDoubleClick = (position: PositionCreateBody) => {
    resetForm();
    setSelectedPosition(position);
    form.setFieldsValue(position);
  };

  // 서브밋
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
          selectedPosition={selectedPosition}
          onDoubleClick={handlePositionDoubleClick}
        />

        <Form
          form={form}
          initialValues={defaultValues}
          colon={false}
          labelCol={{ span: 12 }}
          labelAlign="left"
          autoComplete="off"
          onFinish={handleAddPosition}
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

          <motion.div
            key={isEditing ? 'edit' : 'add'}
            initial={{ opacity: 0, x: isEditing ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isEditing ? -20 : 20 }}
            style={{ width: '100%' }}
            transition={{ duration: 0.2 }}
          >
            <Flex gap={8}>
              {isEditing ? (
                <>
                  <Button
                    htmlType="button"
                    type="text"
                    danger
                    icon={<FaTrash />}
                    onClick={handlePositionRemove}
                    style={{ marginRight: 40 }}
                  />
                  <Button htmlType="button" type="text" onClick={resetForm}>
                    취소
                  </Button>
                  <Button htmlType="submit" style={{ flex: 1, color: '#326CF9' }}>
                    변경
                  </Button>
                </>
              ) : (
                <Button htmlType="submit" style={{ flex: 1, color: '#326CF9' }}>
                  <MdOutlineAdd style={{ marginRight: 8 }} />
                  추가하기
                </Button>
              )}
            </Flex>
          </motion.div>
        </Form>
      </Flex>

      <Flex justify="end" gap={8}>
        {subBtn}
        <Button
          loading={isBtnLoading}
          type="primary"
          onClick={handleSubmit}
          style={{ width: '8rem' }}
        >
          {submitBtnText ? submitBtnText : '저장'}
        </Button>
      </Flex>
    </Space>
  );
};

export default PositionForm;
