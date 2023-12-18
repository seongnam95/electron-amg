import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { MdOutlineAdd } from 'react-icons/md';

import { Button, Flex, Form, FormInstance, Select, Space } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import { PositionCreateBody } from '~/types/position';
import { UnitData } from '~/types/unit';

import { defaultPositionValues, formItems } from './formConfig';

export interface PositionFormProps {
  form?: FormInstance<PositionCreateBody>;
  isEditing?: boolean;
  initValues?: PositionCreateBody;
  unitValues?: UnitData[];
  onCancel?: () => void;
  onRemove?: () => void;
  onSubmit?: (position: PositionCreateBody) => void;
}

const initHiddenStates = {
  preset: true,
  defaultEarnsIncentive: false,
  incentive: true,
};

const PositionForm = ({
  form = Form.useForm<PositionCreateBody>()[0],
  initValues = defaultPositionValues,
  isEditing,
  unitValues,
  onCancel,
  onRemove,
  onSubmit,
}: PositionFormProps) => {
  const [hiddenStates, setHiddenStates] = useState(initHiddenStates);

  useEffect(() => {
    formHiddenSetting(initValues);
    form.setFieldsValue(initValues);
  }, [initValues, isEditing]);

  const formHiddenSetting = (formValues: PositionCreateBody) => {
    setHiddenStates({
      preset: formValues.salaryCode !== 3,
      defaultEarnsIncentive: formValues.isLeader,
      incentive: !formValues.isLeader,
    });
  };

  const handleChange = (_: any, formValues: PositionCreateBody) => {
    formHiddenSetting(formValues);
  };

  const resetForm = () => {
    form.setFieldsValue(defaultPositionValues);
    formHiddenSetting(defaultPositionValues);
  };

  const handleEditCancel = () => {
    onCancel?.();
    resetForm();
  };

  const handleRemove = () => {
    onRemove?.();
    resetForm();
  };

  const handleSubmit = (formData: PositionCreateBody) => {
    onSubmit?.({
      ...formData,
      preset: formData.preset ? formData.preset : 1,
      defaultEarnsIncentive: formData.defaultEarnsIncentive
        ? formData.defaultEarnsIncentive
        : false,
    });
    resetForm();
  };

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
        validateTrigger="onFinish"
        onFinish={handleSubmit}
        onValuesChange={handleChange}
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
          <AnimatePresence key={item.name}>
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
          <Flex gap={18} justify="end">
            {isEditing ? (
              <>
                <Button
                  htmlType="button"
                  type="text"
                  danger
                  icon={<FaTrash />}
                  onClick={handleRemove}
                />
                <Flex flex={1} gap={8}>
                  <Button htmlType="button" type="text" onClick={handleEditCancel}>
                    취소
                  </Button>
                  <Button htmlType="submit" type="dashed" block>
                    변경
                  </Button>
                </Flex>
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
