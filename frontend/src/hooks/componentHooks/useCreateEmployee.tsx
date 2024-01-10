import { useState } from 'react';

import { Descriptions, Flex, Form, Input, Modal, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AntDateRangePicker from '~/components/common/DateRangePicker/DateRangePicker';
import DescriptionsBox from '~/components/common/DescriptionsBox';
import FormatterInput from '~/components/common/FormatterInput';
import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { teamStore } from '~/stores/team';
import { colors } from '~/styles/themes';
import { EmployeeUpdateBody } from '~/types/employee';

interface VirtualEmployeeFormData {
  name: string;
  period: [Dayjs, Dayjs];
  positionId: string;
  preset: number;
}

// Virtual
const useCreateEmployee = () => {
  const team = useRecoilValue(teamStore);

  const [form] = Form.useForm<VirtualEmployeeFormData>();
  const [open, setOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<VirtualEmployeeFormData>();

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = (formData: VirtualEmployeeFormData) => {};

  // DatePicker 기본 값 [ 오늘 날짜, 이번달 마지막 날짜 ]
  const currentDate = dayjs();
  const lastDate = currentDate.endOf('month');
  const defaultPickerValue: [Dayjs, Dayjs] = [currentDate, lastDate];

  const positionOptions = team.positions.map(position => ({
    value: position.id,
    label: (
      <Flex align="center" justify="space-between" gap={8} style={{ paddingRight: 6 }}>
        {position.name}
        <HintText>{position.standardPay.toLocaleString()}원</HintText>
      </Flex>
    ),
  }));

  const initValues: VirtualEmployeeFormData = {
    name: '',
    period: defaultPickerValue,
    positionId: positionOptions[0] ? positionOptions[0].value : '',
    preset: 1,
  };

  const position = team.positions.find(pos => pos.id === formValues?.positionId);
  const unit = team.units.find(unit => unit.id === position?.unitId);

  // TODO
  const renderDrawer = (
    <Modal
      open={open}
      onCancel={closeDrawer}
      rootClassName="ant-drawer-inline"
      title="가상 근무자 생성"
      style={{ maxWidth: '34rem' }}
      getContainer={() => {
        return document.getElementById('layout') || document.body;
      }}
    >
      <Form
        form={form}
        colon={false}
        labelCol={{ span: 10 }}
        labelAlign="left"
        initialValues={initValues}
        onFinish={handleSubmit}
        onValuesChange={(_, values) => setFormValues(values)}
      >
        <Form.Item
          name="name"
          label="근무자 명칭"
          rules={[{ required: true, message: '명칭을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="period"
          label="계약일"
          rules={[{ required: true, message: '계약일을 선택해주세요.' }]}
        >
          <AntDateRangePicker fullWidth />
        </Form.Item>

        <Form.Item name="positionId" label="직위">
          <Select options={positionOptions} />
        </Form.Item>

        <Form.Item
          name="preset"
          label="프리셋"
          rules={[{ required: true, message: '명칭을 입력해주세요.' }]}
        >
          <FormatterInput onlyNum />
        </Form.Item>
      </Form>

      <DescriptionsBox justify="center">
        <Descriptions
          title="대행사 단가 계산"
          colon={false}
          column={1}
          contentStyle={{ display: 'inline-block', textAlign: 'right' }}
        >
          <Descriptions.Item label="대행사 단가 종류">{unit?.name}</Descriptions.Item>
          <Descriptions.Item label="지출액">{unit?.unitPay.toLocaleString()}원</Descriptions.Item>
        </Descriptions>
      </DescriptionsBox>
    </Modal>
  );

  return { renderDrawer, openDrawer, closeDrawer };
};

export default useCreateEmployee;
