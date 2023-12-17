import { useEffect, useRef, useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';

import { Button, Flex, Form, FormInstance, InputRef, Select, Space } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import { PositionCreateBody } from '~/types/position';
import { UnitData } from '~/types/unit';

import { defaultPositionValues, getFormItems } from './formConfig';

export interface PositionFormProps {
  form?: FormInstance;
  isEditing?: boolean;
  initValues?: PositionCreateBody;
  unitValues?: UnitData[];
  existLeader?: boolean;
  onSubmit?: (position: PositionCreateBody) => void;
}

const PositionForm = ({
  form = Form.useForm<PositionCreateBody>()[0],
  isEditing,
  initValues = defaultPositionValues,
  unitValues,
  existLeader,
  onSubmit,
}: PositionFormProps) => {
  const inputRef = useRef<InputRef>(null);
  const [hiddenStates, setHiddenStates] = useState({
    preset: true,
    defaultEarnsIncentive: false,
    incentive: true,
  });

  const onFormValuesChange = (_: any, allValues: PositionCreateBody) => {
    setHiddenStates({
      preset: allValues.salaryCode !== 3,
      defaultEarnsIncentive: allValues.isLeader,
      incentive: !allValues.isLeader,
    });
  };

  useEffect(() => inputFocus(), []);
  const inputFocus = () => inputRef.current?.focus();

  const resetForm = () => {
    form.resetFields();
    setTimeout(() => inputFocus(), 0);
  };

  const formItems = getFormItems({ existLeader: existLeader ?? false, isMonthly: false });
  const unitSelectOptions = unitValues?.map(unit => ({ label: unit.name, value: unit.id }));
  return (
    <Space direction="vertical" size={24}>
      <Form
        form={form}
        initialValues={initValues}
        colon={false}
        labelCol={{ span: 12 }}
        labelAlign="left"
        autoComplete="off"
        onFinish={onSubmit}
        onValuesChange={onFormValuesChange}
        style={{ minWidth: '32rem' }}
      >
        <Form.Item
          required
          name="unitId"
          label="대행사 단가"
          rules={[{ required: true, message: '' }]}
          style={{ marginBottom: 0, padding: '1.2rem 0' }}
        >
          <Select placeholder="(대행사 단가 선택)" options={unitSelectOptions} />
        </Form.Item>

        {/* 아이템 렌더링 */}
        {formItems.map(item => (
          <AnimatePresence>
            {!hiddenStates[item.name as keyof typeof hiddenStates] && (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Form.Item
                  label={item.label}
                  name={item.name as keyof PositionCreateBody}
                  rules={item.rules}
                  tooltip={item.tooltip}
                  valuePropName={item.valuePropName}
                  style={{ marginBottom: 0, padding: '1.2rem 0' }}
                >
                  {item.component}
                </Form.Item>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        <motion.div
          key={isEditing ? 'edit' : 'add'}
          initial={{ opacity: 0, x: isEditing ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isEditing ? -20 : 20 }}
          style={{ marginTop: 24 }}
          transition={{ duration: 0.2 }}
        >
          <Flex gap={8}>
            {isEditing ? (
              <>
                <Button htmlType="button" type="text" onClick={resetForm}>
                  취소
                </Button>
                <Button htmlType="submit" type="dashed" block>
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
    </Space>
  );
};

export default PositionForm;
