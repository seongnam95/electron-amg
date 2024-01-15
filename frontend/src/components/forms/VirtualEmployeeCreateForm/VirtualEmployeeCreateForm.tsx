import { useEffect, useMemo, useState } from 'react';

import { Descriptions, Divider, Flex, Form, FormInstance, Input, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import AntDateRangePicker from '~/components/common/DateRangePicker/DateRangePicker';
import DescriptionsBox from '~/components/common/DescriptionsBox';
import FormatterInput from '~/components/common/FormatterInput';
import Info from '~/components/common/Info';
import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { teamStore } from '~/stores/team';
import { colors } from '~/styles/themes';
import { VirtualEmployeeFormData } from '~/types/employee';

export interface VirtualEmployeeCreateFormProps {
  initValues: VirtualEmployeeFormData;
  form?: FormInstance;
  onSubmit?: (values: VirtualEmployeeFormData) => void;
}

const VirtualEmployeeCreateForm = ({
  form,
  initValues,
  onSubmit,
}: VirtualEmployeeCreateFormProps) => {
  const team = useRecoilValue(teamStore);

  const [formValues, setFormValues] = useState<VirtualEmployeeFormData>(initValues);

  useEffect(() => setFormValues(initValues), [initValues]);

  const positionOptions = useMemo(
    () =>
      team.positions.map(position => ({
        value: position.id,
        label: (
          <Flex align="center" justify="space-between" gap={8} style={{ paddingRight: 6 }}>
            {position.name}
            <HintText>{position.standardPay.toLocaleString()}원</HintText>
          </Flex>
        ),
      })),
    [],
  );

  const position = team.positions.find(pos => pos.id === formValues?.positionId);
  const unit = team.units.find(unit => unit.id === position?.unitId);
  const pay = unit ? unit.unitPay * (formValues?.preset ?? 0) : 0;

  return (
    <Space direction="vertical">
      <Form
        form={form}
        colon={false}
        labelCol={{ span: 8 }}
        labelAlign="left"
        autoComplete="off"
        validateTrigger="onSubmit"
        initialValues={initValues}
        onFinish={onSubmit}
        onValuesChange={(_, values) => setFormValues(values)}
      >
        <Form.Item
          name="name"
          label="근무자 명칭"
          rules={[{ required: true, message: '명칭을 입력해주세요.' }]}
        >
          <Input placeholder="(표시 될 근무자 명칭 입력)" />
        </Form.Item>

        <Form.Item
          name="period"
          label={<Info title="가상 근무자가 적용 될 달을 선택합니다.">유지일</Info>}
          rules={[{ required: true, message: '유지일을 선택해주세요.' }]}
        >
          <AntDateRangePicker fullWidth picker="month" />
        </Form.Item>

        <Form.Item label="프리셋" labelCol={{ span: 8 }} required style={{ margin: 0 }}>
          <Flex gap={8}>
            <Form.Item name="positionId" style={{ width: '100%', margin: 0 }}>
              <Select options={positionOptions} />
            </Form.Item>

            <Form.Item
              name="preset"
              rules={[{ required: true, message: '명칭을 입력해주세요.' }]}
              style={{ width: '8rem', margin: 0 }}
            >
              <FormatterInput onlyNum />
            </Form.Item>
          </Flex>
        </Form.Item>
      </Form>
      <Divider />

      <DescriptionsBox justify="center">
        <Descriptions
          colon={false}
          column={1}
          contentStyle={{ display: 'inline-block', textAlign: 'right' }}
        >
          <Descriptions.Item label="대행사 단가 명칭">{unit?.name}</Descriptions.Item>
          <Descriptions.Item label="대행사 단가">
            {unit?.unitPay.toLocaleString()}원
          </Descriptions.Item>
          <Descriptions.Item label="월 청구액">{pay.toLocaleString()}원</Descriptions.Item>
        </Descriptions>
      </DescriptionsBox>

      <p style={{ fontSize: 12, color: colors.primary, marginTop: '1.4rem', textAlign: 'end' }}>
        * 가상 근무자는 대시보드의 "대행사 청구 단가"에서만 합계됩니다.
      </p>
    </Space>
  );
};

export default VirtualEmployeeCreateForm;
