import { useState } from 'react';

import { Button, Flex, Form, FormInstance, InputNumber, Select, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AntDateRangePicker from '~/components/common/DateRangePicker/DateRangePicker';
import FormatterInput from '~/components/common/FormatterInput';
import { HintText } from '~/components/dashboard/MonthlyAttendanceTable/styled';
import { useSoundApp } from '~/hooks/componentHooks/useSoundApp';
import { DraftCreateBody, DraftData } from '~/types/draft';
import { SalaryType } from '~/types/employee';
import { PositionData } from '~/types/position';

import DraftResultBox from './DraftResultBox/DraftResultBox';
import { DraftFormStyled } from './styled';

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
  const [draft, setDraft] = useState<DraftData | undefined>();
  const [showResultBox, setShowResultBox] = useState<boolean>(false);

  const { soundMessage } = useSoundApp();
  // DatePicker 기본 값 [ 오늘 날짜, 이번달 마지막 날짜 ]
  const currentDate = dayjs();
  const lastDate = currentDate.endOf('month');
  const defaultPickerValue: [Dayjs, Dayjs] = [currentDate, lastDate];

  const handleCopy = (data: string) => {
    try {
      const inputElement = document.createElement('input');

      inputElement.value = data;
      inputElement.select();
      document.execCommand('copy');
      document.body.removeChild(inputElement);

      soundMessage.success('클립보드에 저장되었습니다.');
    } catch (err) {
      soundMessage.success('클립보드 복사에 실패했습니다.');
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
          onFinish={onSubmit}
          initialValues={{ period: defaultPickerValue }}
        >
          <Form.Item
            label="직위 구분"
            name="position"
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
              <Form.Item name="salaryCode">
                <Select placeholder="( 급여 형태 )" options={salaryOptions} />
              </Form.Item>
              <Form.Item name="preset">
                <FormatterInput placeholder="프리셋" />
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

      <DraftResultBox
        show={showResultBox}
        draft={draft}
        onCopy={handleCopy}
        onClose={() => setShowResultBox(false)}
      />
    </DraftFormStyled>
  );
};

export default DraftForm;
