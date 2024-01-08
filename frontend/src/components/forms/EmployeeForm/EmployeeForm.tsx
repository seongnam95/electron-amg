import { cloneElement, useEffect, useState } from 'react';

import { Button, Divider, Flex, Form, FormInstance } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import Info from '~/components/common/Info';
import { EmployeeData, EmployeeUpdateBody } from '~/types/employee';
import { TeamData } from '~/types/team';

import { getFormConfig } from './config';
import { EmployeeFormStyled } from './styled';

export interface EmployeeFormProps {
  team: TeamData;
  employee?: EmployeeData;
  form?: FormInstance;
  loading?: boolean;
  onSubmit?: (formData: EmployeeUpdateBody) => void;
  onCancel?: () => void;
}

const EmployeeForm = ({
  team,
  employee,
  loading,
  form = Form.useForm<EmployeeUpdateBody>()[0],
  onSubmit,
  onCancel,
}: EmployeeFormProps) => {
  const [disabledPreset, setDisabledPreset] = useState<boolean>(() => {
    return employee?.salaryCode === 3;
  });

  const handleChange = (_: any, changeValues: EmployeeUpdateBody) => {
    if (changeValues.salaryCode === 3) setDisabledPreset(true);
    else setDisabledPreset(false);
  };

  const initValues: EmployeeUpdateBody = {
    name: employee?.name,
    phone: employee?.phone,
    ssn: employee?.ssn,
    bank: employee?.bank,
    bankNum: employee?.bankNum,
    positionId: employee?.positionId,
    salaryCode: employee?.salaryCode,
    preset: employee?.preset,
  };

  const formItems = getFormConfig(team);
  return (
    <EmployeeFormStyled className="EmployeeForm">
      <Form
        form={form}
        colon={false}
        labelCol={{ span: 10 }}
        initialValues={initValues}
        labelAlign="left"
        autoComplete="off"
        validateTrigger="onSubmit"
        onFinish={onSubmit}
        onValuesChange={handleChange}
        disabled={loading}
      >
        <AnimatePresence>
          {formItems.map((item, idx) => {
            const hidden = item.name === 'preset' && !disabledPreset;
            if (item.name === 'divider') return <div key={`divider-${idx}`}>{item.component}</div>;
            return (
              !hidden && (
                <motion.div
                  key={`item-${item.name}-${idx}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Form.Item
                    name={item.name}
                    label={<Info title={item.tooltip}>{item.label}</Info>}
                    style={{ marginBottom: 0, padding: '1.2rem 0' }}
                  >
                    {item.component}
                  </Form.Item>
                </motion.div>
              )
            );
          })}
        </AnimatePresence>

        <Divider />

        <Flex gap={12}>
          <Button type="text" htmlType="button" onClick={onCancel} disabled={loading}>
            취소
          </Button>
          <Button type="primary" htmlType="submit" block loading={loading}>
            저장
          </Button>
        </Flex>
      </Form>
    </EmployeeFormStyled>
  );
};

export default EmployeeForm;
