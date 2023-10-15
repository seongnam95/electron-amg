import generatePicker from 'antd/es/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

interface AntDatePickerProps {
  defaultValue?: Dayjs;
  disabledDate?: any;
  onChange: (value: Dayjs | null, dateString: string) => void;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined;
}

const AntDatePicker = (props: AntDatePickerProps) => {
  function disabledDate(current: any) {
    return current && current.valueOf() > Date.now();
  }

  return <DatePicker inputReadOnly allowClear={false} disabledDate={disabledDate} {...props} />;
};

export default AntDatePicker;
