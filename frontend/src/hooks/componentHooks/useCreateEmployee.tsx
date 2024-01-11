import { useMemo, useState } from 'react';

import { Descriptions, Divider, Flex, Form, Input, Modal, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';

import AntDateRangePicker from '~/components/common/DateRangePicker/DateRangePicker';
import DescriptionsBox from '~/components/common/DescriptionsBox';
import FormatterInput from '~/components/common/FormatterInput';
import Info from '~/components/common/Info';
import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { teamStore } from '~/stores/team';
import { colors } from '~/styles/themes';
import { EmployeeCreateBody } from '~/types/employee';

import { useEmployeeCreate } from '../queryHooks/useEmployeeQuery';
import { useSoundApp } from './useSoundApp';

interface VirtualEmployeeFormData {
  name: string;
  period: [Dayjs, Dayjs];
  positionId: string;
  preset: number;
}

// Virtual
const useCreateVirtualEmployeeDrawer = () => {
  const team = useRecoilValue(teamStore);

  const initValues: VirtualEmployeeFormData = {
    name: '',
    period: [dayjs(), dayjs().endOf('month')],
    positionId: team.positions && team.positions.length > 0 ? team.positions[0].id : '',
    preset: 1,
  };

  const [open, setOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<VirtualEmployeeFormData>(initValues);

  const [form] = Form.useForm<VirtualEmployeeFormData>();
  const { soundMessage } = useSoundApp();
  const { mutate, isLoading } = useEmployeeCreate({ teamId: team.id });

  const openDrawer = () => {
    form.resetFields();
    setOpen(true);
  };

  const closeDrawer = () => setOpen(false);

  const handleSubmit = (formData: VirtualEmployeeFormData) => {
    const body: EmployeeCreateBody = {
      name: formData.name,
      startPeriod: formData.period[0].format('YYYY-MM-DD'),
      endPeriod: formData.period[1].format('YYYY-MM-DD'),
      positionId: formData.positionId,
      preset: formData.preset,
      salaryCode: 3,
      signBase64: '',
      ssn: '',
      phone: '',
      bank: '',
      bankBook: '',
      bankNum: '',
      idCard: '',
      isVirtual: true,
    };

    mutate(body, {
      onSuccess: () => {
        soundMessage.success('정상 생성되었습니다.');
        closeDrawer();
      },
      onError: () => {
        soundMessage.error('잠시후 다시 시도해주세요.');
      },
    });
  };

  const handleChange = (_: any, formData: VirtualEmployeeFormData) => {
    setFormValues(formData);
  };

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

  const position = team.positions.find(pos => pos.id === formValues.positionId);
  const unit = team.units.find(unit => unit.id === position?.unitId);
  const pay = unit ? unit.unitPay * (formValues.preset ?? 0) : 0;

  const renderDrawer = (
    <Modal
      open={open}
      onCancel={closeDrawer}
      rootClassName="ant-drawer-inline"
      title="가상 근무자 생성"
      style={{ maxWidth: '42rem' }}
      onOk={() => form.submit()}
      confirmLoading={isLoading}
      getContainer={() => {
        return document.getElementById('layout') || document.body;
      }}
    >
      <Form
        form={form}
        colon={false}
        labelCol={{ span: 8 }}
        labelAlign="left"
        initialValues={initValues}
        onFinish={handleSubmit}
        onValuesChange={handleChange}
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
          label={<Info title="가상 근무자가 적용 될 달을 선택합니다.">계약일</Info>}
          rules={[{ required: true, message: '계약일을 선택해주세요.' }]}
        >
          <AntDateRangePicker fullWidth />
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
          <Descriptions.Item label="합계액">{pay.toLocaleString()}원</Descriptions.Item>
        </Descriptions>
      </DescriptionsBox>

      <p style={{ fontSize: 12, color: colors.primary, marginTop: '1.4rem', textAlign: 'end' }}>
        * 가상 근무자는 대시보드의 "대행사 청구 단가"에서만 합계됩니다.
      </p>
    </Modal>
  );

  return { renderDrawer, openDrawer, closeDrawer };
};

export default useCreateVirtualEmployeeDrawer;
