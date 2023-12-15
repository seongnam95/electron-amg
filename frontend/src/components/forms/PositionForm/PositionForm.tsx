import { ReactNode, cloneElement, useEffect, useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineAdd } from 'react-icons/md';

import { Button, Flex, Form, InputRef, Select, Space } from 'antd';
import { motion } from 'framer-motion';

import PositionList from '~/components/common/PositionList';
import { useSoundApp } from '~/hooks/componentHooks/useSoundApp';
import { PositionCreateBody, SalaryType } from '~/types/position';
import { UnitData } from '~/types/unit';

import { formItems } from './formConfig';

const defaultValues: PositionCreateBody = {
  name: '',
  color: '#4C53FF',
  salaryCode: 1,
  defaultEarnsIncentive: false,
  standardPay: 0,
  isLeader: false,
  sortingIndex: 0,
  preset: 1,
  unitId: '',
};

export interface PositionFormProps {
  values?: PositionCreateBody[];
  unitValues?: UnitData[];
  cancelBtnText?: ReactNode;
  submitBtnText?: string;
  vertical?: boolean;
  isLoading?: boolean;
  onChange?: (positions: PositionCreateBody[]) => void;
  onSubmit?: (positions: PositionCreateBody[]) => void;
  onCancel?: () => void;
}

const PositionForm = ({
  values,
  unitValues,
  cancelBtnText,
  submitBtnText,
  vertical,
  isLoading,
  onChange,
  onSubmit,
  onCancel,
}: PositionFormProps) => {
  const inputRef = useRef<InputRef>(null);
  const [positions, setPositions] = useState<PositionCreateBody[]>(values ?? []);
  const [selectedPosition, setSelectedPosition] = useState<PositionCreateBody>();
  const [salaryCode, setSalaryCode] = useState<SalaryType>(1);
  const [isLeader, setIsLeader] = useState<boolean>(false);

  const isEditing = !!selectedPosition;

  const { soundMessage } = useSoundApp();
  const [form] = Form.useForm<PositionCreateBody>();

  useEffect(() => {
    const sortedPositions = positions.map((position, idx) => ({
      ...position,
      sortingIndex: idx,
    }));
    onChange?.(sortedPositions);
  }, [positions]);
  useEffect(() => inputFocus(), []);

  const inputFocus = () => inputRef.current?.focus();

  const resetForm = () => {
    form.resetFields();
    setSelectedPosition(undefined);
    setIsLeader(false);
    setSalaryCode(1);
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

  const handleSalaryChange = (code: SalaryType) => setSalaryCode(code);
  const handleLeaderChange = (value: boolean) => {
    setIsLeader(value);
    form.setFieldValue('defaultEarnsIncentive', false);
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
    } else {
      onSubmit?.(positions);
    }
  };

  const determineDisabled = (itemName: string) => {
    switch (itemName) {
      case 'preset':
        return salaryCode !== 3;
      case 'defaultEarnsIncentive':
        return isLeader;
      default:
        return false;
    }
  };

  const unitSelectOptions = unitValues?.map(unit => ({ label: unit.name, value: unit.id }));
  return (
    <Space direction="vertical" size={24}>
      <Flex gap={34} vertical={vertical}>
        <PositionList
          positions={positions}
          selectedPosition={selectedPosition}
          onReorder={setPositions}
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
          style={{ minWidth: '32rem' }}
        >
          <Form.Item
            required
            name="unitId"
            label="대행사 단가"
            rules={[{ required: true, message: '' }]}
          >
            <Select placeholder="(대행사 단가 선택)" options={unitSelectOptions} />
          </Form.Item>

          {/* 아이템 렌더링 */}
          {formItems.map((item, idx) => (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
              tooltip={item.tooltip}
              valuePropName={item.valuePropName}
            >
              {cloneElement(item.component, {
                ref: idx === 0 ? inputRef : null,
                disabled: determineDisabled(item.name),
                onChange:
                  item.name === 'salaryCode'
                    ? handleSalaryChange
                    : item.name === 'isLeader'
                    ? handleLeaderChange
                    : null,
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
                <Button htmlType="submit" type="dashed" block>
                  <MdOutlineAdd style={{ marginRight: 8 }} />
                  추가하기
                </Button>
              )}
            </Flex>
          </motion.div>
        </Form>
      </Flex>

      <Flex justify="end" gap={8}>
        {onCancel && (
          <Button disabled={isLoading} type="text" onClick={onCancel}>
            {cancelBtnText ? cancelBtnText : '취소'}
          </Button>
        )}
        <Button
          loading={isLoading}
          type="primary"
          onClick={handleSubmit}
          style={{ padding: '0 2.4rem' }}
        >
          {submitBtnText ? submitBtnText : '저장'}
        </Button>
      </Flex>
    </Space>
  );
};

export default PositionForm;
