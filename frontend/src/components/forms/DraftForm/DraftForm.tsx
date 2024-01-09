import { useState } from 'react';

import { Button, Flex, Form, FormInstance, Select, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AntDateRangePicker from '~/components/common/DateRangePicker/DateRangePicker';
import FormatterInput from '~/components/common/FormatterInput';
import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { DraftCreateBody } from '~/types/draft';
import { SalaryType } from '~/types/employee';
import { PositionData } from '~/types/position';

import { DraftFormStyled } from './styled';

interface DraftFormData {
  positionId: string;
  period: [Dayjs, Dayjs];
  salaryCode: SalaryType;
  preset: number;
}

export interface DraftFormProps {
  positions: PositionData[];
  form?: FormInstance;
  loading?: boolean;
  onSubmit?: (data: DraftCreateBody) => void;
}

const DraftForm = ({
  positions,
  form = Form.useForm<DraftCreateBody>()[0],
  loading,
  onSubmit,
}: DraftFormProps) => {
  const [disabledPreset, setDisabledPreset] = useState<boolean>(true);

  // DatePicker 기본 값 [ 오늘 날짜, 이번달 마지막 날짜 ]
  const currentDate = dayjs();
  const lastDate = currentDate.endOf('month');
  const defaultPickerValue: [Dayjs, Dayjs] = [currentDate, lastDate];

  const handleSubmit = (formData: DraftFormData) => {
    const { period, salaryCode, preset, positionId } = formData;
    onSubmit?.({
      positionId: positionId,
      salaryCode: salaryCode,
      preset: preset,
      startPeriod: period[0].format('YYYY-MM-DD'),
      endPeriod: period[1].format('YYYY-MM-DD'),
    });
  };

  const handleChange = (formData: DraftFormData) => {
    if (formData.salaryCode !== undefined) {
      if (formData.salaryCode === 3) setDisabledPreset(false);
      else {
        setDisabledPreset(true);
        form.setFieldValue('preset', 1);
      }
    }
  };

  const positionOptions = positions.map(position => ({
    value: position.id,
    label: (
      <Flex align="center" justify="space-between" gap={8} style={{ paddingRight: 6 }}>
        {position.name}
        <HintText>{position.standardPay.toLocaleString()}원</HintText>
      </Flex>
    ),
  }));

  const salaryOptions = [
    { value: 1 as SalaryType, label: '일급' },
    { value: 2 as SalaryType, label: '주급' },
    { value: 3 as SalaryType, label: '월급' },
  ];

  return (
    <DraftFormStyled>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Title className="view-title" level={5}>
          계약서 폼 생성
        </Typography.Title>

        <Form
          form={form}
          layout="vertical"
          colon={false}
          autoComplete="off"
          onFinish={handleSubmit}
          onValuesChange={handleChange}
          initialValues={{ salaryCode: 1, period: defaultPickerValue, preset: 1 }}
        >
          <Form.Item
            label="직위 구분"
            name="positionId"
            rules={[{ required: true, message: '직위를 선택해주세요.' }]}
          >
            <Select placeholder="( 직위 선택 )" options={positionOptions} />
          </Form.Item>

          <Form.Item
            label="계약일"
            name="period"
            rules={[{ required: true, message: '계약일을 선택해주세요.' }]}
          >
            <AntDateRangePicker fullWidth />
          </Form.Item>

          <Form.Item label="급여 구분" style={{ margin: 0 }} required>
            <Flex gap={8}>
              <Form.Item
                name="salaryCode"
                rules={[{ required: true, message: '급여 형태를 선택해주세요.' }]}
              >
                <Select
                  placeholder="( 급여 형태 )"
                  options={salaryOptions}
                  style={{ width: '18rem' }}
                />
              </Form.Item>
              <Form.Item name="preset">
                <FormatterInput placeholder="프리셋" disabled={disabledPreset} />
              </Form.Item>
            </Flex>
          </Form.Item>

          <Flex flex={1} style={{ justifyContent: 'end' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              생성하기
            </Button>
          </Flex>
        </Form>
      </Space>
    </DraftFormStyled>
  );
};

export default DraftForm;
