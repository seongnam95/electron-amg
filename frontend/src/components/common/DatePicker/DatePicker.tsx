import generatePicker from 'antd/es/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import { CSSObject } from 'styled-components';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

interface AntDatePickerProps {
  value?: Dayjs;
  defaultValue?: Dayjs;
  disabledDate?: any;
  onChange?: (value: Dayjs | null, dateString: string) => void;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined;
  style?: CSSObject;
}

const AntDatePicker = (props: AntDatePickerProps) => {
  function disabledDate(current: any) {
    return current && current.valueOf() > Date.now();
  }

  return <DatePicker inputReadOnly allowClear={false} disabledDate={disabledDate} {...props} />;
};

export default AntDatePicker;
