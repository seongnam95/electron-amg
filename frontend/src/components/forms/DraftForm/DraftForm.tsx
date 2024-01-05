import { useState } from 'react';

import { Button, Flex, Form, FormInstance, Select, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import AntDateRangePicker from '~/components/common/DateRangePicker/DateRangePicker';
import { useSoundApp } from '~/hooks/componentHooks/useSoundApp';
import { DraftCreateBody, DraftData } from '~/types/draft';
import { PositionData } from '~/types/position';

import DraftResultBox from './DraftResultBox/DraftResultBox';
import { DraftFormStyled } from './styled';

export interface DraftFormProps {
  positions?: PositionData[];
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

  const { Option } = Select;
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
            <Select placeholder="( 직위 선택 )">
              {positions?.map(pos => {
                return (
                  <Option key={pos.id} value={pos.id}>
                    {pos.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="계약일"
            name="period"
            rules={[{ required: true, message: '계약일을 선택해주세요.' }]}
          >
            <AntDateRangePicker fullWidth />
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
